# 风控

## 遗留

- [ ] showModal.js: 由于react.render 不在#root下，导致antd样式无法继承全局 configProvider

- [ ] 刷新页面后，hash 自动滚动

- [ ] 策略集管理: join anti_product

- [x] rule 分 block，测试验证 ✅ 2024-03-11

- [ ] 提交策略集没测

- [x] feature.content 展开 ✅ 2024-03-07

- [ ] ui 调整 （接入信息和管理页面） https://ku.baidu-int.com/knowledge/HFVrC7hq1Q/pKzJfZczuc/GUrlPrTtjQ/U-TFKonac1OKdT

- [ ] 通用规则包优化 https://ku.baidu-int.com/knowledge/HFVrC7hq1Q/pKzJfZczuc/GUrlPrTtjQ/TBjGq1InehXDgV

  - [ ] rule 编辑联想; rule 语法检测
  - [ ] feature、rule 联想 view&feature 时，online list+ casespace list，现在只有 online 

- [ ] 神盾：

  - [ ] 回写 block.status=3

  - [ ] 修改onlinemaster &service_id

- [ ] rule : 后端限制 variable 不为空；

- [ ] 提交 diff 的审批，没有手动撤回

- [ ] 空间审批 移动端 写一个 html 页面

## DX

- [ ] vscode eslint 不提示

- [ ] husky ✔

- [ ] go format + golint 🔥 (format为什么 commit 不生效)

- [ ] go debug

---

# 神盾

- 开关记录
  - fm.service:
    - function_switch : {"is_cache": true, "state_redis_name": true, "force_cache_false": false, "rule_block": false}
  - conf_second_project
    - function_switch : {"allow_urgent_skip": false}

---

1. 【稳定性🔥】

  - [ ] 上线时间缩短，屏蔽 执行中的实例 [AntiPlatform-1923] 【神盾平台】上线脚本修改，屏蔽执行中的实例

  - [ ] 实例挂掉后的监控

  - [ ] 特征中心前端的页面缓存：修改后后台仍返回 304 不符合预期

  - [ ] 服务管理的修改加入版本控制，修改后直接影响 feature&record 的 diff

  - [ ] 备流上线前的回滚检查细化

  - [ ] AS：删除 judge_base 时同步删除 policy.open_judge_productid

  - [ ] AS 紧急回滚

- 满意度

  - [ ] 策略批量修改
  - [ ] AS策略测试：支持多环境
  - [ ] 策略上线：
    - [ ] 语法检查；
    - [ ] 策略等配置查找效率：策略和代码查询优化，关联查询等
  - [ ] 模拟过滤：策略影响统计功能；推动数据支持更多流的模拟过滤

- 特征引用

  - [ ] Flink 支持 feature_name & 支持单个特征引用
  - [ ] 特征引用：引用类只解析 write,read, feature_id, view, care
    - [ ] AS：是否强判断了 feature_type
    - [ ] Flink:
      - [ ] 目前flink引用as特征仅支持动态词表类型，如果全部支持todo:
      - [ ] 1.神盾生成的配置只生成这 5 个字段
      - [ ] 2.flink适配默认逻辑：readFromRedis为true，writeToRedis为false的特征默认不累积

- 模拟过滤功能优化

  - [x] 模拟过滤功能集成，已开放使用
  - [ ] ~~配置转换: tm_flink：TM 配置转 Flink 情况摸底和模拟过滤方案设计~~
  - [ ] 功能点优化
    - [ ] 修复🔥：神盾上线过程中，接口无返回，会导致模拟过滤任务失败
    - [ ] 支持非 master 分支的 release jar 包
    - [ ] input 允许只有一种格式，并控制 afs/bp输入
    - [ ] 增量配置逻辑优化 [AntiPlatform-1898] 【神盾平台】flink模拟过滤策略增量配置文件生成逻辑优化
    - [ ] 手动操作时的状态细化
    - [ ] 测试 redis 开关， 控制读取特征
    - [ ] 模拟过滤、上线日志 格式化
    - [ ] 服务管理配置修改权限，增加类似 flink 管理员的权限

- Flink 上线

  - [ ] Flink上线托管所有工程操作，保证稳定性 [AntiPlatform-1971] 【神盾平台】flink工程上线平台化支持

- 错误检测：支持AntiService&Flink 配置检测，完善错误预警机制，提高策略上线效率

  - [ ] 配置检测
    - [ ] care 格式解析错误：
      - [ ] Flink：有单独的 care 配置检测模块，模拟过滤前/增加使用场景，直接调 jar 包即可。(模块功能待完善)
      - [ ] AS：care 解析模块? 不好打出单独的 bin
    - [ ] 特殊错误： 比如 flink 模拟过滤不支持空特征、动态词表等
    - [ ] 依赖错误: 平台前置检测 or 加载时后置发现
    - [ ] 加载时错误: AS 测试和 TM/Flink 模拟过滤
  - [ ] 错误预警机制：报警信息策略同学发现不及时
    - [ ] AS测试和备流：增加备流FATAL监控报警，抛到报警群
    - [ ] TM/Flink模拟过滤：错误抛到报警群，便于策略同学发现、以及相关工程同学协助定位错误

- record&dict

  - [x] 批量新增 record；配置模板？ => 大风控平台，搁置
  - [ ] 生产的特征，维度名， 选什么保存为什么
  - [ ] 排序错乱问题：数据库中上线后的 record & dict 会重新排序，导致与线上 conf 的不一致
    - [ ] 所有配置在 genarate 之前重新排序 🔥

- 特征

  - [ ] 引用特征的版本控制
  - [ ] 空间内 撤销 “创建和修改” 的特征时，update fm_feature.deleted
  - [ ] 批量导入特征： 检查,如果存在特征 opr_type ='update', 应该只检查线上特征。 现在是检查所有 ❎

- django 策略上线后，cache.clear() cache.clear_group 不正确

---

# DONE

- menu 刷新后的选中状态 ✅

- 删除 spot，报错：application 不允许 null ✅

- 规则包管理： 前端 ✅； 后端 ✖

- 修改规则包时，发起审批 ✅

- 提交 diff， 无 diff 时候不提交 ✅

- header：

- 用户 ✔

- 搜索 ✖ hold

- 侧边:

- children ✅

- 初始选中状态 ✅

- 首页: 一键开启 ✅

- anti_product_name 前缀的获取 ✔

- anti_product_name 前缀的回填 ✔

- 刷新后状态筛选没有保存 ✔

- 允许编辑： 已审批完成 ✔

- 允许修改状态： 已审批完成 ✔

- 产品左侧菜单栏写死了，需要动态获取。在 App.jsx里面调用，传递给 useAntdMenu ✔

- 进度条

- BUG: 上一次的多余的 record，会多出在下一次 ✔

- 产品线选择无法回填 ✔

- 列表：查询 bug ✔

- 布局

- 字体 ✔

- logo；favicon ✔

- 列表页面：分配 pm，修改状态的权限 ✔

- 用户登陆，登出 ✔

- 用户权限：

- model.action: usePermission('\*') ✔

- 路由？页面？ ✔

- 进度条

- 审批失败 ✔

- 状态不对 ✔

- 滚动条美化 ✔

- 编辑,管理 页面的审批状态判断 ✔

- 审批外链 ✔

- api message 不生效 ✔

- 管理页面

- 为什么anti_product_instances是全量信息? 处理提交时候的多余信息？ ✔

- 创建应用

- key 重复 ✔

- 创建后，进度变为失败 ✔

点击查看 ✔

参数空不展示 ✔； id 排序 ✔； 固定表头 ✔

bfe： 没有 bns，path，参数 ✔

管理页面参数筛选 ✔

toast ✔

页面表单块加背景 ✔
