---
name: deploy-github-pages
description: |
  将 ddo-web 部署到 GitHub Pages 并绑定自定义域名（ddoai.cn，阿里云解析）的完整流程。
  包括：Actions 部署工作流、CNAME 与 SPA 路由回退、gh API 开启 Pages、阿里云 DNS
  记录配置、证书签发跟踪与强制 HTTPS，以及本机代理（Clash/FlClash fake-ip）干扰下
  的正确验证方法与 502 排查。
metadata:
  authors:
    - "djhhhhhh"
  version: "1.0.0"
---

# deploy-github-pages

## When to use

满足以下任一条件时激活本 skill：

- 用户要求把本项目部署到 GitHub Pages / 首次上线
- 用户要求绑定、更换或排查自定义域名（`ddoai.cn`）
- 用户反馈站点打不开、502、证书错误、解析不生效
- 修改了部署工作流 `.github/workflows/deploy.yml` 或 `public/CNAME`

## 关键事实（先记住这些）

- 本项目是纯静态站点：`npm run build` 产出 `dist/`，用 GitHub Actions 部署到 Pages。
- 自定义域名下站点在**根路径**提供服务，`vite.config.ts` 的 `base` 保持默认 `/`，**不要**改成仓库名。
- 这是 `BrowserRouter` 的 SPA：必须把 `dist/index.html` 复制为 `dist/404.html`，否则子路由（如 `/ddo-code-flow`）刷新即 404。
- GitHub Pages 的固定 A 记录 IP（官方值，不会变）：
  `185.199.108.153` / `185.199.109.153` / `185.199.110.153` / `185.199.111.153`
- 域名只过了**实名认证**即可解析到境外托管（GitHub Pages）；指向大陆服务器才需要 **ICP 备案**。两者不同，别混淆。
- **本机开着 Clash 系代理（FlClash，fake-ip 模式）**：本机 `dig`/`nslookup`/浏览器看到的 `198.18.x.x` 全是假地址，本机直接验证不可信，必须用下面的 DoH / `--resolve` 方法。

## 第一部分：仓库侧配置（一次性）

### 1. `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: npm
      - run: npm ci
      - run: npm run build
      # SPA 回退：让 /ddo-code-flow 这类子路由刷新时不 404
      - run: cp dist/index.html dist/404.html
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v4
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### 2. `public/CNAME`

只有一行：自定义域名（当前为 `ddoai.cn`）。构建时会原样拷入 `dist/` 根部。

### 3. 提交前检查（AGENTS.md 要求）

```bash
source ~/.nvm/nvm.sh && nvm exec 22 npm run lint
source ~/.nvm/nvm.sh && nvm exec 22 npm run build
ls dist/   # 必须看到 CNAME
```

提交并推送到 `main`（工作流只监听 `main`）。若推送报
`Error in the HTTP2 framing layer`（代理环境常见），改用：

```bash
git -c http.version=HTTP/1.1 push origin main
```

## 第二部分：用 gh API 开启 Pages 与自定义域名

```bash
# 1) 开启 Pages，来源设为 Actions（若已存在会报错，可忽略）
gh api repos/Djhhhhhh/ddo-web/pages -X POST -f build_type=workflow

# 2) 设置自定义域名 —— 用 PUT，不要用 PATCH：
#    站点刚创建时 PATCH 会返回 404；zsh 下方括号要加引号，否则报 "no matches found"
gh api repos/Djhhhhhh/ddo-web/pages -X PUT \
  -F "source[branch]=main" -F "source[path]=/" \
  -f cname=ddoai.cn

# 3) 确认：cname 字段应显示域名，html_url 应变为 http://ddoai.cn/
gh api repos/Djhhhhhh/ddo-web/pages
```

注意：设置新域名后 `https_enforced` 会被重置为 `false`，属正常，等证书下来再开。

## 第三部分：阿里云 DNS 记录（只能由用户在控制台操作）

入口：`https://dns.console.aliyun.com/` → `ddoai.cn` → 解析设置 → 添加记录。

| 记录类型 | 主机记录 | 记录值 |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `Djhhhhhh.github.io` |

用户侧高频翻车点（指导时逐条提醒）：

- "主机记录"只填 `@` 或 `www`，**不带域名后缀**
- 前四条类型是 `A`，最后一条是 `CNAME`
- 同一主机记录下 A 与 CNAME 不能共存，加之前删掉旧的
- 记录状态必须是"正常"，不是"暂停"
- 买域名 ≠ 有解析记录，记录必须手动添加

## 第四部分：验证（必须绕开本机代理）

本机代理会劫持所有 DNS（返回 `198.18.x.x`），所以**不要**用裸 `dig` / 浏览器下结论，按以下顺序验证：

### ① 解析是否生效（DoH，两条交叉确认）

```bash
curl -s "https://dns.alidns.com/resolve?name=ddoai.cn&type=A"
curl -s -H "accept: application/dns-json" "https://cloudflare-dns.com/dns-query?name=ddoai.cn&type=A"
```

`Answer` 里有 4 个 `185.199.*` 即生效。**注意**：阿里 DoH 可能缓存了加记录前的
否定结果（SOA minimum TTL 600s），此时以 Cloudflare DoH 为准，或 10 分钟后复查。

### ② GitHub 是否已开始供站（跳过 DNS，直接指定 IP）

```bash
curl --resolve ddoai.cn:80:185.199.108.153 -sI http://ddoai.cn
# 期望：HTTP/1.1 200 OK，Server: GitHub.com
```

### ③ 证书是否签发（通常解析生效后 10~45 分钟，最长 24 小时）

```bash
curl --resolve ddoai.cn:443:185.199.108.153 -svI https://ddoai.cn 2>&1 | grep subject
# 证书 subject 从 *.github.io 变成 ddoai.cn 即就绪
```

可挂后台轮询（证书就绪会收到任务通知）：

```bash
for i in $(seq 1 60); do
  if curl --resolve ddoai.cn:443:185.199.108.153 -sI --max-time 10 https://ddoai.cn 2>/dev/null | head -1 | grep -q "200"; then
    echo "CERT READY after ~$i min"; exit 0
  fi
  sleep 60
done; echo "TIMEOUT"
```

### ④ 开启强制 HTTPS（仅在 ③ 就绪后）

```bash
gh api repos/Djhhhhhh/ddo-web/pages -X PUT \
  -F "source[branch]=main" -F "source[path]=/" \
  -f cname=ddoai.cn -F https_enforced=true
```

### ⑤ 最终人工确认

浏览器打开 `https://ddoai.cn`，再直接访问 `https://ddoai.cn/ddo-code-flow` 并刷新一次（验证 SPA 回退）。

## 故障排查对照表

| 症状 | 原因 | 处理 |
|---|---|---|
| 浏览器 502，且解析查到 `198.18.x.x` | 本机代理 fake-ip 假地址，不是真实响应 | 按第四部分用 DoH/`--resolve` 验证；网站本身可能完全正常 |
| DNS 已生效但走代理仍 502 | 代理客户端缓存了加记录前的"解析失败" | 重启代理客户端（本机为 FlClash：退出后重开，或设置页"重启核心"）；重启后用 `curl -x http://127.0.0.1:7890 -sI http://ddoai.cn` 复验 |
| 裸域名浏览器报"无法解析主机" | 阿里云上没有保存成功的记录 | 让用户截图解析设置页核对第三部分的 5 条 |
| `http://ddoai.cn` 200 但 `https://` 证书错误 | 证书还在签发中 | 等；跑第 ③ 步轮询，勿改任何配置 |
| `gh api ... pages -X PATCH` 返回 404 | 站点刚创建未就绪 / 该调用要用 PUT | 改用第 2 部分的 PUT 命令 |
| `git push` 报 HTTP2 framing layer | 代理环境网络抖动 | `git -c http.version=HTTP/1.1 push origin main` |
| 域名指向大陆服务器打不开 | 未备案，80/443 被拦 | 本项目托管在 GitHub（境外），不受影响；若用户想迁回大陆须先完成 ICP 备案 |
| 仓库 Actions 绿了但站点 404 | `public/CNAME` 丢失或 Pages 来源不是 Actions | `ls dist/` 确认 CNAME；`gh api repos/Djhhhhhh/ddo-web/pages` 确认 `build_type: workflow` |

## 后续日常

- 之后每次推到 `main` 都会自动重新部署，无需再碰 DNS / Pages 设置。
- 换域名：改 `public/CNAME` + PUT 更新 `cname` + 新域名控制台加同样的 5 条记录。
- `.cn` 域名未备案指向境外属灰色地带（可用，但注册局理论上有权停止解析）；若未来对国内访问速度有要求，可迁 Cloudflare Pages（本 skill 的工作流产物 `dist/` 可直接复用）。

## 完成标准

- `npm run lint` 与 `npm run build` 通过（Node 22）
- Actions 最新运行 success，`dist/` 含 CNAME
- DoH 能查到 4 条 A + www CNAME
- `https://ddoai.cn` 与 `https://ddoai.cn/ddo-code-flow`（刷新）均可打开
- `https_enforced: true`
