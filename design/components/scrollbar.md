# 滚动条样式规则

> 来源：原 DESIGN.md §4.10 ｜ 取值数据来源：`src/styles/tokens.css` ｜ 返回索引：[design/DESIGN.md](../DESIGN.md)

## 概述

浏览器默认滚动条是高对比度灰白粗条，与中性暗色结构冲突，必须收编为中性半透明细条。既有实现参照：`src/styles/global.css`（滚动条收编已在全局样式中落位，本文件规则与之保持一致）。

## Token 引用

| Token | 用途 |
|---|---|
| `var(--text-tertiary)` | 滑块基色（经 `color-mix` 派生） |
| `var(--canvas)` / surface 透出 | 轨道（透明，不画底色） |

## 规则细则

- **轨道（track）透明**：不画轨道底色，让所在容器的 `--canvas` / surface 自然透出，避免出现一道突兀的凹槽。
- **滑块（thumb）中性半透明**：由 `--text-tertiary` 派生——`color-mix(in srgb, var(--text-tertiary) 30%, transparent)`。同一份取值在 dark / light 下自动得到适配明度的灰，无需为两套主题各写一变量。
- **hover 加深**：透明度提到 50%，明确“可抓取”。
- **尺寸**：宽 / 高 `10px`；滑块用 `border:2px solid transparent` + `background-clip:padding-box` 内缩到约 `6px`，外加 `border-radius:99px`，呈悬浮圆角细条，不贴边。
- **圆角 + corner 透明**：`::-webkit-scrollbar-corner` 背景透明，消掉水平/垂直交汇处的方块。
- **Firefox**：`scrollbar-width:thin` + `scrollbar-color: <thumb> transparent`，与 webkit 视觉一致。
- **绝不**用 `--accent` 染色滑块——信号色只留给交互动作，滚动条是中性结构件。

参考实现（置入全局样式，`*` 或 `html` 上）：

```css
*{scrollbar-width:thin;scrollbar-color:color-mix(in srgb,var(--text-tertiary) 30%,transparent) transparent}
::-webkit-scrollbar{width:10px;height:10px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:color-mix(in srgb,var(--text-tertiary) 30%,transparent);border-radius:99px;border:2px solid transparent;background-clip:padding-box}
::-webkit-scrollbar-thumb:hover{background:color-mix(in srgb,var(--text-tertiary) 50%,transparent)}
::-webkit-scrollbar-corner{background:transparent}
```

## Do's & Don'ts

**Do**

- 轨道透明、滑块中性半透明、hover 加深。
- 同时覆盖 webkit 与 Firefox 两套实现。

**Don't**

- 不用浏览器默认滚动条。
- 不用 `--accent` 染色滑块（信号色只留交互）。

## AI 实现检查清单

- [ ] 轨道透明、`--scrollbar-corner` 透明。
- [ ] 滑块 `color-mix(--text-tertiary 30%)`，hover 50%，宽 10px、内缩约 6px、圆角细条。
- [ ] Firefox `scrollbar-width:thin` + `scrollbar-color` 与 webkit 一致。
- [ ] 未用 `--accent` 染色滑块。