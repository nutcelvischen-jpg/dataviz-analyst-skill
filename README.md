# 📊 dataviz-analyst-skill v3.0

> **數據視覺化與 AI 工作流程完整實戰技能包 (Full Combat Skill for Antigravity & LLM Agents)**  
> 專為 Antigravity、Claude Code、ChatGPT 代理人打造。學生載入後，Agent 會主動詢問學習目標與需求，引導完成資料分析、AI 客服搭建、Tableau 互動儀表板、動態影片生成與專屬 Skill 封裝。

**作者**：陳俊智 博士（Elvis Chen, PhD）｜ 國立臺中科技大學 國際貿易與經營系 · 智慧商務多代理人實驗室（ICMA Lab）  
**課程**：Agent × Skill × MCP 一日實戰工作坊（11/5）  
**GitHub 倉庫**：[https://github.com/nutcelvischen-jpg/dataviz-analyst-skill](https://github.com/nutcelvischen-jpg/dataviz-analyst-skill)  
**授權**：MIT License

---

## 🚀 五大核心模組全貌

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   ANTIGRAVITY DATA & AI WORKFLOW SKILL                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
        ┌───────────────┬──────────────┼──────────────┬───────────────┐
        ▼               ▼              ▼              ▼               ▼
   [模組 A]        [模組 B]        [模組 C]       [模組 D]        [模組 E]
   資料分析五階段   AI 客服「數位乩童」 Tableau 儀表板    60秒動態數據影片  打造客製 Skill
   • 髒資料清洗     • GitHub Pages • 10大DataAtoms • 幾何形變動量   • SOP 五骨架
   • EDA 探索      • GAS 安全中繼  • 跨國地理引擎  • Earshot 音效   • YAML 規格
   • 防幻覺驗算     • OpenRouter   • 拖曳維度度量  • Puppeteer 渲染 • 3大業務範本
   • 三段論報告     • Google Sheets• 1080p 匯出    • FFmpeg 壓製
```

---

## ⚡ 快速安裝與使用

### 1. 安裝至 Antigravity 專案
在你的 Antigravity 專案中將本倉庫 clone 至 `.agents/skills/` 目錄：

```bash
mkdir -p .agents/skills
git clone https://github.com/nutcelvischen-jpg/dataviz-analyst-skill.git .agents/skills/dataviz-analyst
```

### 2. 在對話中呼叫
直接向 Antigravity 提問，Agent 會自動啟動導航問卷：
- 「幫我做數據分析」
- 「我想做一個像數位乩童的 AI 客服」
- 「我想用 Data Atoms 做 Tableau-like 儀表板」
- 「我想做 60 秒數據動態短片」
- 「我想把自己單位的行政流程寫成 Skill」

---

## 📋 模組功能詳細清單

| 模組 | 名稱 | 包含資源與工具 | 產出成果 |
| :--- | :--- | :--- | :--- |
| **模組 A** | **資料分析五階段** | `scripts/clean_data.py`<br>`references/cleaning_rules.md`<br>`references/prompt_library.md` | 乾淨 CSV、描述性統計、皮爾森相關性、Cross-Verification 勾稽表、三段論報告 |
| **模組 B** | **AI 客服「數位乩童」** | `references/gas_backend/Code.gs`<br>前後端架構圖解<br>html2canvas 框選截圖模組 | GitHub Pages 免費前端 + Google Apps Script 安全中繼 + OpenRouter 推理 + Sheets 資料庫 |
| **模組 C** | **Tableau-like 儀表板** | `templates/data_atoms.html`<br>10 大 Data Atoms<br>跨國地理座標自適應引擎 | 零依賴 HTML 拖曳式工作台、支援日本47都道府縣/台灣22縣市/全球/美國、1080p 匯出 |
| **模組 D** | **60 秒動態數據短片** | Canvas 阻尼震盪力學<br>Earshot 物理音效與避讓<br>Headless Chrome 逐幀提取 | 1920x1080 @ 60FPS 幾何形變與旁白混音廣播級 MP4 影片 |
| **模組 E** | **客製 Skill 封裝** | 提示詞工程心法<br>3 套現成範本（公文審核/學生報告/會議紀錄） | 包含 Role, Context, Constraints, Workflow, Output Schema 的標準化 SKILL.md |

---

## 📁 倉庫目錄結構

```text
dataviz-analyst-skill/
├── SKILL.md                              # 🌟 核心 Agent 導引手冊 (超過 1000 行完整 SOP)
├── README.md                             # 專案總覽與使用說明
├── LICENSE                               # MIT 授權條款
│
├── scripts/
│   └── clean_data.py                     # 自動化資料清洗腳本（處理千分位、百分比、缺失值、民國年）
│
├── references/
│   ├── cleaning_rules.md                 # 資料清洗常見 5 大陷阱與 Pandas 速查表
│   ├── prompt_library.md                 # 完整 Prompt 提示詞庫（清洗/EDA/驗算/洞察/客服/分鏡）
│   ├── analysis_report_template.md       # C-Level 三段論商業洞察報告標準範本
│   │
│   ├── gas_backend/                      # 🔮 AI 客服 Google Apps Script 後端範本
│   │   └── Code.gs                       # 完整可運行的 GAS Web App 程式碼 (含 OpenRouter & Sheets)
│   │
│   └── datasets/                         # 實戰資料集庫 (開箱即用)
│       ├── sample_dirty_data.csv         # 行政活動預算（熱身 12 列）
│       ├── TWSE_上市公司營收_1088家.csv   # 臺灣證交所真實上市公司（進階 1,088 列）
│       ├── MOE_大專校院學生數_737筆.csv   # 教育部大專校院學生數（進階 737 列）
│       └── MOE_大專教師數_112學年.csv     # 教育部大專校院師資統計（進階 142 列）
│
└── templates/
    └── data_atoms.html                   # 10 大 Data Atoms 互動儀表板（開箱即用）
```

---

## 🛡️ 資安三鐵律（安全防護守則）

1. **API Key 絕不放前端**：前端 HTML / JS 永遠只有 0% 金鑰。所有金鑰必須存放於 Google Apps Script `ScriptProperties` 或伺服器環境變數，按右鍵檢視原始碼絕不外洩。
2. **算術防幻覺交叉驗算**：禁止大語言模型用文字機率「猜測」數字，必須強制調用 Python 編譯器運算，並輸出 $S_1 - S_2 = 0$ 勾稽證明。
3. **個資脫敏原則**：學生身分證號、手機、私人成績等敏感資料，在送交 AI 推理前必須完成遮罩脫敏。

---

## 📜 授權與維護

- **核心作者**：陳俊智 博士（Elvis Chen, PhD）
- **服務機構**：國立臺中科技大學 國際貿易與經營系 / 商業智慧應用與研究中心 / 智慧商務多代理人實驗室（ICMA Lab）
- **授權條款**：[MIT License](LICENSE)
