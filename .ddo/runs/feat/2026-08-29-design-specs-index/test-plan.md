# ddo-web 测试计划

> 依据：`run://.ddo/runs/feat/2026-08-29-design-specs-index/spec.md`（revision 2，AC-1 ~ AC-8）。
> 所有 `cmd:` 条目在 worktree 根目录（`/Users/djhhh/work_area/ddo-web-feat-2026-08-29-design-specs-index`）执行，无需 sudo 与网络。

## G1. 目录结构与文件落位

- [ ] cmd: `test -f design/DESIGN.md && test -d design/components && test -d design/foundations`
- [ ] cmd: `test "$(ls design/components/*.md | wc -l | tr -d ' ')" = "9" && test "$(ls design/foundations/*.md | wc -l | tr -d ' ')" = "9"`
- [ ] cmd: `test ! -f DESIGN.md`

通过标准：索引文件与两个子目录就位，组件规则文件恰为 9 份、基础规则文件恰为 9 份，根目录旧 `DESIGN.md` 已删除。（AC-1、AC-6）

## G2. 分层导航与链接

- [ ] cmd: `for f in design/components/*.md design/foundations/*.md; do grep -q "$(basename "$f")" design/DESIGN.md || { echo "missing in map: $f"; exit 1; }; done`
- [ ] cmd: `test -f AGENTS.md && grep -q "design/DESIGN.md" AGENTS.md`
- [ ] cmd: `cd design && grep -hoE '\]\([^)]+\.md[^)]*\)' DESIGN.md | sed -E 's/\]\(//; s/\)$//; s/#.*//' | while read -r p; do test -e "$p" || { echo "broken link: $p"; exit 1; }; done`

通过标准：从 `AGENTS.md` 能到达索引，索引文件地图覆盖全部 18 份规则文件，且索引内相对链接全部可解析。（AC-1、AC-7）

## G3. 内容覆盖与数值一致

- [ ] human: 抽查 `design/components/button.md`、`design/components/tabs.md`、`design/components/dense-table.md`，对照原 DESIGN.md §4.2 / §4.7 / §4.8（原文可查主工作树 `/Users/djhhh/work_area/ddo-web/DESIGN.md`）：规则要点（变体、尺寸、状态、焦点、禁用）无遗漏，数值与原文一致。
- [ ] human: 对照 `design/DESIGN.md` 的「裁决与迁移记录」迁移映射表，逐节核对原文 §1–§10，确认每一节都有归属文件，无内容丢失；裁决项（`text-tertiary` 取 `#71717A`、绿色信号、Fira Code）与 `src/styles/tokens.css` 一致。

通过标准：抽查组件文件规则完整、数值未改写；原文 §1–§10 全部有归属，裁决与 tokens.css 一致。（AC-2、AC-4）

## G4. Token-only 取值引用

- [ ] cmd: `! grep -rqE '#[0-9a-fA-F]{3,8}' design/components/`
- [ ] cmd: `test "$(grep -rnE '#[0-9a-fA-F]{3,8}' design/foundations/ | grep -vE '(colors|token-quick-reference)\.md' | wc -l | tr -d ' ')" = "0"`
- [ ] cmd: `for f in design/components/*.md; do grep -q 'var(--' "$f" || { echo "no token ref: $f"; exit 1; }; done`
- [ ] cmd: `grep -q -- '--accent: #10b981' src/styles/tokens.css && grep -q -- '--text-tertiary: #71717a' src/styles/tokens.css`

通过标准：组件规则文件零裸 hex；基础规则文件中仅 `colors.md` 与 `token-quick-reference.md` 记录取值；每份组件文件至少引用一个 `var(--token)`；tokens.css 取值未被改动。（AC-3）

## G5. 沉淀流程规则

- [ ] cmd: `grep -q 'git push' AGENTS.md && grep -q '沉淀' AGENTS.md && grep -qE 'git (diff|log)' AGENTS.md`
- [ ] cmd: `grep -q '沉淀' design/DESIGN.md`

通过标准：`AGENTS.md` 成文三要点——触发时机为 `git push` 之前、需提示用户并获确认、确认后通过 git 盘点变更并整理沉淀到样式架构规则；`design/DESIGN.md` 迭代守则含单行指针。（AC-8）

## G6. 旧引用清除

- [ ] cmd: `! grep -rn 'ddo-design' CLAUDE.md README.md CONTRIBUTING.md`
- [ ] cmd: `grep -q 'design/DESIGN.md' CLAUDE.md`

通过标准：三份文档不再出现 `../ddo-design/DESIGN.md` 旧路径；`CLAUDE.md` 权威来源指向新结构。（AC-5、AC-6）

## G7. 仓库健康

- [ ] cmd: `source ~/.nvm/nvm.sh && nvm exec 22 npm run lint`
- [ ] cmd: `source ~/.nvm/nvm.sh && nvm exec 22 npm run build`

通过标准：`npm run lint` 与 `npm run build`（Node 22）均以 exit 0 结束。（项目完成标准）

## TDD 测试文件

| 文件 | 覆盖检查项 | 框架/形式 | 状态 |
|---|---|---|---|
| `tests/design-index.test.sh` | G1-1/2/3、G2-1/2/3、G4-1/2/3/4、G5-1/2、G6-1/2、G7-1/2（全部 16 个 `cmd:` 条目） | Bash 测试脚本（项目无单测框架，shell 桩为最小可行形式；每个函数含 Arrange/Act/Assert 注释） | Red（16/16 桩 `return 1`，脚本 exit 1；已验证可运行） |
