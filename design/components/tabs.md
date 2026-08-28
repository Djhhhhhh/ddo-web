# Tabs 样式规则

> 来源：原 DESIGN.md §4.7 ｜ 取值数据来源：`src/styles/tokens.css` ｜ 返回索引：[design/DESIGN.md](../DESIGN.md)

## 概述

Tabs 用「浮起」而非下划线区分激活态：pill 容器 + 浮起小卡。既有实现参照：`src/components/ui/Tabs`。

## Token 引用

| Token | 用途 |
|---|---|
| `var(--surface-2)` / `var(--surface-1)` | 容器底 / 激活 tab 底 |
| `var(--border)` | 容器 1px 边框 |
| `var(--text-secondary)` / `var(--text-primary)` | 非激活 / 激活文字 |
| `var(--r-md)` / `var(--r-sm)` | 容器圆角 / tab 圆角 |
| `--e1` 轻阴影 | 激活 tab 浮起 |

## 规则细则

- 容器：`--surface-2` 底 + `--border` 1px + 圆角 `--r-md`（8px）+ 内 padding `--s1`（3px）（pill 容器）。
- 单 tab：height 26px、圆角 `--r-sm`（6px）、文字 `--text-secondary`；激活态 `--surface-1` 底 + `--text-primary` + 轻阴影（浮起小卡，`--e1`）。
- 不用下划线式 tabs；激活态靠“浮起”区分。

## Do's & Don'ts

**Do**

- 用表面位移（`--surface-2` → `--surface-1`）+ 轻阴影表达激活态。

**Don't**

- 不用下划线式 tabs。
- 不给 tab 加高度标度外的自定义高度。

## AI 实现检查清单

- [ ] 容器：`--surface-2` + `--border` + `--r-md` + 内 padding `--s1`。
- [ ] 激活 tab：`--surface-1` + `--text-primary` + 轻阴影浮起；非激活 `--text-secondary`。
- [ ] 未使用下划线区分激活态。

## 示例 prompt

> “做 Tabs：surface-2 容器 + border + 8px 圆角 + 内 padding 3px。激活 tab surface-1 底 + text-primary + 轻阴影浮起，非激活 text-secondary。不用下划线。”