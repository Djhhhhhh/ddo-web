#!/usr/bin/env bash
# ============================================================
# ddo-web · design 规范索引 TDD 测试（Green 状态）
# 依据: .ddo/runs/feat/2026-08-29-design-specs-index/test-plan.md
# 约定: 每个函数对应一个 `- [ ] cmd:` 检查项；全部实现为真实断言。
# 运行: bash tests/design-index.test.sh （在 worktree 根目录）
# ============================================================
set -u
cd "$(dirname "$0")/.." || exit 1

FAIL=0
run() { # run <test-name>
  local name="$1"
  if "$name"; then
    echo "PASS: $name"
  else
    echo "FAIL: $name"
    FAIL=1
  fi
}

# ---------- G1 目录结构与文件落位 ----------

test_g1_1_index_and_dirs_exist() {
  test -f design/DESIGN.md && test -d design/components && test -d design/foundations
}

test_g1_2_file_counts_9_plus_9() {
  local c f
  c=$(find design/components -maxdepth 1 -name '*.md' | wc -l | tr -d ' ')
  f=$(find design/foundations -maxdepth 1 -name '*.md' | wc -l | tr -d ' ')
  [ "$c" = "9" ] && [ "$f" = "9" ]
}

test_g1_3_root_design_md_removed() {
  test ! -f DESIGN.md
}

# ---------- G2 分层导航与链接 ----------

test_g2_1_index_map_covers_all_rule_files() {
  local f missing=0
  for f in design/components/*.md design/foundations/*.md; do
    if ! grep -q "$(basename "$f")" design/DESIGN.md; then
      echo "  missing from index: $(basename "$f")"
      missing=1
    fi
  done
  [ "$missing" -eq 0 ]
}

test_g2_2_agents_links_to_index() {
  test -f AGENTS.md && grep -q "design/DESIGN.md" AGENTS.md
}

test_g2_3_index_relative_links_resolve() {
  local link missing=0
  while IFS= read -r link; do
    case "$link" in
      http:* | https:* | '#'*) continue ;;
    esac
    if [ ! -f "design/$link" ]; then
      echo "  broken link: design/$link"
      missing=1
    fi
  done < <(grep -oE '\]\([^)]+\.md\)' design/DESIGN.md | sed -E 's/^\]\(//; s/\)$//')
  [ "$missing" -eq 0 ]
}

# ---------- G4 Token-only 取值引用 ----------

test_g4_1_no_hex_in_component_files() {
  ! grep -rqE '#[0-9a-fA-F]{3,8}' design/components/
}

test_g4_2_foundations_hex_only_in_token_docs() {
  local bad
  bad="$(grep -rlE '#[0-9a-fA-F]{3,8}' design/foundations/ 2>/dev/null | grep -vE 'colors\.md$|token-quick-reference\.md$')"
  [ -z "$bad" ]
}

test_g4_3_every_component_refs_token_var() {
  local f missing=0
  for f in design/components/*.md; do
    grep -q 'var(--' "$f" || { echo "  no var(-- in $f"; missing=1; }
  done
  [ "$missing" -eq 0 ]
}

test_g4_4_tokens_css_untouched() {
  grep -q -- '--accent: #10b981' src/styles/tokens.css \
    && grep -q -- '--text-tertiary: #71717a' src/styles/tokens.css
}

# ---------- G5 沉淀流程规则 ----------

test_g5_1_agents_push_rule_three_points() {
  grep -q 'git push' AGENTS.md \
    && grep -q '沉淀' AGENTS.md \
    && grep -qE 'git diff|git log' AGENTS.md
}

test_g5_2_index_has_rule_pointer() {
  grep -q '沉淀' design/DESIGN.md
}

# ---------- G6 旧引用清除 & 单一 AI 入口 ----------

test_g6_1_no_stale_ddo_design_refs() {
  ! grep -rq 'ddo-design' AGENTS.md README.md
}

test_g6_2_single_ai_source() {
  test ! -f CLAUDE.md && test ! -f CONTRIBUTING.md
}

# ---------- G7 仓库健康 ----------

test_g7_1_npm_lint_passes() {
  source ~/.nvm/nvm.sh && nvm exec 22 npm run lint
}

test_g7_2_npm_build_passes() {
  source ~/.nvm/nvm.sh && nvm exec 22 npm run build
}

run test_g1_1_index_and_dirs_exist
run test_g1_2_file_counts_9_plus_9
run test_g1_3_root_design_md_removed
run test_g2_1_index_map_covers_all_rule_files
run test_g2_2_agents_links_to_index
run test_g2_3_index_relative_links_resolve
run test_g4_1_no_hex_in_component_files
run test_g4_2_foundations_hex_only_in_token_docs
run test_g4_3_every_component_refs_token_var
run test_g4_4_tokens_css_untouched
run test_g5_1_agents_push_rule_three_points
run test_g5_2_index_has_rule_pointer
run test_g6_1_no_stale_ddo_design_refs
run test_g6_2_single_ai_source
run test_g7_1_npm_lint_passes
run test_g7_2_npm_build_passes

exit $FAIL
