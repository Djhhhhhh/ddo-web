# 色彩系统规则

> 来源：原 DESIGN.md §2 ｜ 取值数据来源：`src/styles/tokens.css` ｜ 返回索引：[design/DESIGN.md](../DESIGN.md)

## 概述

色彩是「中性蓝灰结构 + 单一绿色信号 + 状态语义 + 独立数据色板」四层。**暗色优先**：dark 为默认主题，light 为同等一等公民，二者共用同一套中性色阶与绿色信号色，仅明度方向相反。代码块在两套主题下均恒暗（终端感，等宽字体为一等公民的延伸）。界面里同时只允许一种彩色（信号色）说话；语义色仅在具体状态出现时点缀，不参与常规界面构成。

本文件是规范目录中允许记录具体色值的两份文件之一（另一份为 [token-quick-reference.md](token-quick-reference.md)）；其余规则文件一律以 `var(--token)` 引用。

## Token 引用

| Token | 用途 |
|---|---|
| `var(--canvas)` / `var(--surface-1)` / `var(--surface-2)` / `var(--code-bg)` | 表面色阶 |
| `var(--text-primary)` / `var(--text-secondary)` / `var(--text-tertiary)` | 文字 |
| `var(--border)` / `var(--border-subtle)` | 边框 |
| `var(--accent)` / `var(--accent-hover)` / `var(--accent-subtle)` / `var(--accent-ring)` | 信号色与派生 |
| `var(--success)` / `var(--warning)` / `var(--danger)` / `var(--info)` | 语义色 |
| `var(--viz-1)` … `var(--viz-6)` | 数据可视化分类色板 |

## 规则细则

### 中性色阶与表面

| Token | Dark | Light | 用途 |
|---|---|---|---|
| `--canvas` | `#0A0A0B` | `#FAFAFA` | 页面底色，最大面积 |
| `--surface-1` | `#121214` | `#FFFFFF` | 卡片 / 面板 / 顶栏 |
| `--surface-2` | `#1B1B1F` | `#F4F4F5` | 次级表面 / 嵌套容器 / 次级按钮底 |
| `--code-bg` | `#0F0F11` | `#0F0F11` | 代码块（**两套主题恒暗**） |

### 文字

| Token | Dark | Light | 用途 |
|---|---|---|---|
| `--text-primary` | `#EDEDEF` | `#18181B` | 主文字、标题 |
| `--text-secondary` | `#A1A1AA` | `#52525B` | 次文字、说明、导航链接 |
| `--text-tertiary` | `#71717A` | `#8E8E93` | 弱文字、占位符、元数据、章节小标 |

### 边框

| Token | Dark | Light | 用途 |
|---|---|---|---|
| `--border` | `#27272A` | `#E4E4E7` | 主边框，1px |
| `--border-subtle` | `#1F1F23` | `#ECECEF` | 弱边框 / 内部分隔线 |

### 信号色（accent）

唯一界面彩色。所有「可操作 / 最重要」的元素用此色。

| Token | Dark | Light | 用途 |
|---|---|---|---|
| `--accent` | `#10B981` | `#059669` | 主操作按钮、链接、可点标签、选中态 |
| `--accent-hover` | `#059669` | `#047857` | 主操作 hover |
| `--accent-subtle` | `accent` @ 14% | `accent` @ 10% | 强调浅底（标签底、选中行底） |
| `--accent-ring` | `accent` @ 45% | `accent` @ 40% | 焦点环（键盘聚焦，无障碍硬要求） |

> 信号色为单一 token，后续调整只改 `--accent` / `--accent-hover` 两值，衍生色由 `color-mix` 自动派生。

### 语义色（仅状态）

| Token | Dark | Light | 用途 |
|---|---|---|---|
| `--success` | `#22C55E` | `#16A34A` | 通过 / 成功 / 正数涨跌 |
| `--warning` | `#F59E0B` | `#D97706` | 警告 / 待人工确认 |
| `--danger` | `#EF4444` | `#DC2626` | 危险 / 删除 / 失败 / 负数 |
| `--info` | = `accent` | = `accent` | 信息提示（复用信号色，不引入新色） |

> 信号色与 `--success` 均为绿，靠色相差与载体区分：信号色用于按钮 / 链接 / 标签（可操作），`--success` 仅用于小徽章 / 图标 / 涨跌（已成功）。二者不共用同一载体。

### 数据可视化分类色板

独立于界面色，专用于图表分类。**避开绿色**，以免与信号色 / `--success` 交叉误读；主序列用蓝。

| Token | Dark | Light | 角色 |
|---|---|---|---|
| `--viz-1` | `#60A5FA` | `#3B82F6` | 主序列（蓝） |
| `--viz-2` | `#FBBF24` | `#D97706` | 琥珀 |
| `--viz-3` | `#A78BFA` | `#8B5CF6` | 紫 |
| `--viz-4` | `#F472B6` | `#EC4899` | 粉 |
| `--viz-5` | `#22D3EE` | `#06B6D4` | 青 |
| `--viz-6` | `#71717A` | `#71717A` | 中性（“其他/未分类”） |

### 梯度策略

**无装饰性渐变。** 视觉分隔来自纯色块、1px 边框与轻量分层阴影（见 [elevation.md](elevation.md)）。不使用品牌渐变、不使用拟物高光。

### 主题映射规则

- dark 为默认；light 为同等一等公民，二者所有 token 一一对应。
- 代码块 `--code-bg` 在两套主题下恒暗，不随主题切换。
- 信号色 / 语义色在两套主题下各有明度适配值（见上表），非简单反转。
- 实现层以 CSS 变量承载（`src/styles/tokens.css`），主题切换只换变量集，不改组件。

## Do's & Don'ts

**Do**

- dark 为默认主题，light 为同等一等公民，二者共用同一套中性蓝灰阶 + 绿信号色。
- 界面里同时只允许一种彩色（`--accent` 绿）说话；语义色仅在状态出现时点缀。
- 信号色只用于可操作 / 最重要元素：主操作、链接、可点标签、焦点环、数据强调。

**Don't**

- 不引入第二种界面彩色；不把信号色当背景大面积铺、不当正文色。
- 不在亮色模式下把代码块变浅（代码块恒暗）。
- 数据可视化不使用界面绿（用 `--viz-*` 色板）。

## AI 实现检查清单

- [ ] 所有颜色引用均为 `var(--token)`，无裸 hex（本文件与速查表除外）。
- [ ] 新增表面落在 `canvas / surface-1 / surface-2 / code-bg` 四级之内。
- [ ] 交互元素用 `--accent` 系；状态小件用 `--success/--warning/--danger`；未引入新彩色。
- [ ] 代码块底色在 light 主题下仍为 `--code-bg`（恒暗）。
- [ ] dark 与 light 两套取值均已核对 `src/styles/tokens.css`。
