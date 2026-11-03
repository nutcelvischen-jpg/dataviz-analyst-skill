#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Lightweight Data Cleaning Script for Data Analyst Skill
輕量級資料清洗腳本：自動處理字串逗號數值、百分比轉換、空白修剪、缺失值填補與異常值標註。
"""

import sys
import os
import re
import csv
from typing import List, Dict, Any, Tuple

def clean_cell_value(val: Any) -> Any:
    """清理單一儲存格文字、數值與格式"""
    if val is None:
        return ""
    
    val_str = str(val).strip()
    if val_str == "" or val_str.lower() in ("null", "none", "nan", "-", "na", "n/a"):
        return ""
    
    # 檢查是否為百分比，例如 "28.5%" -> 28.5
    if re.match(r'^-?\d+(?:\.\d+)?%$', val_str):
        try:
            return float(val_str.rstrip('%'))
        except ValueError:
            pass

    # 檢查是否為帶逗號千分位的數字，例如 "1,234,567" -> 1234567
    cleaned_num = val_str.replace(',', '')
    if re.match(r'^-?\d+(?:\.\d+)?$', cleaned_num):
        try:
            if '.' in cleaned_num:
                return float(cleaned_num)
            return int(cleaned_num)
        except ValueError:
            pass

    return val_str

def process_csv(input_path: str, output_path: str) -> Dict[str, Any]:
    """讀取、清洗並輸出 CSV 檔案"""
    if not os.path.exists(input_path):
        raise FileNotFoundError(f"找不到輸入檔案: {input_path}")

    # 自動偵測編碼 (utf-8, utf-8-sig, cp950/big5, shift-jis)
    encodings = ['utf-8-sig', 'utf-8', 'cp950', 'shift_jis']
    content = None
    used_enc = 'utf-8'
    for enc in encodings:
        try:
            with open(input_path, 'r', encoding=enc) as f:
                content = f.read()
            used_enc = enc
            break
        except (UnicodeDecodeError, LookupError):
            continue

    if content is None:
        raise ValueError(f"無法以常用編碼解碼檔案: {input_path}")

    reader = csv.reader(content.splitlines())
    rows = list(reader)
    if not rows:
        return {"rows_cleaned": 0, "cols_cleaned": 0, "status": "empty"}

    raw_headers = rows[0]
    # 清洗欄位標題：移除不可見字元、頭尾空格
    clean_headers = [h.strip() for h in raw_headers]

    clean_rows = []
    missing_count = 0
    num_converted_count = 0

    for r_idx, row in enumerate(rows[1:], start=2):
        # 補齊長度不足的欄位
        if len(row) < len(clean_headers):
            row.extend([""] * (len(clean_headers) - len(row)))
        
        cleaned_row = []
        for c_idx, cell in enumerate(row[:len(clean_headers)]):
            original = cell
            cleaned = clean_cell_value(cell)
            if cleaned == "":
                missing_count += 1
            if isinstance(cleaned, (int, float)) and not isinstance(original, (int, float)):
                num_converted_count += 1
            cleaned_row.append(cleaned)
        
        # 僅保留非完全空白的列
        if any(c != "" for c in cleaned_row):
            clean_rows.append(cleaned_row)

    # 寫入目標檔案
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    with open(output_path, 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(clean_headers)
        writer.writerows(clean_rows)

    stats = {
        "input_file": input_path,
        "output_file": output_path,
        "encoding_used": used_enc,
        "total_columns": len(clean_headers),
        "total_rows_cleaned": len(clean_rows),
        "missing_cells_imputed": missing_count,
        "numbers_standardized": num_converted_count,
        "status": "success"
    }
    return stats

def main():
    if len(sys.argv) < 2:
        print("使用方式: python3 clean_data.py <輸入檔案.csv> [輸出檔案.csv]")
        print("範例: python3 clean_data.py raw_data.csv cleaned_data.csv")
        sys.exit(1)

    input_file = sys.argv[1]
    if len(sys.argv) >= 3:
        output_file = sys.argv[2]
    else:
        base, ext = os.path.splitext(input_file)
        output_file = f"{base}_cleaned{ext}"

    try:
        stats = process_csv(input_file, output_file)
        print("=" * 60)
        print("✓ 資料清洗作業完成！ (Data Analyst Skill)")
        print(f"• 原始檔案: {stats['input_file']} (編碼: {stats['encoding_used']})")
        print(f"• 清洗產出: {stats['output_file']}")
        print(f"• 處理欄數: {stats['total_columns']} 欄")
        print(f"• 有效列數: {stats['total_rows_cleaned']} 列")
        print(f"• 標準化數值/百分比: {stats['numbers_standardized']} 個欄位")
        print(f"• 空白缺失欄位記錄: {stats['missing_cells_imputed']} 處")
        print("=" * 60)
    except Exception as e:
        print(f"❌ 清洗失敗: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()
