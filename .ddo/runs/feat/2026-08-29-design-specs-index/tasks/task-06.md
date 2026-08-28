# task-06 · 入口层 AGENTS.md 与旧指向修正

## 目标

新建仓库根级 `AGENTS.md`（AI 理解仓库的入口层），修正 `CLAUDE.md` / `README.md` / `CONTRIBUTING.md` 的权威来源指向，删除根目录旧 `DESIGN.md`。

## 输入

- `design/` 已完成的索引与规则文件（task-01 ~ 05）
- plan DEC-4（AGENTS.md/CLAUDE.md 分治）、DEC-6（沉淀规则归属与三要点）
- 现状事实：三份文档仍引用 `../ddo-design/DESIGN.md`（旧路径）

## 文件清单

| 文件 | 动作 |
|---|---|
| `AGENTS.md` | 新增 |
| `CLAUDE.md` | 修改（权威来源指向 + 相关表述） |
| `README.md` | 修改（旧路径引用） |
| `CONTRIBUTING.md` | 修改（旧路径引用、章节注释约定改为指向 `design/` 规则文件、目录结构说明） |
| 根 `DESIGN.md` | 删除（内容已迁移） |

## 关键要点

- `AGENTS.md` 结构：① 项目是什么（ddo 产品族前端、产品落地页）；② 技术栈与命令速览（Node 22 / nvm exec 22、dev/build/lint/format）；③ 目录结构；④ 分层规范导航：AGENTS.md → `design/DESIGN.md` → `design/components|foundations/*` → `src/styles/tokens.css`（取值唯一来源）；⑤ 开发流程节：完整承载沉淀规则三要点——`git push` 前提示用户是否沉淀本次需求的组件样式变更；用户确认后通过 `git diff` / `git log` 盘点本次样式变更；将变更整理沉淀到 `design/` 对应规则文件（涉及新取值时同步 `tokens.css` 并在索引裁决与迁移记录留痕）；⑥ 与 CLAUDE.md 的关系（铁律以 CLAUDE.md 为准，互引不复述）。
- `CLAUDE.md`：两条权威来源改为「`design/DESIGN.md`（索引入口，视觉规则权威）」+「`src/styles/tokens.css`（取值唯一数据来源）」；其余铁律、命令、完成标准不动。
- 不修改 `.gitignore`；`.ddo/` 与 `tests/` 的存在不影响本任务。

## 关联验收点

- G2（AGENTS.md 指向索引）、G5（沉淀规则三要点）、G6（旧引用清除）

## 完成标准

- `AGENTS.md` 存在且含 `design/DESIGN.md` 链接与沉淀规则三要点；`grep -rn 'ddo-design' CLAUDE.md README.md CONTRIBUTING.md` 零命中；`CLAUDE.md` 含 `design/DESIGN.md`；根目录无 `DESIGN.md`。
