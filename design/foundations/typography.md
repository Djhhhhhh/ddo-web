# 排版系统规则

> 来源：原 DESIGN.md §3 ｜ 取值数据来源：`src/styles/tokens.css` ｜ 返回索引：[design/DESIGN.md](../DESIGN.md)

## 概述

单一无衬线 Manrope 承载所有 UI 文本（display 到 body），靠字号 / 字重做层级；Fira Code 作为等宽一等公民，承担代码、终端、ID、时间戳、数值统计与标签。字重克制：仅 400 / 500 / 600，不用 700+。数字一律等宽 + `tabular-nums` 对齐。display 行高压紧、body 放松，以对比建立层级。中文回退系统字体——Manrope / Fira Code 仅覆盖拉丁与数字，中文走系统（PingFang SC / Microsoft YaHei 等），保证本土可读性。

## Token 引用

| Token | 用途 |
|---|---|
| `var(--font-sans)` | Sans / Display / Body 字体族 |
| `var(--font-mono)` | Mono / Code / Data 字体族 |
| `var(--fs-display)` … `var(--fs-stat)` | 字号层级（见下表） |

## 规则细则

### 字体族

- **Sans / Display / Body**：`var(--font-sans)`（`'Manrope', system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif`）
- **Mono / Code / Data**：`var(--font-mono)`（`'Fira Code', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`）

### 字号层级

| 角色 | 字体 | 字号 | 字重 | 行高 | 字距 | 说明 |
|---|---|---|---|---|---|---|
| Display / Hero | Manrope | `--fs-display` 32px | 600 | 1.15 | -0.01em | 页面主标题 |
| H1 · Section | Manrope | `--fs-h1` 24px | 600 | 1.25 | -0.01em | 区块标题 |
| H2 · Sub | Manrope | `--fs-h2` 18px | 600 | 1.35 | normal | 子区标题 |
| H3 · Card | Manrope | `--fs-h3` 15px | 600 | 1.40 | normal | 卡片标题、run 标题 |
| Body | Manrope | `--fs-body` 14px | 400 | 1.55 | normal | 标准正文 |
| Body small | Manrope | `--fs-body-sm` 13px | 400 | 1.50 | normal | 次文字、导航链接 |
| Caption | Manrope | `--fs-caption` 12px | 400 | 1.45 | normal | 元数据、说明 |
| Eyebrow | Manrope | `--fs-eyebrow` 11px | 500 | 1.40 | +0.05em · uppercase | 章节小标、阶段标签 |
| Code body | Fira Code | `--fs-code` 13px | 400 | 1.60 | normal | 内联代码、终端命令 |
| Code small | Fira Code | `--fs-code-sm` 12px | 400 | 1.55 | normal | 代码片段、标签文字 |
| Stat / Data | Fira Code | `--fs-stat` 22px | 600 | 1.20 | -0.02em · tabular | 统计数值、ID、时间戳 |

### 原则

- **单一无衬线**：Manrope 从 display 到 body 一族贯通，不引入第二套展示字体；层级靠字号与字重，不靠换字体。
- **等宽为一等公民**：代码、终端、ID、时间戳、统计数值、标签一律 Fira Code + `tabular-nums`，技术内容优先等宽。
- **字重克制**：仅 400 / 500 / 600。400 正文，500 强调 / 链接 / 标签，600 标题 / 数值。不用 700+。
- **紧致标题，舒适正文**：display 压到 1.15 行高，body 放松到 1.5–1.55；行高对比即层级。
- **负字距收大字**：大标题与统计数值给 -0.01em ~ -0.02em，收紧字间；大写 eyebrow 给 +0.05em 拉开。
- **中文走系统**：Manrope / Fira Code 不覆盖中文，中文回退系统字体，避免字形断层。

## Do's & Don'ts

**Do**

- 用 Manrope 承载所有 UI 文本，Fira Code 承载代码 / 数据 / ID / 时间戳。
- 字重只用 400 / 500 / 600；数字一律等宽 + `tabular-nums`。

**Don't**

- 不用字重 700+；不混用第二套展示字体。
- 不用装饰性字体处理（描边字、渐变字）替代层级。

## AI 实现检查清单

- [ ] 字号只取 `--fs-*` 档；字体族只取 `--font-sans` / `--font-mono`。
- [ ] 字重仅 400 / 500 / 600。
- [ ] 数字、ID、时间戳、统计值使用 `var(--font-mono)` + `font-variant-numeric: tabular-nums`。
- [ ] 标题行高压紧（1.15–1.40）、正文放松（1.50–1.55）。
- [ ] 中文字形无断层（系统回退链存在于 `--font-sans` / `--font-mono`）。
