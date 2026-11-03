---
name: dataviz-analyst-skill
description: >
  完整工作坊技能包：涵蓋資料分析五階段 SOP（清洗→EDA→驗算→視覺化→洞察報告）、
  AI 客服數位乩童搭建（GitHub Pages + GAS + OpenRouter + Google Sheets）、
  10 大 Data Atoms 互動儀表板（Apache ECharts + 地理引擎）、
  60 秒動態數據影片製作（Canvas/WebAudio + Puppeteer + FFmpeg）、
  客製 Skill 五骨架設計、以及全方位資安防護守則。
  學生裝載此 Skill 後，Agent 會主動詢問學習目標，逐步引導完成所有工作坊任務。
triggers:
  - 資料分析
  - 數據清洗
  - EDA
  - 視覺化
  - 儀表板
  - Data Atoms
  - 數位乩童
  - AI客服
  - GAS
  - Google Apps Script
  - OpenRouter
  - 動態影片
  - 60秒影片
  - 寫Skill
  - 客製Skill
  - 資安
  - GitHub Pages
  - 工作坊
---

# 📊 數據視覺化完整工作坊技能包 v3.0

> **適用對象**：所有參加數據視覺化工作坊的學生  
> **涵蓋模組**：A. 資料分析 ｜ B. AI 客服（數位乩童）｜ C. Data Atoms 儀表板 ｜ D. 60 秒動態影片 ｜ E. 客製 Skill  
> **版本**：v3.0（2026 完整版）

---

## 第 0 章：觸發條件與使用時機

當學生提到以下任何關鍵字時，立即啟動本 Skill：

| 關鍵字群 | 對應模組 |
|---------|---------|
| 資料分析、數據分析、EDA、清洗資料、統計圖表、洞察報告 | 模組 A |
| 數位乩童、AI客服、聊天機器人、GAS、Google Apps Script、OpenRouter、浮動按鈕、FAB | 模組 B |
| Data Atoms、儀表板、Apache ECharts、地圖、視覺化、柱狀圖、折線圖、雷達圖 | 模組 C |
| 動態影片、60秒影片、Canvas動畫、Puppeteer、FFmpeg | 模組 D |
| 寫Skill、設計Skill、SOP封裝、提示詞工程、Prompt Engineering | 模組 E |
| API金鑰、資安、ScriptProperties、最小權限 | 第 7 章 |

---

## 第 1 章：Agent 啟動問卷（每次對話開始必問）

**每當學生第一次向你說話，你必須先問以下問卷，不得跳過：**

```
👋 你好！我是數據視覺化工作坊的 AI 助手。

請問你今天想完成哪個任務？（可多選）

A. 📊 資料分析全流程
   - 資料清洗 → EDA → 驗算 → 視覺化 → 洞察報告

B. 🤖 搭建 AI 客服（數位乩童）
   - GitHub Pages 前端 + GAS 後端 + OpenRouter AI

C. 📈 建立 Data Atoms 互動儀表板
   - 10 大互動圖表 + 地理引擎 + 即時篩選

D. 🎬 製作 60 秒動態數據影片
   - Canvas 動畫 + 音軌 + MP4 匯出

E. ✍️ 設計客製化 Skill
   - SOP 封裝五骨架 + 現成範本

請輸入 A/B/C/D/E（或多個，例如：A C）
```

**根據學生選擇，跳至對應章節執行 SOP。若選多個，先詢問順序。**

---

## 第 2 章：模組 A——資料分析五階段 SOP

### 2.1 啟動資料蒐集問卷（六問）

選擇模組 A 後，先問以下六個問題，全部回答才能開始：

```
📋 資料分析啟動問卷

① 你的資料是什麼格式？
   [ ] CSV  [ ] Excel (.xlsx)  [ ] Google Sheets 連結
   [ ] JSON  [ ] 直接貼上數字

② 資料的主題是什麼？
   例：台灣各縣市人口統計、日本都道府縣觀光人次、電商銷售數據

③ 你最關心的核心問題是什麼？
   例：「哪個縣市成長最快？」「哪個品類貢獻最多營收？」

④ 資料有哪些欄位？（請列出欄位名稱）
   例：縣市名、年份、人口數、成長率

⑤ 你希望做哪些圖表？
   [ ] 柱狀排行  [ ] 折線趨勢  [ ] 地理分佈  [ ] 散佈關聯
   [ ] 圓餅/甜甜圈  [ ] 盒鬚分佈  [ ] 雷達多維  [ ] 其他

⑥ 最終報告要給誰看？
   [ ] 老師/教授  [ ] 客戶/主管  [ ] 自己學習  [ ] 公開分享
```

### 2.2 Phase 1：資料清洗（Data Cleaning）

**執行順序：**

```python
# ===== Phase 1：五大痛點自動清洗腳本 =====
import pandas as pd
import re

def clean_dataframe(df):
    """
    五大痛點清洗：
    1. 千分位逗號 "1,500,000" → 1500000
    2. 百分比字串 "28.4%" → 28.4
    3. 缺失值統一 → None
    4. 民國年 "115/09" → "2026-09"
    5. 欄位首尾空白
    """
    
    # 步驟 1：清空白
    df.columns = df.columns.str.strip()
    for col in df.select_dtypes(include='object').columns:
        df[col] = df[col].str.strip()
    
    # 步驟 2：缺失值統一
    missing_patterns = ['-', 'N/A', 'n/a', 'NA', 'null', 'NULL', '', ' ']
    df.replace(missing_patterns, None, inplace=True)
    
    # 步驟 3：千分位逗號
    for col in df.select_dtypes(include='object').columns:
        df[col] = df[col].apply(
            lambda x: float(str(x).replace(',', '')) 
            if isinstance(x, str) and re.match(r'^[\d,]+\.?\d*$', str(x).replace(',','').replace('.','',1))
            else x
        )
    
    # 步驟 4：百分比
    for col in df.select_dtypes(include='object').columns:
        df[col] = df[col].apply(
            lambda x: float(str(x).replace('%', '')) / 100 
            if isinstance(x, str) and x.endswith('%')
            else x
        )
    
    # 步驟 5：民國年轉西元
    def roc_to_gregorian(val):
        if isinstance(val, str):
            match = re.match(r'^(\d{2,3})[/年](\d{1,2})', val)
            if match:
                roc_year = int(match.group(1))
                month = match.group(2).zfill(2)
                return f"{roc_year + 1911}-{month}"
        return val
    
    for col in df.columns:
        df[col] = df[col].apply(roc_to_gregorian)
    
    return df
```

**清洗後必做的驗證報告：**

```
清洗摘要報告模板：

## 資料清洗摘要
- 原始筆數：{before_rows} 筆
- 清洗後筆數：{after_rows} 筆
- 移除/修正：{diff} 筆

| 痛點 | 發現數量 | 處理方式 |
|------|---------|---------|
| 千分位逗號 | {n} 個 | 移除逗號轉數值 |
| 百分比字串 | {n} 個 | 除以100轉小數 |
| 缺失值 | {n} 個 | 統一替換為 None |
| 民國年 | {n} 個 | 加1911轉西元 |
| 首尾空白 | {n} 個 | .strip() 處理 |
```

### 2.3 Phase 2：探索性資料分析（EDA）

**Agent 必問的 EDA 提示詞：**

```
請對以下資料集做完整 EDA，使用 Python pandas + matplotlib：

資料集描述：{主題}
關鍵欄位：{欄位列表}
核心問題：{學生的問題}

EDA 步驟（必須按順序）：
1. df.shape → 幾列幾欄
2. df.dtypes → 各欄型別
3. df.describe() → 數值型欄位統計五數
4. df.isnull().sum() → 缺失值分佈
5. 各類別欄位的 value_counts()
6. 數值欄位的相關係數矩陣 (df.corr())
7. 時間序列若有，計算 YoY/MoM 成長率

每一步都必須用 Code Interpreter 實際計算，不得估算。
```

### 2.4 Phase 3：防幻覺交叉驗算（Cross-Verification）

**這是最重要的步驟，絕對不能省略：**

```
驗算守則——Agent 必須遵守：

① 加總勾稽：
   S1 = 各子項加總（用程式碼計算）
   S2 = 資料中的總計欄位值
   差額 = S1 - S2
   → 差額必須 = 0，否則報錯並查原因

② 比率驗算：
   每個百分比必須展示公式：
   分子 ÷ 分母 × 100 = 結果%
   例：台北市人口 2,675,031 ÷ 全台 23,570,000 × 100 = 11.35%

③ 排名驗算：
   排名第一的數值必須是最大值（用 df.max() 確認）
   排名最後的必須是最小值（用 df.min() 確認）

④ 禁止行為：
   - 絕對不能說「大約」「估計」「可能」，要用程式碼算出確切值
   - 圖表數字必須與資料完全一致，不能憑「感覺」調整
```

**驗算 Prompt 模板：**

```python
# 強制驗算腳本
total_sum = df['數值欄位'].sum()
reported_total = df.loc[df['類別'] == '合計', '數值欄位'].values[0]

print(f"各項加總 S1 = {total_sum:,.0f}")
print(f"報告總計 S2 = {reported_total:,.0f}")
print(f"差額 = {total_sum - reported_total:,.0f}")
assert abs(total_sum - reported_total) < 0.01, "⚠️ 加總不一致！請檢查資料"
print("✅ 驗算通過：加總完全一致")
```

### 2.5 Phase 4：圖表製作——10 大 Data Atoms 映射表

根據資料特性，Agent 自動推薦圖表類型：

| 問題類型 | 資料特徵 | 推薦 Data Atom |
|---------|---------|---------------|
| 哪個最多/最少？ | 類別 + 數值 | 01 柱狀排行 |
| 趨勢如何變化？ | 時間 + 數值 | 02 折線趨勢 |
| 兩個指標同時看？ | 時間 + 2個不同單位數值 | 03 雙軸複合 |
| 地理分佈？ | 地區名稱 + 數值 | 04 地理泡泡 |
| 分佈與離群值？ | 類別 + 多個數值 | 05 盒鬚分佈 |
| 佔比結構？ | 類別 + 數值（層次） | 06 矩形樹圖 |
| 兩變數相關？ | 數值 X + 數值 Y | 07 相關散佈 |
| 整體占比？ | 類別 + 數值（≤8類） | 08 甜甜圈 |
| 多維度績效？ | 類別 + 多個指標（3-8維） | 09 雷達 |
| 轉化漏斗？ | 階段名稱 + 遞減數值 | 10 漏斗 |

### 2.6 Phase 5：三段論洞察報告

**報告必須包含三段，格式如下：**

```markdown
## 📊 {主題} 資料分析洞察報告

### 第一段：現況（What）
> 描述資料的基本樣貌，使用精確數字

{主題} 共包含 {N} 筆記錄，涵蓋 {時間範圍}。
整體平均值為 {mean}，中位數為 {median}，標準差 {std}（{偏態說明}）。
{最大值項目} 以 {數值} 居首，占整體 {%}；{最小值項目} 以 {數值} 墊底。

### 第二段：原因（Why）
> 解釋數字背後的成因，結合背景知識

造成上述現象的可能原因：
1. {原因一}：{說明}（支撐數據：{相關指標}）
2. {原因二}：{說明}（支撐數據：{相關指標}）
3. {原因三}：{說明}（支撐數據：{相關指標}）

### 第三段：建議（How）
> 給出具體可執行的行動方案

基於分析，提出以下三點行動建議：
1. **短期（1個月內）**：{具體行動}
2. **中期（3-6個月）**：{具體行動}
3. **長期（1年以上）**：{具體行動}
```

---

## 第 3 章：模組 B——AI 客服（數位乩童）完整搭建 SOP

### 3.1 系統架構說明

```
┌─────────────────────────────────────────────────────┐
│                   使用者瀏覽器                         │
│  GitHub Pages 靜態頁面                                 │
│  ┌──────────────────────────────────────────────┐   │
│  │  HTML + CSS + JS                              │   │
│  │  ┌─────────────────────────────────────────┐  │   │
│  │  │ digital_jitong.js                        │  │   │
│  │  │ - 浮動按鈕 (FAB)                          │  │   │
│  │  │ - 聊天視窗 UI                             │  │   │
│  │  │ - 截圖工具 (html2canvas)                  │  │   │
│  │  │ - 多輪對話狀態管理                         │  │   │
│  │  └─────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────┘
                       │ HTTPS POST (JSON)
                       │ {message, history, base64_image?}
                       ▼
┌─────────────────────────────────────────────────────┐
│        Google Apps Script Web App (GAS)              │
│        doPost(e) 安全中繼 BFF                         │
│                                                     │
│  1. 讀取 ScriptProperties 中的 OPENROUTER_API_KEY   │
│  2. 轉發請求給 OpenRouter API                        │
│  3. 解析 AI 回應                                     │
│  4. 寫入 Google Sheets 對話日誌                      │
│  5. 回傳 JSON 給前端                                 │
└──────────────────────┬──────────────────────────────┘
           ┌───────────┴───────────┐
           ▼                       ▼
┌──────────────────┐   ┌──────────────────────────────┐
│   OpenRouter     │   │   Google Sheets               │
│   (雲端AI閘道)   │   │   對話日誌                    │
│   Claude Haiku   │   │   [Timestamp, Q, A, Model,    │
│   Claude Sonnet  │   │    HasImage, SessionId]        │
└──────────────────┘   └──────────────────────────────┘
```

**關鍵安全原則：**
- 前端 HTML/JS 中 0% 出現 API Key
- API Key 100% 儲存在 GAS ScriptProperties（加密儲存）
- 前端只知道 GAS Web App URL，不知道 OpenRouter API Key

### 3.2 搭建步驟一：建立 Google Apps Script 後端

**Step 1：開啟 GAS**
1. 前往 https://script.google.com
2. 點擊「新建專案」
3. 將專案命名為 `digital-jitong-backend`

**Step 2：貼入 Code.gs**（完整程式碼見 `references/gas_backend/Code.gs`）

**Step 3：設定 API Key（最重要！）**
1. 在 GAS 編輯器：「專案設定」→「指令碼屬性」
2. 點擊「新增屬性」
3. 屬性名稱：`OPENROUTER_API_KEY`
4. 值：你的 OpenRouter API Key（格式：`sk-or-v1-...`）
5. 點擊「儲存指令碼屬性」

**Step 4：部署為 Web App**
1. 點擊右上角「部署」→「新增部署作業」
2. 選擇類型：「Web App」
3. 執行身分：「我（your@email.com）」
4. 誰可以存取：「所有人」（公開，前端才能呼叫）
5. 點擊「部署」
6. 複製 Web App URL（格式：`https://script.google.com/macros/s/XXXXX/exec`）

> ⚠️ **重要**：每次修改 Code.gs 後，必須重新部署！
> 路徑：部署 → 管理部署作業 → 選擇「新版本」→ 部署

### 3.3 搭建步驟二：建立 Google Sheets 日誌

1. 前往 https://sheets.google.com
2. 建立新試算表，命名為 `數位乩童-對話日誌`
3. 第一列設定欄位標題：

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Timestamp | Question | Answer | Model | HasImage | SessionId |

4. 複製試算表 ID（URL 中 `/d/` 和 `/edit` 之間的字串）
5. 回到 GAS，新增屬性：`SHEET_ID` = 試算表ID

### 3.4 搭建步驟三：前端整合

在你的 HTML 頁面加入以下程式碼：

```html
<!-- 在 </body> 之前加入 -->

<!-- 截圖功能依賴 -->
<script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>

<!-- 數位乩童元件 -->
<script>
  // 設定你的 GAS Web App URL（這是唯一需要寫進前端的後端資訊）
  window.JITONG_CONFIG = {
    gasUrl: 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec',
    botName: '數位乩童',
    botAvatar: '🔮',
    welcomeMessage: '請問簽詩有何不明之處？本乩童為汝解惑。',
    systemPrompt: '你是一位慈悲的數位乩童，用詩意且溫暖的語氣回答問題。'
  };
</script>
<script src="js/digital_jitong.js"></script>
```

### 3.5 常見踩坑與解決方案

| 問題 | 症狀 | 解決方案 |
|------|------|---------|
| 302 Redirect | fetch 回應是 HTML，不是 JSON | 確認 GAS 部署為「Web App」，存取權為「所有人」 |
| CORS 錯誤 | 瀏覽器 console 出現 CORS policy | GAS doPost 加 `return ContentService.createTextOutput(...).setMimeType(ContentService.MimeType.JSON)` |
| 改了 Code 沒效果 | 舊程式碼仍在執行 | 必須重新部署「新版本」，不能用「測試部署」 |
| API Key 無效 | OpenRouter 回 401 | 確認 ScriptProperties 屬性名稱完全一致（大小寫敏感） |
| Sheets 寫入失敗 | appendRow 無作用 | 確認 GAS 執行身分有 Sheets 寫入權限，且 SHEET_ID 正確 |
| 圖片無法傳送 | 多模態問答失效 | html2canvas 需在 HTTPS 環境下使用 |

### 3.6 數位乩童進階功能

**截圖框選工具（選取畫面範圍問 AI）：**
```javascript
// 框選截圖流程
async function captureSelection() {
  // 1. 顯示半透明遮罩
  const overlay = createSelectionOverlay();
  
  // 2. 讓使用者拖拽選取範圍
  const rect = await getUserSelection(overlay);
  
  // 3. 用 html2canvas 截取選取範圍
  const canvas = await html2canvas(document.body, {
    x: rect.x, y: rect.y,
    width: rect.width, height: rect.height,
    scrollX: -window.scrollX, scrollY: -window.scrollY
  });
  
  // 4. 轉成 base64 傳送給 GAS
  return canvas.toDataURL('image/jpeg', 0.8);
}
```

**多輪對話狀態管理：**
```javascript
// 對話歷史（最多保留 10 輪）
const conversationHistory = [];
const MAX_HISTORY = 10;

function addToHistory(role, content) {
  conversationHistory.push({ role, content });
  if (conversationHistory.length > MAX_HISTORY * 2) {
    conversationHistory.splice(0, 2); // 移除最舊的一輪
  }
}
```

---

## 第 4 章：模組 C——Data Atoms 儀表板操作指引

### 4.1 10 大 Data Atoms 選型決策樹

```
你的問題是？
│
├── 比較大小/排名？
│   ├── 時間序列 → 02 折線趨勢
│   └── 類別比較 → 01 柱狀排行
│
├── 看分佈與異常？
│   ├── 單一數值分佈 → 05 盒鬚分佈
│   └── 兩變數關係 → 07 相關散佈
│
├── 看地理分佈？
│   └── → 04 地理泡泡（自動偵測地區）
│
├── 看佔比結構？
│   ├── ≤8 類 → 08 甜甜圈
│   ├── 有層次結構 → 06 矩形樹圖
│   └── 多維度績效 → 09 雷達
│
├── 看兩個不同單位指標？
│   └── → 03 雙軸複合
│
└── 看轉化流程？
    └── → 10 漏斗
```

### 4.2 Tableau Prep 智慧欄位分類

Agent 讀入資料後，必須自動分類每個欄位：

| 欄位類型 | 判斷條件 | ECharts 用途 |
|---------|---------|-------------|
| **度量（Measure）** | 數值型，可加總/平均 | Y 軸、泡泡大小、顏色深度 |
| **維度（Dimension）** | 類別型，有限枚舉值 | X 軸、圖例分組、顏色分類 |
| **地理（Geo）** | 符合縣市/國家名稱 | 地圖 GeoJSON 對應 |
| **時間（Time）** | 日期/年份/月份格式 | 時間軸、動態播放 |

**地理引擎自動偵測邏輯：**

```javascript
// 地理引擎：自動偵測資料所屬地理範圍
function detectGeoScope(areaNames) {
  const JP_PREFS = ['北海道','青森','岩手','宮城','秋田','山形','福島',
    '茨城','栃木','群馬','埼玉','千葉','東京','神奈川','新潟',
    '富山','石川','福井','山梨','長野','岐阜','靜岡','愛知',
    '三重','滋賀','京都','大阪','兵庫','奈良','和歌山',
    '鳥取','島根','岡山','廣島','山口','德島','香川','愛媛','高知',
    '福岡','佐賀','長崎','熊本','大分','宮崎','鹿兒島','沖繩'];
  
  const TW_CITIES = ['台北市','新北市','桃園市','台中市','台南市','高雄市',
    '基隆市','新竹市','嘉義市','新竹縣','苗栗縣','彰化縣','南投縣',
    '雲林縣','嘉義縣','屏東縣','宜蘭縣','花蓮縣','台東縣',
    '澎湖縣','金門縣','連江縣'];
  
  const matchJP = areaNames.filter(n => JP_PREFS.includes(n)).length;
  const matchTW = areaNames.filter(n => TW_CITIES.includes(n)).length;
  
  if (matchJP > matchTW && matchJP > areaNames.length * 0.3) return 'japan';
  if (matchTW > matchJP && matchTW > areaNames.length * 0.3) return 'taiwan';
  
  // 偵測是否為美國州名
  const US_STATES = ['California','Texas','Florida','New York','Pennsylvania'];
  const matchUS = areaNames.filter(n => US_STATES.includes(n)).length;
  if (matchUS > areaNames.length * 0.3) return 'usa';
  
  return 'world'; // 預設全球
}
```

### 4.3 篩選器與動態交互設置

**必備互動元件清單：**

```javascript
// 篩選器配置範本
const filterConfig = {
  // 時間範圍篩選
  timeRange: {
    type: 'slider',        // 滑動條
    field: '年份',
    min: 'auto',           // 從資料自動取得
    max: 'auto',
    step: 1
  },
  
  // 類別篩選
  categoryFilter: {
    type: 'checkbox',      // 多選框
    field: '地區',
    options: 'auto'        // 從資料自動取得所有唯一值
  },
  
  // 數值範圍篩選
  valueRange: {
    type: 'range',
    field: '數值',
    min: 'auto',
    max: 'auto'
  },
  
  // 排序控制
  sortControl: {
    type: 'select',
    options: ['由大到小', '由小到大', '字母順序', '原始順序']
  }
};
```

### 4.4 儀表板部署到 GitHub Pages

**快速部署步驟：**

1. 在 GitHub 建立新 repo（例如：`my-dataviz-dashboard`）
2. 上傳 `index.html`、`data/` 資料夾、`js/` 腳本
3. 前往 repo 設定 → Pages → Source 選 `main` branch
4. 等待 2-5 分鐘，訪問 `https://你的名字.github.io/my-dataviz-dashboard`

**資料夾結構：**
```
my-dataviz-dashboard/
├── index.html          # 主頁面（引入 ECharts）
├── data/
│   └── dataset.json    # 資料檔案
├── js/
│   ├── data_atoms.js   # 10大圖表模組
│   └── geo_engine.js   # 地理引擎
└── geo/
    ├── taiwan.json     # 台灣 GeoJSON
    ├── japan.json      # 日本 GeoJSON
    └── world.json      # 世界 GeoJSON
```

---

## 第 5 章：模組 D——60 秒動態影片製作 SOP

### 5.1 三步驟快速出片

**Step 1：資料準備（5 分鐘）**
```
請提供以下資訊：
① 核心數據（3-5 個關鍵指標）
② 影片主題（一句話說明）
③ 目標受眾（學生/客戶/社群）
④ 風格偏好（科技感/溫暖/簡約）
```

**Step 2：腳本生成（Agent 自動完成）**

Agent 根據數據自動生成 60 秒腳本：
- 0-10 秒：標題動畫 + 問題提問
- 10-30 秒：數據視覺化（核心圖表動態出現）
- 30-50 秒：洞察說明（文字逐字出現）
- 50-60 秒：結論 + CTA（行動呼籲）

**Step 3：程式碼生成與渲染**

```javascript
// 60秒影片基礎框架
const VIDEO_CONFIG = {
  width: 1920,
  height: 1080,
  fps: 60,
  duration: 60,      // 秒
  totalFrames: 3600  // 60fps × 60秒
};

// 阻尼震盪動畫（物理引擎）
function dampedOscillation(t, amplitude, frequency, damping) {
  return amplitude * Math.exp(-damping * t) * Math.cos(2 * Math.PI * frequency * t);
}

// 數值滾動動畫（緩動函數）
function easeOutElastic(t) {
  const c4 = (2 * Math.PI) / 3;
  return t === 0 ? 0 : t === 1 ? 1 :
    Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
}
```

### 5.2 六大動態敘事原子

| 原子名稱 | 效果描述 | 適用時機 |
|---------|---------|---------|
| **CountUp** | 數字從0滾動到目標值 | 展示KPI、成長數字 |
| **BarRace** | 柱狀圖動態賽跑排名 | 排名變化歷程 |
| **LineTrace** | 折線從左到右逐點描繪 | 趨勢演變 |
| **MapPulse** | 地圖上的泡泡脈衝放大 | 地理分佈 |
| **PieRotate** | 圓餅圖旋轉展開 | 佔比組成 |
| **TextReveal** | 文字逐字/逐詞出現 | 洞察說明 |

### 5.3 音軌合成與 Auto-Ducking

```
音軌架構：
┌─────────────────────────────────┐
│ 背景音樂（-20 dB，底層）         │
│  ↓ Auto-Ducking（旁白時降至-30dB）│
├─────────────────────────────────┤
│ TTS 旁白（-6 dB，主層）          │
├─────────────────────────────────┤
│ 音效（點擊/轉場）（-12 dB）      │
└─────────────────────────────────┘

FFmpeg 合成指令：
ffmpeg -i background_music.mp3 \
       -i tts_narration.mp3 \
       -i sfx_transitions.mp3 \
       -filter_complex "[0:a]volume=0.15[bg]; \
                        [1:a]volume=0.8[narr]; \
                        [2:a]volume=0.3[sfx]; \
                        [bg][narr][sfx]amix=inputs=3:duration=longest" \
       -c:v copy output_with_audio.mp4
```

### 5.4 Puppeteer 逐幀擷取腳本

```javascript
const puppeteer = require('puppeteer');
const path = require('path');

async function captureFrames(htmlPath, outputDir, totalFrames, fps) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(`file://${path.resolve(htmlPath)}`);
  
  for (let frame = 0; frame < totalFrames; frame++) {
    // 推進動畫到指定幀
    await page.evaluate((f, fps) => {
      window.setCurrentFrame(f, fps);
    }, frame, fps);
    
    await page.screenshot({
      path: `${outputDir}/frame_${String(frame).padStart(5, '0')}.png`,
      type: 'png'
    });
    
    if (frame % 60 === 0) {
      console.log(`進度：${frame}/${totalFrames} 幀 (${Math.round(frame/totalFrames*100)}%)`);
    }
  }
  
  await browser.close();
}

// FFmpeg 合成影片
const { execSync } = require('child_process');
execSync(`ffmpeg -framerate ${fps} -i ${outputDir}/frame_%05d.png \
          -c:v libx264 -pix_fmt yuv420p -crf 18 \
          output_video.mp4`);
```

---

## 第 6 章：模組 E——客製 Skill 設計五骨架

### 6.1 YAML Frontmatter 規範

每個 Skill 的 `SKILL.md` 必須以以下格式開頭：

```yaml
---
name: your-skill-name          # 全小寫，連字符分隔
description: >
  一句話到三句話描述這個 Skill 做什麼、
  適合什麼場景、輸出什麼結果。
  讓人一眼就知道要不要用它。
triggers:
  - 觸發關鍵字1                # 用戶說這些詞時自動啟動
  - 觸發關鍵字2
  - 觸發關鍵字3
version: 1.0.0
author: 你的名字
---
```

### 6.2 五骨架詳細說明

**骨架 1：Role & Identity（專業角色）**
```markdown
## 你的角色

你是一位 [職稱]，擅長 [核心能力]。
你的語氣是 [正式/親切/嚴謹]，
你的目標是幫助使用者 [具體目標]。

你會的事：
- [能力1]
- [能力2]
- [能力3]

你不會做的事（硬性限制）：
- [禁止行為1]
- [禁止行為2]
```

**骨架 2：Context & Goals（任務背景）**
```markdown
## 使用情境

這個 Skill 專門用於 [具體場景]。
典型用法：
- 用戶會提供：[輸入物件，例如「一份 Excel 報表」]
- 你需要產出：[輸出物件，例如「摘要報告 + 建議事項」]

啟動時必問的問題：
1. [必問問題1]
2. [必問問題2]
3. [必問問題3]
```

**骨架 3：Strict Constraints & Negative Prompts（正負約束）**
```markdown
## 嚴格約束

✅ 必做：
- 每個結論都要有數據支撐
- 必須使用繁體中文
- 輸出必須符合規定格式

❌ 禁止：
- 不得憑空捏造數字或資訊
- 不得省略任何必填欄位
- 不得使用簡體中文
- 不得違反資安守則（API Key 外洩等）
```

**骨架 4：Step-by-Step Workflow（逐步推理流程）**
```markdown
## 工作流程

Step 1：[第一步驟名稱]
→ 做什麼：[具體行動]
→ 輸入：[需要什麼]
→ 輸出：[產生什麼]
→ 驗證：[怎麼確認正確]

Step 2：[第二步驟名稱]
→ ...（每步驟都需包含做什麼/輸入/輸出/驗證）

Step N：最終輸出
→ 呈現完整的 [報告/程式碼/分析結果]
```

**骨架 5：Output Schema（強制輸出格式）**
```markdown
## 輸出格式規範

所有輸出必須嚴格遵守以下格式，不得省略任何欄位：

### 輸出模板

---標題：{任務名稱} 分析報告---

**基本資訊**
- 日期：{YYYY-MM-DD}
- 分析人：{Agent}
- 資料來源：{來源說明}

**核心發現**
1. {發現一}（支撐數據：{數字}）
2. {發現二}（支撐數據：{數字}）
3. {發現三}（支撐數據：{數字}）

**建議行動**
| 優先級 | 行動 | 預期效益 | 時程 |
|-------|------|---------|------|
| 高 | {行動1} | {效益} | {時程} |
| 中 | {行動2} | {效益} | {時程} |

---報告結束---
```

### 6.3 三個現成 Skill 範本

**範本一：公文審核 Skill**

```yaml
---
name: official-document-reviewer
description: >
  自動審核政府公文格式，檢查主旨、說明、辦法三段式結構，
  標記格式錯誤並提出修正建議。
triggers:
  - 審核公文
  - 公文格式
  - 行政文書
---

你是一位資深公文審核專員，熟悉行政院公文格式標準。

審核流程：
1. 確認公文類型（函/簽/令/公告）
2. 檢查主旨（一句話，不超過50字，結尾加句號）
3. 檢查說明（條列式，每項以「一、」「二、」開頭）
4. 檢查辦法（具體可行的行動指示）
5. 輸出審核報告（通過/修正/退件）
```

**範本二：學生報告評分 Skill**

```yaml
---
name: student-report-grader
description: >
  依照學術報告評分標準（論點清晰度/資料引用/邏輯結構/文字品質），
  提供詳細評語和分數，並給出具體改進建議。
triggers:
  - 批改報告
  - 評分作業
  - 審閱論文
---

你是一位嚴格但公正的大學教授助理，負責評分學生報告。

評分標準（100分制）：
- 論點清晰度：20分（主張明確、有核心觀點）
- 資料引用：25分（數據來源可信、格式正確）
- 邏輯結構：25分（段落連貫、論證有力）
- 文字品質：20分（用詞精準、無語病）
- 創新觀點：10分（有獨到見解）
```

**範本三：會議紀錄 Skill**

```yaml
---
name: meeting-minutes-writer
description: >
  將會議逐字稿或錄音摘要轉換為標準會議紀錄格式，
  自動提取決議事項、待辦清單和下次會議日期。
triggers:
  - 會議記錄
  - 整理會議
  - 逐字稿
---

你是一位效率型行政助理，擅長快速整理會議內容。

必產出的欄位：
- 會議基本資訊（時間/地點/出席者）
- 討論事項摘要（條列式）
- 決議事項（✅ 通過的決定）
- 待辦清單（📋 誰要做什麼/何時完成）
- 下次會議（日期/議程）
```

---

## 第 7 章：資安守則（所有模組通用）

### 7.1 前後端分工原則

```
前端（GitHub Pages / HTML / JS）
├── 允許包含的資訊：
│   ├── ✅ GAS Web App URL（公開端點）
│   ├── ✅ 前端邏輯與 UI 設定
│   └── ✅ 對話歷史（只存瀏覽器 sessionStorage）
│
└── 絕對禁止：
    ├── ❌ OpenRouter API Key
    ├── ❌ Google Service Account 金鑰
    └── ❌ 任何 sk-/sk-or-/AIza 開頭的字串

後端（Google Apps Script）
├── 允許包含的資訊：
│   ├── ✅ API Key（存 ScriptProperties，不寫在程式碼裡）
│   ├── ✅ Sheet ID（半公開，但不對外暴露）
│   └── ✅ 業務邏輯
│
└── 安全機制：
    ├── ✅ PropertiesService.getScriptProperties() 讀取金鑰
    ├── ✅ 部署後原始碼不對外公開
    └── ✅ 執行日誌只有 GAS 管理員可見
```

### 7.2 GAS ScriptProperties 設定步驟

```
1. 開啟 script.google.com，進入你的專案
2. 左側選單 → 「專案設定」（齒輪圖示）
3. 滑到「指令碼屬性」區塊
4. 點擊「新增屬性」
5. 填入以下屬性：

   屬性名稱          ｜ 值
   ─────────────────────────────────────
   OPENROUTER_API_KEY │ sk-or-v1-xxxxx
   SHEET_ID           │ 1BxiMVs0XRA5...
   ALLOWED_ORIGINS    │ https://你的帳號.github.io

6. 點擊「儲存指令碼屬性」
7. ✅ 完成！這些值只有你的 GAS 程式碼可以讀取
```

### 7.3 最小權限 MCP 配置

```json
// ~/.gemini/config/mcp.json 範例（正確配置）
{
  "mcpServers": {
    "google-workspace": {
      "permissions": {
        "sheets": "read",      // ✅ 只給讀取
        "drive": "read",       // ✅ 只給讀取
        "calendar": "none"     // ✅ 不需要就不給
      }
    }
  }
}

// ❌ 錯誤配置（給太多權限）：
{
  "permissions": {
    "sheets": "write",    // ⚠️ 給了寫入，但不需要
    "drive": "delete",    // ⚠️ 給了刪除，風險極高
    "admin": true         // ⚠️ 絕對不要
  }
}
```

### 7.4 Agent 絕對禁止的五種行為

```
⛔ 禁止行為 #1：把 API Key 寫進 HTML 或 JavaScript
   錯誤示範：<script>const API_KEY = "sk-or-v1-xxxxx";</script>
   正確做法：API Key 只存 GAS ScriptProperties，前端只有 GAS URL

⛔ 禁止行為 #2：把 API Key commit 進 git repo
   錯誤示範：git add config.js  （config.js 裡有 API Key）
   正確做法：在 .gitignore 加入 config.js，或用環境變數

⛔ 禁止行為 #3：在對話中明文說出 API Key
   錯誤示範：「你的 Key 是 sk-or-v1-AbCdEfGhIjKlMnOp」
   正確做法：只說「Key 已設定」或「請在 ScriptProperties 中設定」

⛔ 禁止行為 #4：繞過 GAS 直接從前端呼叫 OpenRouter
   錯誤示範：fetch('https://openrouter.ai/api/v1/chat', {headers: {Authorization: `Bearer ${API_KEY}`}})
   正確做法：前端 → GAS → OpenRouter（三層架構）

⛔ 禁止行為 #5：給 MCP 工具超出需要的權限
   錯誤示範：給 Sheets MCP「完整存取」（可讀可寫可刪除）
   正確做法：只給「唯讀」，除非明確需要寫入
```

### 7.5 洩漏 API Key 的緊急應對

如果 API Key 意外外洩：
1. **立即撤銷**：前往 OpenRouter 帳戶設定 → API Keys → 刪除洩漏的 Key
2. **立即換新**：重新生成 Key，更新 GAS ScriptProperties
3. **查看日誌**：確認 Key 是否被惡意使用（OpenRouter 後台有使用紀錄）
4. **git 清除**：若 Key 被 commit，用 `git filter-branch` 或 BFG 工具清除歷史

---

## 第 8 章：目錄結構

```
dataviz-analyst-skill/
├── SKILL.md                         # 本文件（主 Skill 指引，超過 1000 行完整 SOP）
├── README.md                        # 專案總覽與使用說明
├── LICENSE                          # MIT 授權條款
│
├── references/                      # 核心模組與參考資料
│   ├── prompt_library.md            # 所有 Prompt 模板庫（清洗/EDA/驗算/報告/客服/分鏡）
│   ├── cleaning_rules.md            # 五大清洗規則與 Pandas 速查表
│   ├── analysis_report_template.md  # 三段論商業洞察報告標準範本
│   │
│   ├── architecture/                # 🖥️ 端到端系統架構圖
│   │   └── system_architecture.html # 終端機風格動態管線圖（零重疊、小球動態、加載條）
│   │
│   ├── gas_backend/                 # 🔮 AI 客服 Google Apps Script 後端
│   │   └── Code.gs                  # 完整可運行的 GAS Web App 程式碼（含 OpenRouter & Sheets）
│   │
│   ├── jitong_frontend/             # 📱 數位乩童客服前端組件
│   │   ├── digital_jitong.js        # 客服控制核心（對話狀態、框選截圖、302跳轉）
│   │   ├── digital_jitong.css       # 懸浮按鈕與極簡對話框樣式
│   │   ├── html2canvas.min.js       # 螢幕畫面像素級截圖模組
│   │   └── avatar.png               # 官方科技賽博頭像
│   │
│   └── datasets/                    # 實戰資料集庫（開箱即用）
│       ├── sample_dirty_data.csv        # 行政活動預算（熱身 12 列）
│       ├── TWSE_上市公司營收_1088家.csv  # 臺灣證交所真實上市公司（進階 1,088 列）
│       ├── MOE_大專校院學生數_737筆.csv  # 教育部大專校院學生數（進階 737 列）
│       └── MOE_大專教師數_112學年.csv    # 教育部大專校院師資統計（進階 142 列）
│
├── scripts/                         # 自動化工具
│   └── clean_data.py                # Python 資料清洗腳本（千分位、百分比、缺失值、民國年）
│
└── templates/                       # 互動範本
    └── data_atoms.html              # 10 大 Data Atoms 互動儀表板（ECharts + 跨國地理引擎）
```

---

## 第 9 章：版權聲明

```
MIT License

Copyright (c) 2026 陳俊智博士（Elvis Chen, PhD）
國立臺中科技大學 國際貿易與經營系 · 智慧商務多代理人實驗室（ICMA Lab）

本 Skill 為「Agent × Skill × MCP 一日實戰工作坊」官方教材，
免費提供大專院校師生、研究同仁與工作坊學員使用與擴充。
若有改進，歡迎提交 Pull Request 回饋社群。

官方成果網：https://drchunchihchen.github.io/cv/
GitHub 倉庫：https://github.com/nutcelvischen-jpg/dataviz-analyst-skill
```

---

*本 Skill 由國立臺中科技大學 ICMA Lab 與 Antigravity AI 工作坊團隊維護 ｜ 最後更新：2026-11-03 ｜ 版本：v3.0.0*
