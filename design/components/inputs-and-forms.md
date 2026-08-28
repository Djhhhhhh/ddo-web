# 输入与表单样式规则

> 来源：原 DESIGN.md §4.4 ｜ 取值数据来源：`src/styles/tokens.css` ｜ 返回索引：[design/DESIGN.md](../DESIGN.md)

## 概述

文本输入、等宽输入、搜索 / 命令栏、textarea、复选框、开关与错误态。输入与按钮同尺寸等高（见 [../foundations/control-scale.md](../foundations/control-scale.md)）；命令栏是全站命令入口的统一形态。

## Token 引用

| Token | 用途 |
|---|---|
| `var(--surface-1)` / `var(--surface-2)` | 输入底 / ⌘K 徽章底 |
| `var(--border)` / `var(--border-subtle)` | 边框 |
| `var(--accent)` / `var(--accent-ring)` | focus 边框与焦点环、选中开关 |
| `var(--danger)` | 错误态 |
| `var(--text-primary)` / `var(--text-tertiary)` | 输入文字 / placeholder |
| `var(--font-sans)` / `var(--font-mono)` | 普通 / 等宽输入 |
| `var(--h-sm)` / `var(--h-md)` / `var(--h-lg)`、`var(--r-md)` | 高度与圆角 |

## 规则细则

- **文本输入**：`--surface-1` 底、`--border` 1px、圆角 `--r-md`（8px）、height 走尺寸标度、`--font-sans`。`focus` → 边框 `--accent` + `--accent-ring` 3px。placeholder 用 `--text-tertiary`。
- **等宽输入**（命令、ID）：`--font-mono` 12.5px，用于需要等宽对齐的技术字段。
- **搜索 / 命令栏**：等宽字体 + 左侧 `⌕` 图标 + 右侧 `⌘K` 快捷键徽章（`--surface-2` 底 + `--border` + radius 5px），与普通表单输入区分。是全站命令入口的统一形态。
- **textarea**：min-height 64px、可调、行高 1.5。
- **错误态**：边框 `--danger`，focus 环改 `--danger` @35%，下方 11px `--danger` 文字说明。
- **复选框**：16px、radius 4px、选中 `--accent` 底 + 白勾。
- **开关**：34×20px、`--pill` 圆角、选中 `--accent`。

> 备注：⌘K 徽章 radius 5px 与复选框 radius 4px 为原文保留值（非圆角三档标度），仅适用于这两个特定小件；其余控件圆角仍只取 `--r-sm/--r-md/--r-lg`。

## Do's & Don'ts

**Do**

- 搜索 / 命令入口统一用命令栏形态（等宽 + 左 `⌕` + 右 `⌘K`）。
- 输入 focus 用 `--accent` 边框 + `--accent-ring` 环。
- 错误提示紧贴输入下方，11px `--danger` 文字。

**Don't**

- 不用阴影表达输入焦点。
- 不让命令栏与普通输入同形（必须有图标与快捷键徽章）。

## AI 实现检查清单

- [ ] 输入底 `--surface-1`、边框 `--border`、圆角 `--r-md`、高度走 `--h-*`。
- [ ] focus：边框 `--accent` + 3px `--accent-ring`；错误态改 `--danger` 系。
- [ ] 等宽技术字段用 `--font-mono`。
- [ ] 命令栏含 `⌕` 图标与 `⌘K` 徽章（徽章 `--surface-2` + `--border` + 5px 圆角）。
- [ ] 开关为唯一使用 `--pill` 的控件。

## 示例 prompt

> “做一行命令栏搜索：Fira Code 12.5px、左侧 `⌕` 图标、右侧 `⌘K` 徽章（surface-2 底 + border + 5px 圆角）。focus 时 accent 焦点环 3px。”
