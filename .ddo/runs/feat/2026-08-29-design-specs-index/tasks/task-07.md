# task-07 · TDD 断言转绿

## 目标

将 `tests/design-index.test.sh` 中 16 个 Red 桩逐项实现为真实断言（Green），使 `bash tests/design-index.test.sh` 全量通过（exit 0）。

## 输入

- `tests/design-index.test.sh`（Red 骨架，每桩含目标命令注释）
- test-plan.md 的 G1/G2/G4/G5/G6/G7 `cmd:` 条目（桩与检查项一一对应）

## 文件清单

| 文件 | 动作 |
|---|---|
| `tests/design-index.test.sh` | 修改：16 个桩替换为真实断言 |

## 关键要点

- 断言实现即各桩注释中的目标命令（`test`/`grep`/循环核对），不新增范围外检查。
- G7 两个桩实现为真实执行 `source ~/.nvm/nvm.sh && nvm exec 22 npm run lint` / `npm run build` 并透传退出码。
- 保持函数命名与检查项 ID 对应（`test_g1_1_*` 等）不变，便于追溯。

## 关联验收点

- 全部 G 组的自动化部分（G1/G2/G4/G5/G6/G7）

## 完成标准

- `bash tests/design-index.test.sh` exit 0，16/16 PASS；脚本语法 `bash -n` 通过。
