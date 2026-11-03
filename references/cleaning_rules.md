# 資料清洗實務速查指引 (Data Cleaning Rules & Cheatsheet)

在進行資料視覺化與分析前，未經清洗的髒資料（Dirty Data）常會導致圖表軸線錯亂、數值被誤認為字串（Categorical）或無法繪製。

---

## 一、 常見五大髒資料型態與處理規則

| 髒資料型態 | 常見表現 | 清洗標準與因應策略 |
|---|---|---|
| **1. 偽裝成文字的數值** | `"1,250,000"` (帶千分位逗號) | 移除逗號 `,`，轉換為整數 `int` 或浮點數 `float`。 |
| **2. 百分比字串** | `"28.4%"` | 去除 `%` 符號，轉換為浮點數 `28.4`，由圖表工具加上單位標籤。 |
| **3. 雜亂的缺失值** | `null`, `NaN`, `N/A`, `-`, 空白 | 統一替換為標準空白或數值 0，並在統計時剔除或插值。 |
| **4. 寬表與長表混淆** | 橫跨數十年的年份作為獨立欄位 | 建議轉換為 Tidy Data（具有 `年份`、`指標`、`數值` 三欄的長表）。 |
| **5. 欄位標題空格** | `" 都道府縣 "` (頭尾帶空白) | 使用 `.strip()` 移除多餘空白，避免資料庫或 Tableau 比對失敗。 |

---

## 二、 Python Pandas 快速清洗常用語法

```python
import pandas as pd

# 1. 讀取並去除標題空格
df = pd.read_csv('raw_data.csv')
df.columns = df.columns.str.strip()

# 2. 去除逗號並轉數值
df['人口'] = df['人口'].astype(str).str.replace(',', '').astype(float)

# 3. 去除百分比並轉數值
df['高齡化率'] = df['高齡化率'].astype(str).str.rstrip('%').astype(float)

# 4. 缺失值處理
df['所得'] = df['所得'].fillna(df['所得'].median())  # 用中位數填補

# 5. 去除完全重複的列
df = df.drop_duplicates()

# 6. 輸出標準 UTF-8 帶 BOM (Excel 相容)
df.to_csv('cleaned_data.csv', index=False, encoding='utf-8-sig')
```
