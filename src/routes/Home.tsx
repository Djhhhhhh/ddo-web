import { PRODUCTS } from '../lib/products'
import { Badge } from '../components/ui/Badge/Badge'
import { ButtonLink } from '../components/ui/Button/Button'
import { Card } from '../components/ui/Card/Card'
import { Icon } from '../components/ui/Icon'
import styles from './Home.module.css'

export function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <p className="eyebrow">DDO 产品族</p>
          <h1 className={styles.title}>面向开发者与 AI 工程</h1>
          <p className={styles.lead}>
            ddo 是一组为开发者与 AI 工程场景设计的工具。所有产品共享同一套设计系统 ——
            暗色优先、中性蓝灰结构、单一绿色信号，像仪器一样精确、克制、可测量。
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Products</p>
          <h2 className="section-title">产品</h2>
          <p className="section-lead">当前已收录的产品。新成员加入后在此自动展示。</p>

          <div className="grid grid--2">
            {PRODUCTS.map((product) => (
              <Card key={product.id} interactive className={styles.card}>
                <div className={styles.cardHead}>
                  <h3 className={styles.cardName}>{product.name}</h3>
                  <Badge variant="accent">{product.version}</Badge>
                </div>
                <p className={styles.cardTagline}>{product.tagline}</p>
                <div className={styles.cardAction}>
                  <ButtonLink href={product.path} variant="secondary" size="sm">
                    查看介绍
                    <Icon name="arrow-right" size={14} />
                  </ButtonLink>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
