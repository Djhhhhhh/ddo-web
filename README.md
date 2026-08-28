# ddo · 产品族前端

面向开发者与 AI 工程场景的 **ddo 产品族**介绍站。所有产品共享同一套设计系统 ——
暗色优先、中性蓝灰结构、单一绿色信号，像仪器一样精确、克制、可测量。

## 技术栈

- **Vite 8** + **React 19** + **TypeScript 6**（`strict`）
- **react-router-dom v7**（BrowserRouter SPA）
- **CSS 变量 + CSS Modules**（设计 token 单一来源）
- **oxlint** + **Prettier**（2026 官方脚手架默认规范）
- **Node 22**（见 `.nvmrc`）

## 快速开始

> 本机默认 Node 可能是 EOL 版本，所有命令用 `.nvmrc` 固定的 22。

```bash
source ~/.nvm/nvm.sh && nvm exec 22 npm install
source ~/.nvm/nvm.sh && nvm exec 22 npm run dev
```

## 常用命令

| 命令             | 作用                                      |
| ---------------- | ----------------------------------------- |
| `npm run dev`    | 本地开发（HMR）                           |
| `npm run build`  | `tsc -b` 类型检查 + `vite build` 生产构建 |
| `npm run lint`   | oxlint 静态检查                           |
| `npm run format` | Prettier 格式化                           |

## 目录结构

```
src/
├── styles/        tokens.css（设计 token）+ global.css（全局工具类）
├── theme/         ThemeProvider（data-theme，dark 默认）
├── components/    ui/（通用组件）+ layout/（Nav / Footer）
├── lib/           products.ts（产品族元数据）
└── routes/        Home（首页）+ products/<id>（产品介绍页）
```

## 设计系统

视觉规则以 `design/DESIGN.md`（规范索引入口）为权威，具体规则分层在 `design/foundations/` 与 `design/components/`；本仓库 `src/styles/tokens.css` 是其机器可读翻译。改设计只改 token 文件，全站自动跟随。

## 贡献

开发与 AI 指引见 [AGENTS.md](./AGENTS.md)。新增产品只需三步：加元数据 → 写介绍页 → 加路由。
