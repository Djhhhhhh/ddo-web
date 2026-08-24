import { useState } from 'react'
import { Badge } from '../../components/ui/Badge/Badge'
import { ButtonLink } from '../../components/ui/Button/Button'
import { Card } from '../../components/ui/Card/Card'
import { CodeBlock } from '../../components/ui/CodeBlock/CodeBlock'
import { DotNav } from '../../components/ui/DotNav/DotNav'
import { Icon } from '../../components/ui/Icon'
import { Table } from '../../components/ui/Table/Table'
import { Tabs } from '../../components/ui/Tabs/Tabs'
import styles from './CodeFlow.module.css'

/* ============================ 数据 ============================ */

interface WorkflowDef {
  id: string
  name: string
  desc: string
  gates: string[]
  stages: { name: string; gate?: boolean; empty?: boolean }[]
}

const WORKFLOWS: WorkflowDef[] = [
  {
    id: 'standard',
    name: 'Standard',
    desc: '默认完整开发流水线：需求 → 规约 → 方案 → 测试计划 → 任务拆分 → 编码 → 验收 → 报告 → 复盘。',
    gates: ['spec', 'planning', 'test-plan', 'reflection'],
    stages: [
      { name: 'context' },
      { name: 'requirement' },
      { name: 'spec', gate: true },
      { name: 'planning', gate: true },
      { name: 'test-plan', gate: true },
      { name: 'tasking' },
      { name: 'coding' },
      { name: 'verification' },
      { name: 'review', empty: true },
      { name: 'reporting' },
      { name: 'reflection', gate: true },
      { name: 'done', empty: true },
    ],
  },
  {
    id: 'lightweight',
    name: 'Lightweight',
    desc: '轻量模式：跳过测试计划与任务拆分，适合小修、文档更新或快速迭代。',
    gates: ['spec', 'planning', 'reflection'],
    stages: [
      { name: 'context' },
      { name: 'requirement' },
      { name: 'spec', gate: true },
      { name: 'planning', gate: true },
      { name: 'coding' },
      { name: 'verification' },
      { name: 'reporting' },
      { name: 'reflection', gate: true },
      { name: 'done', empty: true },
    ],
  },
  {
    id: 'guarded',
    name: 'Guarded',
    desc: '加强复审模式：启用 review 阶段，适合安全、数据迁移、公开接口或性能敏感的变更。',
    gates: ['spec', 'planning', 'test-plan', 'reflection'],
    stages: [
      { name: 'context' },
      { name: 'requirement' },
      { name: 'spec', gate: true },
      { name: 'planning', gate: true },
      { name: 'test-plan', gate: true },
      { name: 'tasking' },
      { name: 'coding' },
      { name: 'verification' },
      { name: 'review' },
      { name: 'reporting' },
      { name: 'reflection', gate: true },
      { name: 'done', empty: true },
    ],
  },
  {
    id: 'issue-driven',
    name: 'Issue-driven',
    desc: 'Issue / PR 驱动开发流水线：认领 issue → 远端确认门 → 交付 PR。',
    gates: ['spec', 'planning', 'test-plan'],
    stages: [
      { name: 'context' },
      { name: 'issue-fetch' },
      { name: 'requirement' },
      { name: 'spec', gate: true },
      { name: 'planning', gate: true },
      { name: 'test-plan', gate: true },
      { name: 'tasking' },
      { name: 'coding' },
      { name: 'verification' },
      { name: 'delivery' },
      { name: 'done', empty: true },
    ],
  },
]

interface AtomTask {
  name: string
  off?: boolean
  produces: string[]
  consumes: string[]
}

interface AtomGroup {
  group: string
  items: AtomTask[]
}

const ATOM_GROUPS: AtomGroup[] = [
  {
    group: '上下文',
    items: [
      { name: 'context', produces: ['context-summary'], consumes: [] },
      { name: 'issue-fetch', produces: ['issue-context'], consumes: [] },
    ],
  },
  {
    group: '需求',
    items: [
      { name: 'requirement', produces: ['requirement'], consumes: ['issue-context?'] },
      { name: 'git-worktree', produces: ['worktree-info'], consumes: ['requirement'] },
    ],
  },
  {
    group: '规划',
    items: [
      { name: 'spec', produces: ['spec'], consumes: ['requirement', 'context-summary?'] },
      { name: 'plan', produces: ['plan'], consumes: ['spec', 'context-summary?'] },
      { name: 'test-plan', produces: ['test-plan'], consumes: ['spec'] },
      { name: 'tasking', produces: ['tasks-dir', 'task-group'], consumes: ['plan', 'test-plan'] },
    ],
  },
  {
    group: '执行',
    items: [
      { name: 'coding', produces: ['code-change'], consumes: ['task-group', 'spec', 'plan?'] },
      { name: 'verification', produces: ['verification-log'], consumes: ['spec', 'test-plan?'] },
      { name: 'review', off: true, produces: ['review-report'], consumes: ['tasks-dir?'] },
    ],
  },
  {
    group: '交付',
    items: [
      { name: 'reporting', produces: ['execution-report'], consumes: ['verification-log?'] },
      { name: 'reflection', produces: ['reflection-report'], consumes: ['execution-report'] },
      { name: 'remote-gate', produces: ['gate-result'], consumes: ['stage-artifact'] },
      { name: 'delivery-doc', produces: ['delivery-doc'], consumes: ['spec'] },
      { name: 'create-pr', produces: ['pr-info'], consumes: ['delivery-doc'] },
      { name: 'cleanup-worktree', produces: [], consumes: ['pr-info'] },
    ],
  },
]

const FLOW_NODES: { label: string; cap: string; board?: boolean }[] = [
  { label: 'atom-task A', cap: '产出 role' },
  { label: 'runtime 登记', cap: 'role → path', board: true },
  { label: '.state.json.artifacts', cap: '黑板清单', board: true },
  { label: 'runtime 注入', cap: '{{inputs.role}}' },
  { label: 'atom-task B', cap: '消费 role' },
]

const STATS = [
  { label: 'Workflows', value: '4' },
  { label: 'Atom-Tasks', value: '17' },
  { label: 'Artifact Roles', value: '20' },
  { label: 'Runtime', value: 'v4' },
]

interface RunType {
  id: 'feat' | 'fix'
  label: string
  flag: string
}

const RUN_TYPES: RunType[] = [
  { id: 'feat', label: '新功能', flag: '--feature' },
  { id: 'fix', label: '修 Bug', flag: '--bugfix' },
]

const SECTIONS = [
  { id: 'overview', label: '概览' },
  { id: 'configure', label: '配置' },
  { id: 'concept', label: '概念' },
  { id: 'architecture', label: '架构' },
  { id: 'workflows', label: '流水线' },
  { id: 'atom-tasks', label: '原子任务' },
  { id: 'run-model', label: '运行模型' },
  { id: 'studio', label: 'Studio' },
]

/* ============================ 页面 ============================ */

export function CodeFlow() {
  const [activeWf, setActiveWf] = useState('standard')
  const wf = WORKFLOWS.find((w) => w.id === activeWf) ?? WORKFLOWS[0]

  const [cfgWf, setCfgWf] = useState('standard')
  const [runType, setRunType] = useState<'feat' | 'fix'>('feat')
  const cfgWfDef = WORKFLOWS.find((w) => w.id === cfgWf) ?? WORKFLOWS[0]
  const runTypeDef = RUN_TYPES.find((r) => r.id === runType) ?? RUN_TYPES[0]
  const commandText = `ddo-code-flow --model ${cfgWfDef.id} ${runTypeDef.flag}`

  return (
    <>
      <DotNav sections={SECTIONS} />
      {/* Hero */}
      <section className={styles.hero} id="overview">
        <div className="container">
          <p className="eyebrow">DDO 产品族 · AI 编码流水线 Skill</p>
          <h1 className={styles.title}>ddo-code-flow</h1>
          <p className={styles.lead}>
            一个<strong>可配置</strong>的 AI 编码流水线。atom-task 只声明它<em>消费</em>与
            <em>产出</em>的 <span className="mono">artifact role</span>；runtime 通过
            <strong>黑板</strong>把它们串起来；pipeline 是唯一的集成层。
          </p>
          <div className={styles.actions}>
            <ButtonLink href="#configure" variant="primary">
              运行流水线
              <Icon name="arrow-right" size={16} />
            </ButtonLink>
            <ButtonLink href="#architecture" variant="tonal">
              了解架构
              <Icon name="info" size={16} />
            </ButtonLink>
          </div>

          <div className={styles.terminal}>
            <CodeBlock label="run · standard">
              <span className="code-prompt">$</span> ddo-code-flow --model standard --feature
              {'\n'}
              <span className="code-dim">▸ Workflow:</span> Standard — 默认完整开发流水线
              {'\n'}
              <span className="code-dim">▸ Run type:</span> feat
              {'\n'}
              <span className="code-dim">▸ Stages:</span> context → requirement → spec{' '}
              <span className="code-gate">⛔</span> → planning <span className="code-gate">⛔</span>{' '}
              → test-plan <span className="code-gate">⛔</span> → tasking → coding → verification →
              reporting → reflection <span className="code-gate">⛔</span> → done
            </CodeBlock>
          </div>

          <dl className={styles.stats}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.stat}>
                <dt className={styles.statLabel}>{s.label}</dt>
                <dd className={styles.statValue}>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 配置器 */}
      <section className="section" id="configure">
        <div className="container">
          <p className="eyebrow">Configure</p>
          <h2 className="section-title">配置你的流水线</h2>
          <p className="section-lead">
            选 workflow 与 run 类型，命令实时生成，复制即可在 ddo-code-flow 中运行。
          </p>

          <div className={styles.configGrid}>
            <div className={styles.configFields}>
              <div>
                <span className={styles.configLabel}>流水线</span>
                <div className={styles.chips} role="group" aria-label="流水线">
                  {WORKFLOWS.map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      aria-pressed={cfgWf === w.id}
                      className={[styles.chip, cfgWf === w.id ? styles.chipActive : ''].join(' ')}
                      onClick={() => setCfgWf(w.id)}
                    >
                      {w.name}
                    </button>
                  ))}
                </div>
                <p className={styles.configDesc}>{cfgWfDef.desc}</p>
              </div>

              <div>
                <span className={styles.configLabel}>Run 类型</span>
                <div className={styles.chips} role="group" aria-label="Run 类型">
                  {RUN_TYPES.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      aria-pressed={runType === r.id}
                      className={[styles.chip, runType === r.id ? styles.chipActive : ''].join(' ')}
                      onClick={() => setRunType(r.id)}
                    >
                      {r.label}
                      <span className={styles.chipFlag}>{r.flag}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.configCode}>
              <CodeBlock label="命令" copyText={commandText}>
                <span className="code-prompt">$</span> ddo-code-flow --model {cfgWfDef.id}{' '}
                {runTypeDef.flag}
              </CodeBlock>
            </div>
          </div>
        </div>
      </section>

      {/* 核心概念 */}
      <section className="section" id="concept">
        <div className="container">
          <p className="eyebrow">Core concept</p>
          <h2 className="section-title">三件事，各管各的</h2>
          <p className="section-lead">
            v4 的核心目标是把职责边界拆清楚：任务只声明<strong>角色</strong>，编排只定义
            <strong>顺序与门</strong>，运行时只负责<strong>状态与注入</strong>。谁也不越界。
          </p>

          <div className="grid grid--3">
            <Card className={styles.feature}>
              <div className={styles.featureIcon}>
                <Icon name="shield" size={20} />
              </div>
              <h3 className={styles.featureTitle}>atom-task 声明角色</h3>
              <p className={styles.featureText}>
                每个 atom-task 只声明自己 <span className="mono">consumes</span> 与{' '}
                <span className="mono">produces</span> 的 artifact role，不写
                stage、不写具体路径、不点名上游任务。
              </p>
              <pre className={styles.featureCode}>
                <span className="code-kw">produces:</span> role: spec
                {'\n'}
                <span className="code-kw">consumes:</span> role: requirement
              </pre>
            </Card>

            <Card className={styles.feature}>
              <div className={styles.featureIcon}>
                <Icon name="git-branch" size={20} />
              </div>
              <h3 className={styles.featureTitle}>workflow 是唯一集成层</h3>
              <p className={styles.featureText}>
                stage 顺序、DAG 边、<span className="mono">taskRef</span>、节点 options 与确认门，
                全部只属于 workflow JSON。业务指令不进编排层。
              </p>
              <pre className={styles.featureCode}>
                <span className="code-kw">confirmationGates:</span> [spec, planning]
              </pre>
            </Card>

            <Card className={styles.feature}>
              <div className={styles.featureIcon}>
                <Icon name="cpu" size={20} />
              </div>
              <h3 className={styles.featureTitle}>runtime 只管状态与注入</h3>
              <p className={styles.featureText}>
                配置在运行时内存合成、artifact role 注入、worktree 创建、恢复与 metrics hook ——
                业务决策一概不碰。
              </p>
              <pre className={styles.featureCode}>
                <span className="code-kw">artifacts:</span> blackboard
              </pre>
            </Card>
          </div>
        </div>
      </section>

      {/* 架构分层 */}
      <section className="section section--alt" id="architecture">
        <div className="container">
          <p className="eyebrow">Architecture</p>
          <h2 className="section-title">四层职责，边界清晰</h2>
          <p className="section-lead">
            每一层都有明确的「拥有什么 / 绝不拥有什么」。这条边界就是 v4 与旧版最大的区别。
          </p>

          <Table>
            <thead>
              <tr>
                <th>Layer</th>
                <th>Owns（拥有）</th>
                <th>Must not own（绝不拥有）</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="cell-mono">atom-task</td>
                <td>业务指令、produces / consumes、options、reject 行为</td>
                <td>stage、具体 artifact 路径、上游任务名、全局配置读取</td>
              </tr>
              <tr>
                <td className="cell-mono">workflow</td>
                <td>stage 顺序、DAG 节点、taskRef、节点 options、确认门</td>
                <td>业务指令、artifact 文件路径</td>
              </tr>
              <tr>
                <td className="cell-mono">config</td>
                <td>全局默认、项目覆盖、atom-task option 覆盖</td>
                <td>运行期状态、生成的产物、每 run 的配置副本</td>
              </tr>
              <tr>
                <td className="cell-mono">runtime</td>
                <td>配置合成、DAG 校验、角色注入、产物登记、状态、恢复</td>
                <td>atom-task 已拥有的业务决策</td>
              </tr>
            </tbody>
          </Table>

          <h3 className="sub-title">Artifact Blackboard —— 角色流转</h3>
          <p className="section-lead">
            下游任务从不点名上游文件，只声明需要的角色。runtime 按黑板登记后注入{' '}
            <span className="mono">{'{{inputs.role}}'}</span> 绑定。
          </p>

          <div className={styles.flow}>
            {FLOW_NODES.map((node, i) => (
              <div key={node.label} className={styles.flowGroup}>
                <div
                  className={[styles.flowNode, node.board ? styles.flowNodeBoard : ''].join(' ')}
                >
                  <span className={styles.flowTag}>{node.label}</span>
                  <span className={styles.flowCap}>{node.cap}</span>
                </div>
                {i < FLOW_NODES.length - 1 && (
                  <div className={styles.flowArrow} aria-hidden="true">
                    <Icon name="arrow-right" size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 流水线 */}
      <section className="section" id="workflows">
        <div className="container">
          <p className="eyebrow">Workflows</p>
          <h2 className="section-title">四条流水线，按需选择</h2>
          <p className="section-lead">
            通过 <span className="mono">--model &lt;workflow-id&gt;</span> 显式选择，或按需求文本的
            selection rules 匹配，最后回退默认。
          </p>

          <Tabs
            aria-label="流水线选择"
            tabs={WORKFLOWS.map((w) => ({ id: w.id, label: w.name }))}
            activeId={activeWf}
            onChange={setActiveWf}
          />

          <div className={styles.workflowPanel}>
            <div className={styles.workflowMeta}>
              <div>
                <h3 className={styles.workflowName}>{wf.name}</h3>
                <p className={styles.workflowDesc}>{wf.desc}</p>
              </div>
              <div className={styles.workflowGates}>
                {wf.gates.map((g) => (
                  <Badge key={g} variant="warning">
                    ⛔ {g}
                  </Badge>
                ))}
              </div>
            </div>
            <ol className={styles.pipeline}>
              {wf.stages.map((stage, i) => (
                <li key={stage.name} className={styles.pipelineItem}>
                  {i > 0 && <span className={styles.pipelineSep}>→</span>}
                  <span
                    className={[
                      styles.pipelineStage,
                      stage.gate ? styles.pipelineGate : '',
                      stage.empty ? styles.pipelineEmpty : '',
                    ].join(' ')}
                  >
                    {stage.name}
                    {stage.gate ? ' ⛔' : ''}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Atom-Tasks */}
      <section className="section section--alt" id="atom-tasks">
        <div className="container">
          <p className="eyebrow">Atom-Tasks</p>
          <h2 className="section-title">17 个原子任务</h2>
          <p className="section-lead">
            每个任务只声明角色契约，由 workflow 编排成完整流程。带{' '}
            <Badge variant="neutral">off</Badge> 标记的默认关闭，按需启用。
          </p>

          <div className={styles.atomGroups}>
            {ATOM_GROUPS.map((group) => (
              <div key={group.group} className={styles.atomGroup}>
                <h3 className={styles.atomGroupTitle}>{group.group}</h3>
                <div className={styles.atomGrid}>
                  {group.items.map((task) => (
                    <div key={task.name} className={styles.atomCard}>
                      <div className={styles.atomHead}>
                        <span className={styles.atomName}>{task.name}</span>
                        {task.off && <Badge variant="neutral">off</Badge>}
                      </div>
                      <div className={styles.atomRoles}>
                        {task.produces.length > 0 && (
                          <div className={styles.atomRole}>
                            <b className={styles.atomArrow}>→</b>
                            {task.produces.join(' · ')}
                          </div>
                        )}
                        {task.consumes.length > 0 && (
                          <div className={[styles.atomRole, styles.atomRoleCons].join(' ')}>
                            <b className={styles.atomArrow}>←</b>
                            {task.consumes.join(' · ')}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Run 模型 */}
      <section className="section" id="run-model">
        <div className="container">
          <p className="eyebrow">Run model</p>
          <h2 className="section-title">一次 run，三地解耦</h2>
          <p className="section-lead">
            skill 全局只读，项目只维护一份 <span className="mono">.ddo/config.json</span>， worktree
            默认与项目同级。产物最终随分支合并回项目。
          </p>

          <div className={[styles.runGrid, 'grid', 'grid--2'].join(' ')}>
            <CodeBlock label="仓库布局">
              <span className="code-dim">SKILL.md</span>
              <span className="code-dim"> # v4 指令型 runtime</span>
              {'\n'}
              <span className="code-dim">config.default.json</span>
              <span className="code-dim"> # 只读全局默认</span>
              {'\n'}
              <span className="code-dim">config.schema.json</span>
              {'\n'}
              <span className="code-dim">state.schema.json</span>
              <span className="code-dim"> # 状态字段与 writer</span>
              {'\n'}
              <span className="code-dim">workflows/*.json</span>
              <span className="code-dim"> # pipeline 定义</span>
              {'\n'}
              <span className="code-dim">atom-tasks/artifacts.json</span>
              {'\n'}
              <span className="code-dim">atom-tasks/&lt;name&gt;/&lt;name&gt;.md</span>
              {'\n'}
              <span className="code-dim">scripts/metrics/</span>
              <span className="code-dim"> # 可选 metrics 插件</span>
              {'\n'}
              <span className="code-dim">ui/</span>
              <span className="code-dim"> # 设计时 Studio</span>
            </CodeBlock>

            <CodeBlock label=".ddo/config.json">
              {'{\n'}
              {'  '}
              <span className="code-kw">&quot;$schema&quot;</span>:{' '}
              <span className="code-str">
                &quot;…/config.schema.json#/$defs/projectConfig&quot;
              </span>
              ,{'\n'}
              {'  '}
              <span className="code-kw">&quot;worktreeDir&quot;</span>:{' '}
              <span className="code-str">&quot;&quot;</span>,{' '}
              <span className="code-dim">// 缺省 = 项目父目录</span>
              {'\n'}
              {'  '}
              <span className="code-kw">&quot;defaultRunType&quot;</span>:{' '}
              <span className="code-str">&quot;feat&quot;</span>,{'\n'}
              {'  '}
              <span className="code-kw">&quot;contextPaths&quot;</span>: [],
              {'\n'}
              {'  '}
              <span className="code-kw">&quot;atomTaskOverrides&quot;</span>: {'{\n'}
              {'    '}
              <span className="code-kw">&quot;coding&quot;</span>: {'{ '}
              <span className="code-kw">&quot;model&quot;</span>:{' '}
              <span className="code-str">&quot;sonnet&quot;</span> {' }'},{'\n'}
              {'  }'}
              {'\n'}
              {'}'}
            </CodeBlock>
          </div>

          <div className={styles.runFlow}>
            {[
              {
                num: '01',
                title: '合成配置',
                text: '全局默认 ← 项目配置 ← run 参数，纯函数内存合并，不落盘。',
              },
              {
                num: '02',
                title: '创建 worktree',
                text: '在 worktreeDir 下隔离开发环境，源码改动只发生在这里。',
              },
              {
                num: '03',
                title: '黑板登记',
                text: '每节点「注入 → 执行 → 登记」，角色写入 .state.json.artifacts。',
              },
              {
                num: '04',
                title: '合并回项目',
                text: '产物随分支合并进 .ddo/runs/<type>/<date>/，git 可见性由用户掌控。',
              },
            ].map((step) => (
              <div key={step.num} className={styles.runStep}>
                <span className={styles.runNum}>{step.num}</span>
                <h4 className={styles.runTitle}>{step.title}</h4>
                <p className={styles.runText}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio */}
      <section className="section section--alt" id="studio">
        <div className="container">
          <p className="eyebrow">Studio</p>
          <h2 className="section-title">设计时 Studio</h2>
          <p className="section-lead">
            在 Chromium 系浏览器打开 <span className="mono">ui/index.html</span>，选择 skill
            目录即可编辑 <span className="mono">config.default.json</span> 与 workflow
            JSON。它只用于设计时， 不触碰项目配置，也不参与运行期。
          </p>
        </div>
      </section>
    </>
  )
}
