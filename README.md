# 📊 dataviz-analyst-skill

> **數據分析師完整作戰技能包**  
> 供 Antigravity / Claude / ChatGPT Agent 讀取，主動蒐集資料並完整執行五大分析階段。

**作者**：陳俊智博士（Elvis Chen, PhD）｜ 國立臺中科技大學 ICMA Lab  
**課程**：Agent × Skill × MCP 一日實戰工作坊（11/5）  
**授權**：MIT License

---

## ⚡ 一分鐘快速開始

```bash
git clone https://github.com/nutcelvischen-jpg/dataviz-analyst-skill.git
cd dataviz-analyst-skill

# 清洗練習資料
python3 scripts/clean_data.py references/datasets/sample_dirty_data.csv cleaned_data.csv

# 在瀏覽器開啟互動儀表板
open templates/data_atoms.html
```

---

## 📋 技能架構（SKILL.md 總覽）

本技能讓 Agent 按以下五個階段完成完整分析任務：

```
Phase 1          Phase 2          Phase 3          Phase 4          Phase 5
資料蒐集   ──▶   清洗標準化  ──▶   EDA 探索   ──▶   圖表視覺化  ──▶   洞察報告
(取得)           (清洗)            (探索)            (呈現)           (決策)
```

**Agent 啟動後，先讀 SKILL.md，再向學員詢問六大問題，確認後才開始分析。**

---

## 📁 目錄結構

```
dataviz-analyst-skill/
├── SKILL.md                              # 🌟 Agent 必讀技能說明
├── README.md                             # 本文件
│
├── scripts/
│   └── clean_data.py                     # 自動化清洗腳本（無外部依賴）
│
├── references/
│   ├── cleaning_rules.md                 # 五大髒資料清洗速查表
│   ├── prompt_library.md                 # 完整 Prompt 提示詞庫
│   ├── analysis_report_template.md       # 商業洞察報告範本
│   └── datasets/
│       ├── sample_dirty_data.csv             # 行政活動預算（熱身 12 列）
│       ├── TWSE_上市公司營收_1088家.csv      # 台灣上市公司（進階 1,088 列）
│       ├── MOE_大專校院學生數_737筆.csv      # 教育部學生統計（進階 737 列）
│       └── MOE_大專教師數_112學年.csv        # 教育部師資統計（進階 142 列）
│
└── templates/
    └── data_atoms.html                   # 10 大 Data Atoms 互動儀表板
```

---

## 🎯 核心功能

| 功能 | 說明 |
| :--- | :--- |
| **六大問卷** | Agent 主動詢問分析目的、資料來源、規模、對象、圖表需求與資料品質 |
| **自動清洗** | 千分位逗號、百分比字串、缺失值、首尾空白、民國年、多編碼偵測 |
| **EDA 探索** | 描述性統計、極端值識別、相關性分析、時序趨勢與拐點偵測 |
| **防幻覺驗算** | Cross-Verification 算術勾稽，強制使用 Python Code Interpreter |
| **10 大 Data Atoms** | 柱狀、折線、雙軸、地圖、盒鬚、樹圖、散佈、甜甜圈、雷達、漏斗 |
| **三段論報告** | 現況事實 → 深度原因 → 行動建議，C-Level 匯報標準格式 |
| **地理引擎** | 自動偵測並支援日本 47 都道府縣、台灣 22 縣市、全球、美國各州 |

---

## 📦 實戰資料集

| 資料集 | 來源 | 規模 | 主要挑戰 |
| :--- | :--- | :--- | :--- |
| `sample_dirty_data.csv` | 教學範例 | 12 列 | 千分位、民國年、缺失值 |
| `TWSE_上市公司營收_1088家.csv` | 臺灣證交所 | 1,088 列 | 千分位、YoY 計算 |
| `MOE_大專校院學生數_737筆.csv` | 教育部統計處 | 737 列 | 千分位、校名空格 |
| `MOE_大專教師數_112學年.csv` | 教育部統計處 | 142 列 | 職稱維度切分 |

---

## 🛡 Agent 邊界約束

- ❌ 不得對髒資料直接計算（清洗前禁止統計）
- ❌ 不得憑語言預測生成數字（必須用 Python 計算）
- ❌ 不得省略 Cross-Verification 驗算表格
- ❌ 不得讓 API 金鑰出現在程式碼或 CSV 中
- ✅ 發現個資時提醒學員先脫敏

---

## 📜 授權

MIT License © 2026 陳俊智博士（Elvis Chen, PhD）  
國立臺中科技大學 國際貿易與經營系 · 智慧商務多代理人實驗室（ICMA Lab）
