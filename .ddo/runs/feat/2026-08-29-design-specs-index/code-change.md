# 代码变更摘要（design 规范索引目录）

本次 run 将根目录单体 `DESIGN.md` 拆分为结构化 AI Coding 规范索引目录，共 20 个新增/变更文件。

## 新增
- `design/DESIGN.md` —— 整体索引（设计哲学 + 分层加载 + 文件地图 + 迭代守则 + 裁决迁移记录）
- `design/foundations/` 9 份基础规则：colors / typography / spacing-and-radius / elevation / control-scale / responsive / icons-and-graphics / dos-and-donts / token-quick-reference
- `design/components/` 9 份组件规则：button / tags-and-status / inputs-and-forms / navigation / cards-and-panels / tabs / dense-table / toast / scrollbar
- `AGENTS.md` —— 仓库入口层（项目是什么 + 分层导航 + 开发流程含样式变更沉淀规则三要点）
- `tests/design-index.test.sh` —— TDD 断言（16/16 Green）

## 修改
- `CLAUDE.md` —— 两条权威来源指向 `design/DESIGN.md` + `src/styles/tokens.css`
- `README.md` —— 设计系统章节指向新索引
- `CONTRIBUTING.md` —— 顶部指引 / JSDoc 章节注释 / 目录结构 / 取值变更说明 四处旧路径修正

## 删除
- 根 `DESIGN.md`（内容已迁移至 `design/` 规范目录）

## 验证
- `bash tests/design-index.test.sh` → 16/16 PASS
- `npm run lint`（Node 22）→ exit 0
- `npm run build`（Node 22）→ exit 0
