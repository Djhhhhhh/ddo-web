# 按钮样式规则

> 来源：原 DESIGN.md §4.2 ｜ 取值数据来源：`src/styles/tokens.css` ｜ 返回索引：[design/DESIGN.md](../DESIGN.md)

## 概述

按钮是唯一主操作的载体，共 5 个变体。字重 600，高度走控件尺寸标度（见 [../foundations/control-scale.md](../foundations/control-scale.md)），状态反馈靠色彩位移与焦点环，不靠阴影。既有实现参照：`src/components/ui/Button`。

## Token 引用

| Token | 用途 |
|---|---|
| `var(--accent)` / `var(--accent-hover)` / `var(--accent-subtle)` | primary / tonal 变体 |
| `var(--surface-2)` / `var(--border)` | secondary 变体、ghost hover |
| `var(--text-primary)` / `var(--text-secondary)` | 按钮文字 |
| `var(--danger)` | danger 变体 |
| `var(--accent-ring)` | 焦点环 |
| `var(--h-sm)` / `var(--h-md)` / `var(--h-lg)`、`var(--r-sm)` / `var(--r-md)` | 尺寸与圆角 |

## 规则细则

### 变体

| 变体 | 背景 | 文字 | 边框 | 用途 |
|---|---|---|---|---|
| `primary` | `--accent` | 白字（on-accent 反色，暂无专属 token，见裁决记录） | `--accent` | 唯一主操作（New run / 提交） |
| `tonal` | `--accent-subtle` | `--accent` | `--accent` @25% | 次级强调、选中态 |
| `secondary` | `--surface-2` | `--text-primary` | `--border` | 常规次级操作 |
| `ghost` | transparent | `--text-secondary` | transparent | 导航 / 弱操作，hover 显 `--surface-2` |
| `danger` | transparent | `--danger` | `--danger` @40% | 删除 / 危险操作 |

### 状态与细节

- 字重 600；hover 加深（primary → `--accent-hover`）；`focus-visible` 显示 `--accent-ring` 3px 焦点环。
- 带图标按钮：图标 14px、与文字 gap `--s2`（6px），图标继承文字色（图标规格见 [../foundations/icons-and-graphics.md](../foundations/icons-and-graphics.md)）。
- `disabled`：opacity .45、cursor not-allowed，不响应 hover。
- 上下 padding `--s4`（10px）；高度与圆角随尺寸档（见 [../foundations/control-scale.md](../foundations/control-scale.md)）。

## Do's & Don'ts

**Do**

- 一个视图内只有一个 `primary`；其余操作降级为次级变体。
- 焦点环只走 `focus-visible` + `--accent-ring`。

**Don't**

- 不用阴影表达按钮状态变化。
- 不用 `--pill` 圆角做按钮。
- danger 操作不用实心红底铺满。

## AI 实现检查清单

- [ ] 变体配色与上表一致，颜色全部引用 `var(--token)`。
- [ ] 高度 = `--h-sm/--h-md/--h-lg`，圆角 = `--r-sm`（sm）/ `--r-md`（md、lg）。
- [ ] 字重 600；`focus-visible` 有 3px `--accent-ring` 环。
- [ ] disabled 为 opacity .45 + not-allowed，不响应 hover。
- [ ] 图标 14px、gap `--s2`、继承文字色。

## 示例 prompt

> “在暗色底（`var(--canvas)`）上做一个标题区：32px Manrope 600、行高 1.15、`var(--text-primary)`。下方放一个 primary 主按钮（`var(--accent)`、白字、36px 高、`0 14px` padding、8px 圆角）和一个 tonal 次按钮。”
