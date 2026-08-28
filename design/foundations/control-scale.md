# 控件尺寸标度规则

> 来源：原 DESIGN.md §4 引言与 §4.1 ｜ 取值数据来源：`src/styles/tokens.css` ｜ 返回索引：[design/DESIGN.md](../DESIGN.md)

## 概述

所有交互控件共用一套**统一高度标度**，按钮与输入同尺寸等高，确保并排时底对齐。组件圆角沿用圆角标度（控件 `--r-sm` / `--r-md`，容器 `--r-lg`）。状态反馈靠边框、背景位移与焦点环，不靠阴影突变。

## Token 引用

| Token | 用途 |
|---|---|
| `var(--h-sm)` / `var(--h-md)` / `var(--h-lg)` | 控件高度三档 |
| `var(--r-sm)` / `var(--r-md)` | 控件圆角 |
| `var(--fs-caption)` / `var(--fs-body-sm)` / `var(--fs-body)` | 各档字号 |

## 规则细则

| 尺寸 | 高度 | 字号 | 圆角 | 适用 |
|---|---|---|---|---|
| `sm` | `--h-sm` 28px | 12px | `--r-sm` 6px | 紧凑工具栏、表格内操作 |
| `md` | `--h-md` 36px | 13px | `--r-md` 8px | 默认按钮 / 输入 / 选择 |
| `lg` | `--h-lg` 44px | 14px | `--r-md` 8px | 主操作、空状态 CTA |

> 按钮、输入框、下拉选择在同一尺寸下 `height` 严格相等；标签（tag）不计入控件高度，自成小一级节奏（见 [../components/tags-and-status.md](../components/tags-and-status.md)）。

## Do's & Don'ts

**Do**

- 控件走统一高度标度（sm 28 / md 36 / lg 44px），按钮与输入同尺寸等高。
- 并排控件保持同一尺寸档，底对齐。

**Don't**

- 不自定义控件高度（如 32px、40px 等标度外值）。
- 不让标签与控件混用同一高度节奏。

## AI 实现检查清单

- [ ] 控件高度只取 `--h-sm` / `--h-md` / `--h-lg`。
- [ ] 同尺寸档的按钮 / 输入 / 下拉高度一致。
- [ ] 控件圆角用 `--r-sm`（sm）或 `--r-md`（md / lg）。
- [ ] 状态反馈仅使用边框、背景位移、焦点环（见 [elevation.md](elevation.md)）。
