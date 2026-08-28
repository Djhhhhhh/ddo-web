# Token 速查

> 来源：原 DESIGN.md §10.1 ｜ 取值数据来源：`src/styles/tokens.css` ｜ 返回索引：[design/DESIGN.md](../DESIGN.md)

## 概述

本文件是规范目录中允许记录具体取值的两份文件之一（另一份为 [colors.md](colors.md)）。取值以 `src/styles/tokens.css` 为准；如有出入，以 tokens.css 为唯一数据来源。

## 色彩（dark 默认 / light）

- 页面底色：`--canvas` `#0A0A0B` / `#FAFAFA`
- 卡片面：`--surface-1` `#121214` / `#FFFFFF`
- 次级面：`--surface-2` `#1B1B1F` / `#F4F4F5`
- 代码块：`--code-bg` `#0F0F11`（恒暗）
- 主文字：`--text-primary` `#EDEDEF` / `#18181B`
- 次文字：`--text-secondary` `#A1A1AA` / `#52525B`
- 弱文字：`--text-tertiary` `#71717A` / `#8E8E93`
- 边框：`--border` `#27272A` / `#E4E4E7`
- 信号色：`--accent` `#10B981` / `#059669`；`--accent-hover` `#059669` / `#047857`；`--accent-ring` @45% / @40%
- 语义：`--success` `#22C55E` / `#16A34A`；`--warning` `#F59E0B` / `#D97706`；`--danger` `#EF4444` / `#DC2626`；`--info` = `--accent`

## 其他标度

- **间距（base 8）**：4 · 6 · 8 · 10 · 12 · 14 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80（`--s1` ~ `--s14`）
- **圆角**：`--r-sm` 6 · `--r-md` 8 · `--r-lg` 12（`--pill` 仅 switch）
- **控件高度**：`--h-sm` 28 · `--h-md` 36 · `--h-lg` 44
- **字体**：Manrope（sans）· Fira Code（mono）· 字重 400 / 500 / 600
- **阴影**：`--e0` none · `--e1` 轻浮 · `--e2` 卡 · `--e3` 弹层（见 [elevation.md](elevation.md)）
- **滚动条**：轨道透明 · 滑块 `color-mix(in srgb, var(--text-tertiary) 30%, transparent)`（hover @50%）· 宽 10px · 圆角细条（见 [../components/scrollbar.md](../components/scrollbar.md)）

## 裁决注记

- `--text-tertiary` dark 取 `#71717A`：原 §10.1 曾作 `#71737A`，判定为笔误，以原 §2.2 与 `src/styles/tokens.css` 为准（见索引「裁决与迁移记录」）。
