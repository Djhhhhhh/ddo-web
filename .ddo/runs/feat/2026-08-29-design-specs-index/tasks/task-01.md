# task-01 · 基础规则迁移（一）：色彩 / 排版 / 间距圆角 / 层级阴影

## 目标

将原 `DESIGN.md` §2（色彩）、§3（排版）、§5（布局与间距）、§6（层级与阴影）迁移为 4 份基础规则文件，数值逐项对照原文与 `src/styles/tokens.css`，不改写任何取值。

## 输入

- 原文：仓库根 `DESIGN.md`（§2、§3、§5、§6）
- 取值来源：`src/styles/tokens.css`（唯一数据来源）
- 模板：plan DEC-3 统一模板（概述 → token 引用 → 规则细则 → Do's & Don'ts → AI 实现检查清单 → 示例 prompt）

## 文件清单

| 文件 | 来源章节 |
|---|---|
| `design/foundations/colors.md` | §2（含 2.8 主题映射规则） |
| `design/foundations/typography.md` | §3 |
| `design/foundations/spacing-and-radius.md` | §5 |
| `design/foundations/elevation.md` | §6（含 6.3 焦点表达） |

## 关键要点

- `colors.md` 是唯一允许记录色值的文件之一：给出每个色彩 token 的 dark/light 取值（与 tokens.css 一致），其余规则描述一律引用 `var(--token)`。
- 裁决项（plan DEC-5）：`text-tertiary` dark = `#71717A`（§10.1 的 `#71737A` 为笔误）；信号色为绿色 `accent`、等宽字体为 Fira Code（§1 叙述不迁移，以 §2/§3 token 表为准）。
- 焦点表达（6.3）归 `elevation.md`：`focus-visible` + `accent-ring` 3px 环，不用阴影表达焦点。
- §8 中与本域相关的 Do/Don't 条目过滤到对应文件的 Do's & Don'ts 节（如「不引入第二种界面彩色」归 colors）。
- 间距/圆角只列标度内值（`--s1`~`--s14`；`--r-sm/--r-md/--r-lg/--pill`），`pill` 注明仅 switch。

## 关联验收点

- G4（token-only 引用）、G3（内容覆盖，人工核对 §2/§3/§5/§6 归属）

## 完成标准

- 4 份文件按模板成文；`grep -rnE '#[0-9a-fA-F]{3,8}' design/foundations/` 的命中仅出现在 `colors.md`（与 `token-quick-reference.md`，本任务不涉及）。
- 每个 token 名可在 `src/styles/tokens.css` 找到。
