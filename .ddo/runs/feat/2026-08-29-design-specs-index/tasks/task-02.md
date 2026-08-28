# task-02 · 基础规则迁移（二）：控件标度 / 图标 / 响应式 / Do&Don't / token 速查

## 目标

将原 `DESIGN.md` §4.1（控件尺寸标度）、§7（图标与图像）、§9（响应式）、§8（全局 Do's & Don'ts）、§10.1（token 速查）迁移为 5 份基础规则文件。

## 输入

- 原文：仓库根 `DESIGN.md`（§4.1、§7、§8、§9、§10.1）
- 取值来源：`src/styles/tokens.css`
- 模板：plan DEC-3 统一模板

## 文件清单

| 文件 | 来源章节 |
|---|---|
| `design/foundations/control-scale.md` | §4.1（sm 28 / md 36 / lg 44，按钮与输入同尺寸等高） |
| `design/foundations/icons-and-graphics.md` | §7（1.6px 线性、24 网格、零外部资源、内联 SVG） |
| `design/foundations/responsive.md` | §9（四档断点、折叠策略、触控目标） |
| `design/foundations/dos-and-donts.md` | §8 全局条目（组件域条目已下沉各组件文件的不再重复） |
| `design/foundations/token-quick-reference.md` | §10.1（token 速查，取值与 tokens.css 一致） |

## 关键要点

- `control-scale.md` 声明跨组件契约：同尺寸下按钮/输入/下拉 `height` 严格相等；标签不计入控件高度。
- `icons-and-graphics.md` 必须完整保留「零外部图形资源」禁令（图标库/图标字体/图片文件/外部 SVG）与既有组件参照 `src/components/ui/Icon.tsx` 注册表的事实。
- `token-quick-reference.md` 是允许记录取值的第二个文件；修正 §10.1 笔误（`text-tertiary` dark 写 `#71717A`）并在文末注明裁决依据（tokens.css）。
- `dos-and-donts.md` 保留全局性条目（滚动条、tabs 下划线、代码块恒暗等跨域条目），避免与各组件文件重复。

## 关联验收点

- G4（token-only）、G3（内容覆盖，人工核对 §4.1/§7/§8/§9/§10.1 归属）

## 完成标准

- 5 份文件按模板成文；裸 hex 仅出现在 `token-quick-reference.md`；token 名与 tokens.css 对应。
