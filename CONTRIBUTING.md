# ddo-web 开发规范

> 本文件是 ddo 产品族前端项目的**标准开发规范**。所有新代码必须遵守。
> 设计系统的视觉规则以 `../ddo-design/DESIGN.md` 为唯一权威，本仓库的
> `src/styles/tokens.css` 是它的机器可读翻译。

## 1. 技术栈

| 类别   | 选型                   | 说明                               |
| ------ | ---------------------- | ---------------------------------- |
| 构建   | Vite 8                 | 官方 React 模板                    |
| 框架   | React 19               | 函数组件 + Hooks，无 class         |
| 语言   | TypeScript 6           | `strict: true`                     |
| 路由   | react-router-dom v7    | BrowserRouter                      |
| 样式   | CSS 变量 + CSS Modules | 设计 token 单一来源                |
| Lint   | oxlint                 | 2026 官方脚手架默认（替代 ESLint） |
| 格式化 | Prettier               | 见 `.prettierrc`                   |
| 运行时 | Node 22                | 见 `.nvmrc`                        |

## 2. 环境与命令

Node 版本由 `.nvmrc` 固定为 **22**。本机默认 Node 16 已 EOL，需显式切到 22：

```bash
source ~/.nvm/nvm.sh && nvm exec 22 npm install     # 首次安装依赖
source ~/.nvm/nvm.sh && nvm exec 22 npm run dev      # 本地开发（HMR）
source ~/.nvm/nvm.sh && nvm exec 22 npm run build    # 类型检查 + 生产构建
source ~/.nvm/nvm.sh && nvm exec 22 npm run lint     # oxlint
source ~/.nvm/nvm.sh && nvm exec 22 npm run format   # prettier 格式化
```

## 3. 目录结构

```
src/
├── main.tsx                 # 入口：StrictMode + ThemeProvider + App
├── App.tsx                  # BrowserRouter + Nav + Routes + Footer
├── styles/
│   ├── tokens.css           # 设计 token（DESIGN.md 机器可读版，唯一权威）
│   └── global.css           # reset / 全局工具类 / 代码块语法色
├── theme/
│   └── ThemeProvider.tsx    # 主题（data-theme，dark 默认）
├── components/
│   ├── ui/                  # 通用 UI 组件（一个组件一个目录）
│   │   ├── Icon.tsx
│   │   ├── Badge/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── CodeBlock/
│   │   ├── Table/
│   │   └── Tabs/
│   └── layout/              # 布局组件
│       ├── Nav/
│       └── Footer/
├── lib/
│   └── products.ts          # 产品族元数据（Product + PRODUCTS）
└── routes/
    ├── Home.tsx             # 产品族首页
    └── products/
        └── CodeFlow.tsx     # 单个产品介绍页（与路径一一对应）
```

## 4. TypeScript 规范

- `strict: true`（已手动补上，官方模板遗漏了它）。
- 类型导入必须写 `import type { X }`（`verbatimModuleSyntax`）。
- **禁止** enum、namespace、构造器参数属性（`erasableSyntaxOnly`）。
- 未使用的局部变量 / 参数是**错误**（`noUnusedLocals` / `noUnusedParameters`）。

## 5. 组件规范

- 一律**函数组件 + 命名导出**（`export function Button`）。除 `App` 与 `main` 外不用 default export。
- props 类型用文件内 `interface XxxProps`。
- 组件文件顶部用 JSDoc 注明对应 `DESIGN.md` 章节（如 `DESIGN.md §4.6`）。
- UI 组件放 `src/components/ui/<Name>/`，一个组件一个目录：`Name.tsx` + `Name.module.css`。

## 6. 样式规范（最重要）

- **token 是唯一权威**：颜色 / 间距 / 圆角 / 字号 / 阴影一律 `var(--token)`，**禁止裸 hex**。
- 改 DESIGN.md 时只改 `src/styles/tokens.css`，全站自动跟随。
- 组件内部样式用 **CSS Modules**（`.module.css`），class 局部作用域。
- 跨组件的布局 / 排版工具类放 `global.css`（`.container` `.section` `.grid` `.eyebrow` `.mono` 等）。
- 暗色优先：`:root` 是暗色，`:root[data-theme='light']` 是亮色。
- **代码块恒暗**：代码内容永远用 `--code-bg` / `--code-text` / `--code-dim` / `--code-kw` / `--code-str`，不要用 `--text-*`（亮色主题下会深字配深底）。

## 7. 图标

- 只用 `src/components/ui/Icon.tsx` 的内联 SVG 注册表：1.6px 描边、圆角端点、`currentColor`。
- **禁止**图标库 / 图标字体 / 外部 SVG 文件。加图标 = 在 `IconName` 与 `PATHS` 各加一条。

## 8. 新增一个产品

1. `src/lib/products.ts`：往 `PRODUCTS` 加一条 `{ id, name, path, tagline, version }`。
2. `src/routes/products/<Id>.tsx` + `<Id>.module.css`：产品介绍页（复用现有 UI 组件）。
3. `src/App.tsx`：加一条 `<Route path="/<id>" element={<Id />} />`。
4. Nav 自动读取 `products.ts` 渲染链接，无需手动改。

## 9. 提交前

```bash
npm run format:check   # 格式一致
npm run lint           # 无 lint 错误
npm run build          # 类型检查 + 构建通过
```

三者全过才可提交。
