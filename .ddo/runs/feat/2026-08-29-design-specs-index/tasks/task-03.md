# task-03 · 组件规则迁移（一）：按钮 / 标签 / 表单 / 导航 / 卡片

## 目标

将原 `DESIGN.md` §4.2–§4.6 迁移为 5 份组件样式规则文件；数值与原文逐项一致，取值引用一律 `var(--token)`。

## 输入

- 原文：仓库根 `DESIGN.md`（§4.2–§4.6）
- 取值来源：`src/styles/tokens.css`；高度走 `--h-sm/--h-md/--h-lg`，圆角走 `--r-sm/--r-md/--r-lg`
- 既有实现参照（不改）：`src/components/ui/Button`、`Badge`、`Card`、`src/components/layout/Nav`
- 模板：plan DEC-3；§10.2 对应示例 prompt 归位到相应组件文件

## 文件清单

| 文件 | 来源章节 | 示例 prompt（§10.2） |
|---|---|---|
| `design/components/button.md` | §4.2（5 变体、字重 600、焦点环、图标按钮、disabled） | 标题区主/次按钮示例 |
| `design/components/tags-and-status.md` | §4.3（role 标签、语义徽章、状态点色映射） | — |
| `design/components/inputs-and-forms.md` | §4.4（文本/等宽输入、命令栏、textarea、错误态、复选框、开关） | 命令栏示例 |
| `design/components/navigation.md` | §4.5（透明底、1px 分隔、48–56px 高） | — |
| `design/components/cards-and-panels.md` | §4.6（surface-1、r-lg、嵌套规则） | — |

## 关键要点

- 按钮 `primary` 白字在规则中描述为「白字」即可，不引入新 token；`accent-subtle`/`accent-ring` 等派生值用 token 名表述。
- 命令栏（⌕ + ⌘K 徽章）是全站命令入口的统一形态，须在 `inputs-and-forms.md` 完整保留。
- §10.2「代码块」示例 prompt 归 `cards-and-panels.md` 示例节（代码块属容器族；其截图容器规则本身属 §7.4，随 `icons-and-graphics.md` 迁移，不重复）。
- 每个组件文件含「AI 实现检查清单」（高度标度、圆角档位、焦点环、字重 400/500/600 等）。

## 关联验收点

- G1（文件落位）、G3（内容覆盖与数值一致，人工抽查 button）、G4（token-only）

## 完成标准

- 5 份组件文件成文；`grep -rqE '#[0-9a-fA-F]{3,8}' design/components/` 零命中；每份至少一个 `var(--`。
