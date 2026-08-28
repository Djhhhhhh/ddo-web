# 密集表格样式规则

> 来源：原 DESIGN.md §4.8 ｜ 取值数据来源：`src/styles/tokens.css` ｜ 返回索引：[design/DESIGN.md](../DESIGN.md)

## 概述

密集表格承载高信息密度数据；等宽数据列与 `tabular-nums` 保证纵向对齐。小屏横向滚动保结构。既有实现参照：`src/components/ui/Table`。

## Token 引用

| Token | 用途 |
|---|---|
| `var(--text-tertiary)` | 表头 |
| `var(--text-secondary)` / `var(--text-primary)` | 单元格 / 代码数值列 |
| `var(--border)` / `var(--border-subtle)` | 表头底边 / 行分隔 |
| `var(--surface-2)` | 行 hover |
| `var(--accent-subtle)` / `var(--accent)` | 选中行底 / 内描边 |
| `var(--font-mono)` | 代码 / 数值列 |

## 规则细则

- 表头：11px、weight 500、uppercase、letter-spacing .04em、`--text-tertiary`、底部 1px `--border`。
- 单元格：padding `9px 10px`、底部 1px `--border-subtle`、`--text-secondary`。
- 代码/数值列：`--font-mono` 12px（`--fs-code-sm`）+ `tabular-nums` + `--text-primary`，保证纵向对齐。
- 行 hover：`--surface-2` 底。
- 选中行：`--accent-subtle` 底 + 首列左侧 2px `--accent` 内描边。
- 响应式：小屏不挤碎，横向滚动，等宽数据列保留 `tabular-nums`（见 [../foundations/responsive.md](../foundations/responsive.md)）。

## Do's & Don'ts

**Do**

- 表头 uppercase + letter-spacing + `--text-tertiary`。
- 代码/数值列用等宽 + `tabular-nums` 对齐。

**Don't**

- 小屏不压碎表格（用横向滚动）。
- 不把数据列用变宽字体展示。

## AI 实现检查清单

- [ ] 表头 11px / 500 / uppercase / .04em / `--text-tertiary` / 底 1px `--border`。
- [ ] 单元格 `9px 10px` padding、底 1px `--border-subtle`。
- [ ] 代码数值列 `--font-mono` 12px + `tabular-nums` + `--text-primary`。
- [ ] 行 hover `--surface-2`；选中行 `--accent-subtle` + 左 2px `--accent` 描边。

## 示例 prompt

> “做密集表格：表头 11px uppercase `text-tertiary`、单元格 9px padding、代码列 Fira Code 12px tabular-nums。选中行 accent-subtle 底 + 首列左 2px accent 描边。”