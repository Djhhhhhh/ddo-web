# ddo 产品族设计系统 · 规范索引

> 本文件是设计规范的**整体索引与分层入口**，只负责导航、迭代守则与裁决留痕，**不承载具体样式规则**。
> 具体规则分布在 [`components/`](components) 与 [`foundations/`](foundations) 下的 18 份规则文件中；
> 所有取值以 [`src/styles/tokens.css`](../src/styles/tokens.css) 为唯一数据来源。

## 1. 设计哲学与主题摘要

ddo 产品族面向开发者与 AI 工程场景。界面是一台**仪器**，不是一块画布——每一个元素都经过校准，以最小的视觉噪声承载最大的信息密度。设计哲学是「精确即体面」：克制、可读、可测量，像示波器和终端那样让人信赖，而不是一个需要被欣赏的产品官网。

**暗色优先**：dark 为默认主题，light 为同等一等公民，二者共用同一套中性蓝灰阶与信号色，仅明度方向相反。整体色系是**中性蓝灰**——结构色由黑到白的灰阶承担，单一克制的**绿色**（`--accent`，`#10B981`）只留给交互与语义信号（链接、焦点环、主操作、数据可视化主序列），不做品牌情绪渲染。信息密度高于消费级 SaaS：紧凑的间距、紧致的字号、密集的表格与网格，但绝不拥挤——节奏由一致的间距标度与行高守护。

**Key Characteristics:**

- 暗色优先的双主题：dark 默认、light 同等，共用同一套中性蓝灰阶 + 单一绿色信号
- 中性蓝灰结构色 + 单一绿色作交互 / 语义 / 数据信号
- 中高信息密度：紧凑间距、紧致字号、密集表格，节奏由标度与行高守护
- 多档圆角（6 / 8 / 12px），用圆角分级传达容器层级
- 轻量分层阴影用于分隔，零重投影、零拟物
- 等宽字体（Fira Code / 系统等宽）为一等公民，承载代码与数据
- 几何线性图标，统一线宽，无装饰插画
- 数据可视化专属分类色板，与界面中性色解耦

## 2. 分层加载说明

AI（以及人类开发者）按以下层次加载上下文，由粗到细、按需深入：

```
AGENTS.md（仓库入口：项目是什么 + 规范导航 + 开发流程）
  └─ design/DESIGN.md（本索引：文件地图 + 迭代守则 + 裁决留痕）
       ├─ design/foundations/*.md（基础规则：色彩 / 排版 / 间距 / 层级 / 控件 / 响应式 / 图标 / Do&Don't / 速查）
       ├─ design/components/*.md（组件规则：按钮 / 标签 / 表单 / 导航 / 卡片 / Tabs / 表格 / Toast / 滚动条）
       └─ src/styles/tokens.css（取值唯一数据来源，机器可读）
```

- 需要「做某类组件时」直接打开对应组件规则文件；需要「核对某个 token 的取值」读 `tokens.css`；需要「快速回忆全部 token」读 `foundations/token-quick-reference.md`。
- 规则文件里只引用 `var(--token)`，**不写裸 hex**；具体色值只出现在 `foundations/colors.md` 与 `foundations/token-quick-reference.md` 两份取值文档中（以及本索引「裁决记录」里作为证据引用的笔误对照值）。

## 3. 文件地图

### 基础规则（foundations）

| 文件 | 管辖范围 | 关键 token |
|---|---|---|
| [colors.md](foundations/colors.md) | 中性色阶 / 文字 / 边框 / 信号色 / 语义色 / 数据色板 / 主题映射 | `--canvas` `--surface-*` `--text-*` `--border*` `--accent*` `--success` `--warning` `--danger` `--viz-*` |
| [typography.md](foundations/typography.md) | 字体族 / 字号层级 / 字重 / 行高 / 字距 | `--font-sans` `--font-mono` `--fs-*` |
| [spacing-and-radius.md](foundations/spacing-and-radius.md) | 8px 间距标度 / 圆角标度 / 栅格与留白 | `--s1`…`--s14` `--r-sm` `--r-md` `--r-lg` `--pill` `--container` |
| [elevation.md](foundations/elevation.md) | 阴影四档 / 分隔策略 / 焦点表达 | `--e0` `--e1` `--e2` `--e3` `--accent-ring` |
| [control-scale.md](foundations/control-scale.md) | 控件统一高度标度 | `--h-sm` `--h-md` `--h-lg` |
| [responsive.md](foundations/responsive.md) | 断点 / 折叠策略 / 触控目标 | —（断点尺寸） |
| [icons-and-graphics.md](foundations/icons-and-graphics.md) | 图标风格 / 尺寸档 / 内联 SVG 零外部资源 | `--accent`（激活态） |
| [dos-and-donts.md](foundations/dos-and-donts.md) | 全局 Do / Don't 清单 | —（全量 token 汇总） |
| [token-quick-reference.md](foundations/token-quick-reference.md) | 全 token 速查表（含具体色值） | 全量 |

### 组件规则（components）

| 文件 | 管辖范围 | 关键 token |
|---|---|---|
| [button.md](components/button.md) | 按钮五变体 / 状态 / 图标按钮 | `--accent*` `--surface-2` `--border` `--danger` `--h-*` `--r-*` |
| [tags-and-status.md](components/tags-and-status.md) | role 标签 / 语义徽章 / 状态点 | `--accent-subtle` `--surface-2` `--success` `--warning` `--danger` `--text-tertiary` |
| [inputs-and-forms.md](components/inputs-and-forms.md) | 文本输入 / 等宽输入 / 命令栏 / 错误态 / 复选框 / 开关 | `--surface-1` `--border` `--accent-ring` `--danger` `--accent` |
| [navigation.md](components/navigation.md) | 顶栏导航 / logo / 链接 / 命令栏 | `--border-subtle` `--accent` `--text-*` |
| [cards-and-panels.md](components/cards-and-panels.md) | 卡片 / 面板 / 嵌套 / 代码块容器 | `--surface-1` `--surface-2` `--border*` `--r-lg` `--e2` `--code-*` |
| [tabs.md](components/tabs.md) | Tabs pill 容器 / 激活态 | `--surface-2` `--surface-1` `--border` `--r-md` `--r-sm` `--e1` |
| [dense-table.md](components/dense-table.md) | 密集表格 / 等宽数值列 / 选中行 | `--text-tertiary` `--border*` `--surface-2` `--accent-subtle` `--accent` `--font-mono` |
| [toast.md](components/toast.md) | 反馈 Toast 三态 | `--surface-1` `--border` `--r-md` `--e3` `--success` `--accent` `--danger` |
| [scrollbar.md](components/scrollbar.md) | 滚动条收编（webkit + Firefox） | `--text-tertiary` `--canvas` |

## 4. 迭代守则

1. 每次只改一个组件 / 一个 token，改完在 dark 与 light 两套主题下各看一遍。
2. 颜色只引用命名角色（`--accent`、`--surface-1`…），不写裸 hex；改值只改 `src/styles/tokens.css` 的 token 定义处。
3. 间距 / 圆角只取标度内值；控件高度只取 `--h-sm` / `--h-md` / `--h-lg`。
4. 字重只取 400 / 500 / 600；数字一律等宽 + `tabular-nums`。
5. 新增组件前先回看 [dos-and-donts.md](foundations/dos-and-donts.md)；觉得装饰过多就删——技术精确型里少即是多。
6. 信号色是全界面唯一彩色；任何想引入新色的冲动，先问「能不能用现有中性阶 + `--accent` 表达」。

> **沉淀规则**：本次需求的组件样式变更沉淀流程见 [`../AGENTS.md`](../AGENTS.md) 的「开发流程」节（`git push` 前提示是否沉淀 → 经 `git diff` / `git log` 盘点 → 整理落盘到 `design/` 对应规则文件，涉及新取值时同步 `tokens.css` 并在此留痕）。

## 5. 裁决与迁移记录

### 5.1 原 DESIGN.md 章节 → 新文件迁移映射

| 原章节 | 迁移目标 |
|---|---|
| §1 视觉主题与氛围 | 本索引 §1（绿信号修正后摘要） |
| §2 色彩系统与角色 | [foundations/colors.md](foundations/colors.md) |
| §3 排版系统 | [foundations/typography.md](foundations/typography.md) |
| §4 引言 + §4.1 控件尺寸标度 | [foundations/control-scale.md](foundations/control-scale.md) |
| §4.2 按钮 | [components/button.md](components/button.md) |
| §4.3 标签与状态点 | [components/tags-and-status.md](components/tags-and-status.md) |
| §4.4 输入与表单 | [components/inputs-and-forms.md](components/inputs-and-forms.md) |
| §4.5 导航 | [components/navigation.md](components/navigation.md) |
| §4.6 卡片与面板 | [components/cards-and-panels.md](components/cards-and-panels.md) |
| §4.7 Tabs | [components/tabs.md](components/tabs.md) |
| §4.8 密集表格 | [components/dense-table.md](components/dense-table.md) |
| §4.9 反馈 Toast | [components/toast.md](components/toast.md) |
| §4.10 滚动条 | [components/scrollbar.md](components/scrollbar.md) |
| §5 布局与间距 | [foundations/spacing-and-radius.md](foundations/spacing-and-radius.md) |
| §6 层级与阴影 | [foundations/elevation.md](foundations/elevation.md) |
| §7 图标与图像 | [foundations/icons-and-graphics.md](foundations/icons-and-graphics.md) |
| §8 Do's & Don'ts | [foundations/dos-and-donts.md](foundations/dos-and-donts.md) |
| §9 响应式行为 | [foundations/responsive.md](foundations/responsive.md) |
| §10.1 Token 速查 | [foundations/token-quick-reference.md](foundations/token-quick-reference.md) |
| §10.2 示例 prompt | 见下方「示例 prompt 归属」 |
| §10.3 迭代守则 | 本索引 §4 |

### 5.2 示例 prompt 归属

| 原 §10.2 示例 | 归属规则文件 |
|---|---|
| 标题区（primary + tonal 按钮） | [components/button.md](components/button.md) |
| 代码块 | [components/cards-and-panels.md](components/cards-and-panels.md) |
| 命令栏搜索 | [components/inputs-and-forms.md](components/inputs-and-forms.md) |
| 密集表格 | [components/dense-table.md](components/dense-table.md) |
| Tabs | [components/tabs.md](components/tabs.md) |

### 5.3 裁决项

| 编号 | 冲突点 | 裁决 | 依据 |
|---|---|---|---|
| A1 | 原 §1 及 Key Characteristics 以「蓝色」描述信号色，与 §2.4 / `tokens.css` 的绿 `--accent` 冲突 | 信号色为**绿** `#10B981`（`--accent`） | §2.4 与 `src/styles/tokens.css`（`--accent: #10b981`）为权威取值 |
| A2 | 原 §10.1 将 `text-tertiary` 写作 `#71737A`（笔误） | `text-tertiary` 为 `#71717A` | §2.2 与 `tokens.css`（`--text-tertiary: #71717a`）一致，`#71737A` 为孤立笔误 |
| A3 | 原 §1 Key Characteristics 写「JetBrains Mono / 系统等宽」，§3 与 `tokens.css` 为 Fira Code | 等宽字体为 **Fira Code** | §3 与 `tokens.css`（`--font-mono: 'Fira Code', …`）一致 |

### 5.4 待沉淀缺口

- **on-accent 反色文字**：`primary` 按钮在 `--accent` 底上用白字（on-accent 反色），当前 `tokens.css` 未提供专属 token（如 `--accent-contrast` / `--text-on-accent`），`button.md` 暂以「白字（on-accent 反色）」描述。后续沉淀时建议补一个语义 token 并回填本记录。
