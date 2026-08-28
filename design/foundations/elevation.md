# 层级与阴影规则

> 来源：原 DESIGN.md §6 ｜ 取值数据来源：`src/styles/tokens.css` ｜ 返回索引：[design/DESIGN.md](../DESIGN.md)

## 概述

阴影极轻，只用于分层；正常态优先靠**背景色位移**与 1px 边框分隔，不靠阴影。焦点用 `var(--accent-ring)` 环，不用阴影表达。

## Token 引用

| Token | 用途 |
|---|---|
| `var(--e0)` / `var(--e1)` / `var(--e2)` / `var(--e3)` | elevation 四档 |
| `var(--canvas)` / `var(--surface-1)` / `var(--surface-2)` | 背景位移分层 |
| `var(--border)` / `var(--border-subtle)` | 1px 边框分隔 |
| `var(--accent-ring)` | 焦点环 |

## 规则细则

### elevation 四档

| 档位 | Token | 用途 |
|---|---|---|
| e0 Flat | `--e0`（none） | 页面底、内嵌文本块 |
| e1 Raised | `--e1` | 次级卡片、表格行悬浮 |
| e2 Card | `--e2` | 标准卡片、面板、顶栏 |
| e3 Overlay | `--e3` | Toast、下拉、模态、浮窗 |

> 具体阴影取值定义在 `src/styles/tokens.css`（dark / light 各一套），实现只引用 `var(--e0)` ~ `var(--e3)`，不复制数值。

### 分隔策略

- **首选背景色位移**：`--canvas` → `--surface-1` → `--surface-2`，靠明度差分层，不加阴影不加边框。
- **次选 1px 边框**：当背景位移不足或同表面需并列时，用 `var(--border)` / `var(--border-subtle)` 分隔。
- **阴影仅用于 e1–e3**：浮起、卡片、弹层。正常态不用阴影。
- 禁止重投影、禁止拟物高光、禁止用阴影表达焦点。

### 焦点表达

- 焦点统一用 `var(--accent-ring)` 3px 环，作用于 `focus-visible`。
- 不用阴影、不用边框变色表达焦点。

## Do's & Don'ts

**Do**

- 正常态靠背景色位移与 1px 边框分层；阴影仅用于 e1–e3 浮起 / 卡片 / 弹层。
- 焦点统一用 `--accent-ring` 3px 环（`focus-visible`）。

**Don't**

- 不用重投影、拟物高光、品牌渐变；不用阴影表达焦点。
- 不在正常态（e0 场景）添加阴影。

## AI 实现检查清单

- [ ] `box-shadow` 只引用 `var(--e1)` / `var(--e2)` / `var(--e3)`，无自定义阴影值。
- [ ] 分层优先顺序：背景位移 → 1px 边框 → 阴影。
- [ ] 交互元素 `:focus-visible` 使用 `var(--accent-ring)` 3px 环。
- [ ] dark / light 下阴影档位取自 tokens.css 对应主题值，未硬编码。
