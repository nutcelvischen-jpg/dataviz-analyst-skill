/**
 * 🔮 數位乩童 (Digital Jitong) AI 客服後端中繼網關
 * Google Apps Script (GAS) Web App 核心腳本
 *
 * 【架構角色】
 * 充當安全中繼代理 (BFF - Backend for Frontend)：
 * 1. 接收前端 GitHub Pages 傳入的提問、畫面上下文與 Base64 截圖
 * 2. 透過 ScriptProperties 安全讀取 OPENROUTER_API_KEY (金鑰絕不暴露給前端)
 * 3. 呼叫 OpenRouter 雲端大模型 (Claude Haiku 3.5 / 5.5) 進行多模態推理
 * 4. 將對話即時寫入 Google Sheets 歷史日誌資料庫 (SpreadsheetApp.appendRow)
 * 5. 以 ContentService 回傳標準 JSON 格式
 *
 * 作者：陳俊智 博士 (Elvis Chen, PhD) · 國立臺中科技大學 ICMA Lab
 * 授權：MIT License
 */

/**
 * 處理前端 POST 請求 (主要對話與視覺推理通道)
 */
function doPost(e) {
  try {
    // 1. 安全取得儲存在 GAS 專案環境變數中的敏感金鑰
    const props = PropertiesService.getScriptProperties();
    const apiKey = props.getProperty("OPENROUTER_API_KEY");
    const sheetId = props.getProperty("LOG_SHEET_ID"); // 可選：指定存放日誌的 Google Sheet ID

    if (!apiKey) {
      return jsonResponse({
        success: false,
        error: "後端尚未設定 OPENROUTER_API_KEY 指令碼屬性，請至「專案設定」新增！"
      }, 500);
    }

    // 2. 解析前端傳入的 JSON 封包 (支援 text/plain 避免 CORS 預檢失敗)
    const contents = (e && e.postData && e.postData.contents) ? e.postData.contents : "{}";
    const requestData = JSON.parse(contents);

    const userMessage = requestData.message || "";
    const pageContext = requestData.context || "";
    const imageBase64 = requestData.imageBase64 || requestData.image || null;
    const sessionId = requestData.sessionId || "sess_" + new Date().getTime();
    const history = Array.isArray(requestData.history) ? requestData.history : [];

    // 3. 系統人設 (System Prompt) 注入
    const systemPrompt = 
      "你是「數位乩童」，說話靈光四溢、玄學幽默但工程與數據分析實力極度扎實的 AI 助教。\n" +
      "你的真身締造者是國立臺中科技大學國際貿易與經營系專任副教授、商業智慧應用與研究中心主任、" +
      "智慧商務多代理人實驗室（ICMA Lab）主持人陳俊智博士（Elvis Chen）。\n" +
      "請針對學員提問與圖表截圖，給予精確的數據解讀、圖表選型建議與 Python/ECharts 解決方案！";

    // 4. 組裝 OpenRouter 規格對話歷史
    const messages = [];
    messages.push({ role: "system", content: systemPrompt });

    // 加入既有對話輪次 (避免截圖累積過多，只保留文字歷史)
    if (history.length > 0) {
      history.slice(-6).forEach(function(item) {
        if (item.role && item.content && typeof item.content === "string") {
          messages.push({ role: item.role, content: item.content });
        }
      });
    }

    // 當前提問組裝 (多模態支援)
    if (imageBase64) {
      const formattedImg = imageBase64.startsWith("data:") 
        ? imageBase64 
        : ("data:image/png;base64," + imageBase64);

      messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: (pageContext ? ("【當前網頁操作情境】\n" + pageContext + "\n\n") : "") + userMessage
          },
          {
            type: "image_url",
            image_url: { url: formattedImg }
          }
        ]
      });
    } else {
      messages.push({
        role: "user",
        content: (pageContext ? ("【當前網頁操作情境】\n" + pageContext + "\n\n") : "") + userMessage
      });
    }

    // 5. 發送 HTTPS 請求至 OpenRouter
    const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions";
    const payload = {
      model: "anthropic/claude-3.5-haiku",
      messages: messages,
      temperature: 0.7,
      max_tokens: 1500
    };

    const options = {
      method: "post",
      contentType: "application/json",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "HTTP-Referer": "https://github.com/nutcelvischen-jpg/dataviz-analyst-skill",
        "X-Title": "Digital Jitong Assistant"
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(openRouterUrl, options);
    const resCode = response.getResponseCode();
    const resText = response.getContentText();
    const resJson = JSON.parse(resText);

    if (resCode !== 200 || !resJson.choices || !resJson.choices[0]) {
      return jsonResponse({
        success: false,
        error: "OpenRouter 呼叫失敗: " + (resJson.error ? resJson.error.message : resText)
      }, 502);
    }

    const replyContent = resJson.choices[0].message.content || "";

    // 6. 異步/同步記錄至 Google Sheets 資料庫
    if (sheetId) {
      try {
        const ss = SpreadsheetApp.openById(sheetId);
        let sheet = ss.getSheetByName("對話日誌") || ss.getActiveSheet();
        
        // 若為全空表，自動建立標題列
        if (sheet.getLastRow() === 0) {
          sheet.appendRow(["時間戳記", "SessionID", "學員提問", "AI 回應摘要", "包含截圖", "模型名稱"]);
          sheet.getRange(1, 1, 1, 6).setFontWeight("bold").setBackground("#e2e8f0");
        }

        sheet.appendRow([
          new Date(),
          sessionId,
          userMessage,
          replyContent.substring(0, 500),
          imageBase64 ? "✅ 有截圖" : "❌ 無截圖",
          "claude-3.5-haiku"
        ]);
      } catch (sheetErr) {
        Logger.log("Google Sheet 寫入略過: " + sheetErr.message);
      }
    }

    // 7. 回傳標準成功 JSON 回應
    return jsonResponse({
      success: true,
      status: "success",
      reply: replyContent,
      sessionId: sessionId
    });

  } catch (err) {
    Logger.log("doPost 發生異常: " + err.toString());
    return jsonResponse({
      success: false,
      error: "伺服器內部錯誤: " + err.message
    }, 500);
  }
}

/**
 * 處理健康檢查 GET 請求
 */
function doGet(e) {
  return jsonResponse({
    status: "online",
    service: "數位乩童 GAS Backend Gateway",
    version: "3.0.0",
    author: "陳俊智 博士 (Elvis Chen) · ICMA Lab",
    time: new Date().toISOString()
  });
}

/**
 * 輔助函式：建立符合跨域 JSON 輸出
 */
function jsonResponse(data, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
