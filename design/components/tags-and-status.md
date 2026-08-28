# 标签与状态点样式规则

> 来源：原 DESIGN.md §4.3 ｜ 取值数据来源：`src/styles/tokens.css` ｜ 返回索引：[design/DESIGN.md](../DESIGN.md)

## 概述

标签与状态点是元数据的最小载体：role 标签、语义徽章、状态点三类。标签不计入控件高度标度，自成小一级节奏（见 [../foundations/control-scale.md](../foundations/control-scale.md)）。既有实现参照：`src/components/ui/Badge`。

## Token 引用

| Token | 用途 |
|---|---|
| `var(--accent)` / `var(--accent-subtle)` | accent 变体（role 名） |
| `var(--surface-2)` / `var(--text-secondary)` | 中性变体 |
| `var(--success)` / `var(--warning)` / `var(--danger)` | 语义徽章与状态点 |
| `var(--text-tertiary)` | 空闲状态点 |
| `var(--font-mono)` | 标签等宽字体 |
| `var(--r-sm)` | 标签圆角 |

## 规则细则

- **role 标签**：等宽（`--font-mono`）11px、padding `3px 8px`（`--s1` 纵向 / `--s3` 横向）、圆角 `--r-sm`（6px）。`accent` 变体（role 名）用 `--accent-subtle` 底 + `--accent` 文字；中性变体用 `--surface-2` 底 + `--text-secondary` 文字。
- **语义徽章**：`--success` / `--warning` / `--danger` 各用对应语义色 @14% 底 + 同色文字 + @28% 边框。
- **状态点**：7px 圆点 + 12px 文字，颜色映射：

| 状态 | 颜色 |
|---|---|
| 运行中 | `--success` |
| 待确认 | `--warning` |
| 失败 | `--danger` |
| 选中 | `--accent` |
| 空闲 | `--text-tertiary` |

> 信号色与 `--success` 均为绿，靠载体区分：`--accent` 用于可操作（选中标签），`--success` 仅用于状态小件（运行中），二者不共用同一载体（见 [../foundations/colors.md](../foundations/colors.md)）。

## Do's & Don'ts

**Do**

- role 名用等宽小字号标签；状态语义用徽章 / 状态点。
- 徽章底色用语义色 @14% 透明派生，不引新值。

**Don't**

- 不给标签加高度标度（它自成小一级节奏）。
- 不用实心语义色块做徽章底。

## AI 实现检查清单

- [ ] role 标签：`--font-mono` 11px、padding `3px 8px`、圆角 `--r-sm`。
- [ ] 语义徽章：@14% 底 + 同色文字 + @28% 边框，颜色来自语义色派生。
- [ ] 状态点颜色映射与上表一致。
- [ ] 未把标签高度并入控件标度。
