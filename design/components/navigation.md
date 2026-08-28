# 导航样式规则

> 来源：原 DESIGN.md §4.5 ｜ 取值数据来源：`src/styles/tokens.css` ｜ 返回索引：[design/DESIGN.md](../DESIGN.md)

## 概述

顶部导航透明、克制，承担品牌识别（logo 圆点）、页面导航与主 CTA 入口。既有实现参照：`src/components/layout/Nav`。

## Token 引用

| Token | 用途 |
|---|---|
| `var(--canvas)` | 透明底（= 页面底色） |
| `var(--border-subtle)` | 底部 1px 分隔 |
| `var(--accent)` / `var(--accent-subtle)` | logo 圆点与外发光 |
| `var(--text-secondary)` / `var(--text-primary)` | 链接 / 当前页 |
| `var(--fs-body-sm)` | 链接字号 |

## 规则细则

- 透明底（= `--canvas` / 页面），不自带背景；底部 1px `--border-subtle` 分隔。
- 左：logo 圆点（`--accent` + `--accent-subtle` 外发光）+ wordmark。
- 中/右：文字链接 13px（`--fs-body-sm`）`--text-secondary`，当前页 `--text-primary` weight 500；命令栏搜索居中或偏右（见 [inputs-and-forms.md](inputs-and-forms.md)）；右侧 `ghost` Sign in + `primary` 主 CTA（见 [button.md](button.md)）。
- 导航条高度约 48–56px。
- 响应式：<768 折叠为汉堡菜单，文字链接隐藏，主 CTA 在 mobile 隐藏或并入菜单（见 [../foundations/responsive.md](../foundations/responsive.md)）。

## Do's & Don'ts

**Do**

- 导航保持透明 + 1px 底分隔，不引入背景块。
- 当前页用文字色与字重（500）区分，不用下划线。

**Don't**

- 不给导航加阴影或实心背景。
- 不在导航堆放超过一枚主 CTA。

## AI 实现检查清单

- [ ] 导航底透明，底部分隔为 1px `--border-subtle`。
- [ ] 链接 13px `--text-secondary`；当前页 `--text-primary` + 500。
- [ ] logo 圆点为 `--accent` + `--accent-subtle` 发光。
- [ ] 高度 48–56px；<768 折叠为汉堡菜单。
