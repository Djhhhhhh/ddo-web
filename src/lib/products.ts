/**
 * ddo 产品族注册表 —— 新增产品在此登记，Nav / Home / 路由自动跟随。
 */
export interface Product {
  id: string
  name: string
  /** 路由路径 */
  path: string
  /** 一句话定位 */
  tagline: string
  /** 版本徽章 */
  version: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'code-flow',
    name: 'ddo-code-flow',
    path: '/code-flow',
    tagline: '可配置的 AI 编码流水线',
    version: 'v4.0.0',
  },
]
