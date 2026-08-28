# AGENTS.md

本文件是 ddo-web 仓库给 AI 编码代理（及开发者）的**唯一指引入口**。设计规范的分层加载也从这里开始。

## 1. 项目是什么

`ddo-web` —— ddo 产品族的前端项目，用于维护各产品的介绍页面。当前收录 `ddo-code-flow`（AI 编码流水线 Skill），首页是产品族落地页。所有产品共享同一套设计系统——暗色优先、中性蓝灰结构、单一绿色信号。

## 2. 命令（Node 必须用 22）

本机默认 Node 是 EOL 的 16，所有 npm/node 命令都要走：

```bash
source ~/.nvm/nvm.sh && nvm exec 22 npm run dev      # 开发
source ~/.nvm/nvm.sh && nvm exec 22 npm run build    # tsc -b && vite build
source ~/.nvm/nvm.sh && nvm exec 22 npm run lint     # oxlint
source ~/.nvm/nvm.sh && nvm exec 22 npm run format   # prettier
```

技术栈：Vite 8 + React 19 + TypeScript 6（`strict`）+ react-router-dom v7 + CSS Modules + oxlint / Prettier。

## 3. 铁律

- **禁止裸 hex**：所有颜色 / 间距 / 圆角 / 字号 / 阴影都用 `var(--token)`。
- 代码块恒暗：代码内容用 `--code-bg` / `--code-text` / `--code-dim` / `--code-kw` / `--code-str`，不要用 `--text-*`。
- 组件一律**函数组件 + 命名导出**，不用 class，不用 default export（除 App/main）。
- 样式用 **CSS Modules**；跨组件工具类才进 `global.css`。
- 图标只用 `src/components/ui/Icon.tsx` 的内联 SVG 注册表，不引图标库。
- TypeScript：类型导入写 `import type { X }`（`verbatimModuleSyntax`）；禁止 enum / namespace；未使用变量是错误（`noUnusedLocals` / `noUnusedParameters`）。
- 组件文件顶部用 JSDoc 注明对应规则文件（如 `design/components/cards-and-panels.md`）。

## 4. 分层规范导航

设计规范分层加载，由粗到细、按需深入：

1. 本文件（AGENTS.md）—— 仓库入口与开发流程。
2. [design/DESIGN.md](design/DESIGN.md) —— 整体索引：文件地图 + 迭代守则 + 裁决留痕。
3. `design/foundations/*.md`（基础）与 `design/components/*.md`（组件）—— 18 份具体规则文件。
4. `src/styles/tokens.css` —— 取值唯一数据来源（机器可读）。改设计取值 = 只改这个文件。

规则文件只引用 `var(--token)`，不写裸 hex；具体色值只出现在 `design/foundations/colors.md` 与 `design/foundations/token-quick-reference.md`。

## 5. 开发流程（含样式变更沉淀规则）

常规开发完成后，在**执行 `git push` 之前**：

1. **提示沉淀**：`git push` 前主动提示用户「本次需求是否产生了需要沉淀的组件样式变更」。
2. **盘点变更**：用户确认后，通过 `git diff` / `git log` 查看本次都有哪些样式相关变更。
3. **整理沉淀**：将变更整理、沉淀到 `design/` 对应规则文件；涉及新取值时同步 `src/styles/tokens.css`，并在 [design/DESIGN.md](design/DESIGN.md) 的「裁决与迁移记录」留痕。

## 6. 新增一个产品

1. `src/lib/products.ts` 加一条 `PRODUCTS`（含 `id / name / path / tagline / version`）。
2. `src/routes/products/<Id>.tsx` + `<Id>.module.css` 写介绍页。
3. `src/App.tsx` 加 `<Route>`。Nav 自动渲染。

## 7. 完成标准

改完必须跑通 `npm run lint` 与 `npm run build`，并汇报结果（不通过要明说）。
