# 反馈 Toast 样式规则

> 来源：原 DESIGN.md §4.9 ｜ 取值数据来源：`src/styles/tokens.css` ｜ 返回索引：[design/DESIGN.md](../DESIGN.md)

## 概述

Toast 提供克制的三态反馈：圆点 + 边框配色区分 success / info / error，不使用大块彩色背景。

## Token 引用

| Token | 用途 |
|---|---|
| `var(--surface-1)` | 底色 |
| `var(--border)` | 1px 边框 |
| `var(--r-md)` | 圆角 |
| `var(--e3)` | 弹层阴影档 |
| `var(--success)` / `var(--accent)` / `var(--danger)` | 三态圆点 + 边框 |
| `var(--text-primary)` / `var(--text-secondary)` | 标题 / 描述 |

## 规则细则

- `--surface-1` 底 + `--border` 1px + 圆角 `--r-md`（8px）+ 阴影 `--e3`，max-width 340px。
- 左侧 8px 圆点 + 标题（13px 600）+ 描述（12px `--text-secondary`），右侧关闭 `×`。
- 三态靠圆点 + 边框配色：

| 状态 | 圆点 / 边框色 |
|---|---|
| success | `--success` |
| info | `--accent` |
| error | `--danger` |

- 不使用大块彩色背景，保持克制。

## Do's & Don'ts

**Do**

- 用圆点 + 边框配色表达状态，底色保持 `--surface-1`。
- 用 `--e3` 弹层阴影表达浮起。

**Don't**

- 不用彩色背景块做 Toast。
- 不给 Toast 用重于 `--e3` 的阴影。

## AI 实现检查清单

- [ ] 底 `--surface-1`、边框 `--border`、圆角 `--r-md`、阴影 `--e3`、max-width 340px。
- [ ] 左 8px 圆点 + 13px 600 标题 + 12px `--text-secondary` 描述 + 右 `×`。
- [ ] 三态配色与上表一致，无彩色背景块。