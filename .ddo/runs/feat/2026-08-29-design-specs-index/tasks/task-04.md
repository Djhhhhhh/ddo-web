# task-04 · 组件规则迁移（二）：Tabs / 密集表格 / Toast / 滚动条

## 目标

将原 `DESIGN.md` §4.7–§4.10 迁移为 4 份组件样式规则文件；数值与原文逐项一致，取值引用一律 `var(--token)`。

## 输入

- 原文：仓库根 `DESIGN.md`（§4.7–§4.10）
- 取值来源：`src/styles/tokens.css`
- 既有实现参照（不改）：`src/components/ui/Tabs`、`Table`；`src/styles/global.css`（滚动条收编参考实现）
- 模板：plan DEC-3；§10.2 对应示例 prompt 归位

## 文件清单

| 文件 | 来源章节 | 示例 prompt（§10.2） |
|---|---|---|
| `design/components/tabs.md` | §4.7（pill 容器、浮起激活态、禁下划线） | Tabs 示例 |
| `design/components/dense-table.md` | §4.8（表头 11px uppercase、单元格 9px 10px、代码列等宽、选中行描边） | 密集表格示例 |
| `design/components/toast.md` | §4.9（surface-1、max-width 340、三态圆点） | — |
| `design/components/scrollbar.md` | §4.10（轨道透明、thumb 派生、尺寸 10px、Firefox、参考 CSS） | — |

## 关键要点

- `scrollbar.md` 保留原文参考 CSS 代码块（其中 `color-mix(...)` 属代码示例，允许出现；仍不得出现组件域裸色值），并注明与 `src/styles/global.css` 现有实现一致。
- `dense-table.md` 保留 `tabular-nums` 与等宽列对齐要求。
- `tabs.md` 明确「不用下划线式 tabs；激活态靠浮起」。
- 每个组件文件含「AI 实现检查清单」。

## 关联验收点

- G1（文件落位）、G3（内容覆盖，人工抽查 tabs/dense-table）、G4（token-only）

## 完成标准

- 4 份组件文件成文；`grep -rqE '#[0-9a-fA-F]{3,8}' design/components/` 零命中；每份至少一个 `var(--`。
