# 响应式行为规则

> 来源：原 DESIGN.md §9 ｜ 取值数据来源：`src/styles/tokens.css` ｜ 返回索引：[design/DESIGN.md](../DESIGN.md)

## 概述

四档断点，移动优先折叠。容器最大 1080px（`var(--container)`），内容随视口缩放，移动端折叠为单列。

## 规则细则

### 断点

| 名称 | 宽度 | 关键变化 |
|---|---|---|
| mobile | <640 | 单列、全部堆叠、汉堡导航、集成网格 1 列 |
| small | 640–768 | 间距微调、仍单列 |
| tablet | 768–1024 | 双栏布局开始、集成网格 2 列 |
| desktop | ≥1024 | 标准布局、集成网格 4 列、容器最大 1080 |

### 折叠策略

- **导航**：<768 折叠为汉堡菜单，文字链接隐藏，主 CTA 在 mobile 隐藏或并入菜单（见 [../components/navigation.md](../components/navigation.md)）。
- **双栏特性区**：<850 从双列堆叠为单列。
- **集成网格**：4 列（desktop）→ 2 列（tablet，<1024）→ 1 列（mobile，<640）。
- **表格**：小屏不挤碎，维持结构横向滚动，等宽数据列保留 `tabular-nums` 对齐（见 [../components/dense-table.md](../components/dense-table.md)）。
- **Hero 文本**：Display 32 → 24 → 18 渐进缩放（对应 `--fs-display` → `--fs-h1` → `--fs-h2`）。

### 触控目标

- 按钮最小高度 36px（`--h-md`），触控场景下相邻可点元素间距 ≥ 8px（`--s3`）。
- 导航链接 ≥ 16px 字号，行高舒适。
- 最小触控区域满足 44×44px（通过 padding 撑开，不破坏视觉高度标度，见 [control-scale.md](control-scale.md)）。

## Do's & Don'ts

**Do**

- 移动优先折叠；断点只取上表四档。
- 小屏表格横向滚动保结构，不压碎列。

**Don't**

- 不在移动端保留多列密集布局。
- 不为触控目标破坏控件高度标度（用 padding 撑触控区）。

## AI 实现检查清单

- [ ] 媒体查询断点与四档一致（640 / 768 / 850 / 1024）。
- [ ] 容器宽度不超过 `var(--container)`。
- [ ] 导航在 <768 折叠为汉堡菜单。
- [ ] 触控目标 ≥ 44×44px（含 padding）。
