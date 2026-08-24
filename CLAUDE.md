# CLAUDE.md

本文件为 Claude Code 在此仓库工作时的指引。

## 项目是什么

`ddo-web` —— ddo 产品族的前端项目，用于维护各产品的介绍页面。
当前收录 `ddo-code-flow`（AI 编码流水线 Skill），首页是产品族落地页。

## 两条权威来源（务必先读，再动手）

1. **设计系统**：`../ddo-design/DESIGN.md` —— 视觉规则的唯一权威（暗色优先、中性蓝灰结构、单一绿色 `#10B981` 信号、8px 间距、6/8/12 圆角、Manrope + Fira Code）。
2. **设计 token**：`src/styles/tokens.css` —— DESIGN.md 的机器可读翻译，样式的唯一数据来源。改设计 = 只改这个文件。

## 铁律

- **禁止裸 hex**：所有颜色 / 间距 / 圆角 / 字号 / 阴影都用 `var(--token)`。
- 代码块恒暗：代码内容用 `--code-bg` / `--code-text` / `--code-dim` / `--code-kw` / `--code-str`，不要用 `--text-*`。
- 组件一律**函数组件 + 命名导出**，不用 class，不用 default export（除 App/main）。
- 样式用 **CSS Modules**；跨组件工具类才进 `global.css`。
- 图标只用 `src/components/ui/Icon.tsx` 的内联 SVG 注册表，不引图标库。

## 命令（Node 必须用 22）

本机默认 Node 是 EOL 的 16，所有 npm/node 命令都要走：

```bash
source ~/.nvm/nvm.sh && nvm exec 22 npm run dev      # 开发
source ~/.nvm/nvm.sh && nvm exec 22 npm run build    # tsc -b && vite build
source ~/.nvm/nvm.sh && nvm exec 22 npm run lint     # oxlint
source ~/.nvm/nvm.sh && nvm exec 22 npm run format   # prettier
```

## 新增一个产品

1. `src/lib/products.ts` 加一条 `PRODUCTS`（含 `id / name / path / tagline / version`）。
2. `src/routes/products/<Id>.tsx` + `<Id>.module.css` 写介绍页。
3. `src/App.tsx` 加 `<Route>`。Nav 自动渲染。

## 完成标准

改完必须跑通 `npm run lint` 与 `npm run build`，并汇报结果（不通过要明说）。
