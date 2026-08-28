# 卡片与面板样式规则

> 来源：原 DESIGN.md §4.6（代码块容器示例见示例 prompt）｜ 取值数据来源：`src/styles/tokens.css` ｜ 返回索引：[design/DESIGN.md](../DESIGN.md)

## 概述

卡片与面板是内容的主要容器：`--surface-1` 底、1px 边框、大圆角、轻阴影。既有实现参照：`src/components/ui/Card`、`src/components/ui/CodeBlock`。

## Token 引用

| Token | 用途 |
|---|---|
| `var(--surface-1)` / `var(--surface-2)` | 卡片底 / 嵌套次级容器 |
| `var(--border)` / `var(--border-subtle)` | 外框 / 内部分隔与嵌套边框 |
| `var(--r-lg)` | 卡片圆角 |
| `var(--e2)` | 标准卡片阴影档 |
| `var(--code-bg)` / `var(--code-text)` | 代码块容器（恒暗） |

## 规则细则

- `--surface-1` 底、`--border` 1px、圆角 `--r-lg`（12px）、阴影 `--e2`（轻阴影，见 [../foundations/elevation.md](../foundations/elevation.md)）。
- 内边距 14–18px（`--s6` 起）；可分 header / body / footer，分隔用 1px `--border-subtle`。
- 嵌套次级容器用 `--surface-2` + `--border-subtle`，避免同级嵌套导致的边框叠加。
- 代码块容器：`--code-bg`（亮色模式恒暗）、12px 圆角（`--r-lg`）、1px `--border`、`--font-mono` 13px（`--fs-code`），无阴影。

## Do's & Don'ts

**Do**

- 卡片用 `--surface-1` + `--border` + `--r-lg` + `--e2` 的组合。
- 嵌套用 `--surface-2` 降一级，边框换 `--border-subtle`。

**Don't**

- 不在同级表面上直接嵌套同边框卡片（边框叠加）。
- 不给卡片用重于 `--e2` 的阴影；代码块不加阴影。
- 不在亮色模式把代码块容器变浅。

## AI 实现检查清单

- [ ] 卡片：`--surface-1` + 1px `--border` + `--r-lg` + `--e2`。
- [ ] header / body / footer 分隔为 1px `--border-subtle`。
- [ ] 嵌套容器 `--surface-2` + `--border-subtle`。
- [ ] 代码块容器 `--code-bg` 恒暗、`--r-lg`、等宽字体、无阴影。

## 示例 prompt

> “做一个代码块：12px 圆角、`code-bg`（亮色模式也恒暗）、1px `border`、Fira Code 13px。右上角 `copy` 按钮。无阴影。”
