---

kanban-plugin: basic

---

## 搁置

- [ ] flink 引用 AS，多 view方案设计：<br>	- feature_name like<br>	- view: uid1; uid2
- [ ] ==复用的维度diff：==<br>AS与flink TM 甚至AS各个流之间，因为redis_key依赖view_value，value需要根据view_name去拿，方案:<br>1. redis_key与view_value无关<br>2. view_name全局统一，比如 ua、userAgent、user_agent
- [ ] 神盾：线上feature、ferature管理风格统一聚合
- [ ] 割裂：复用的FE；非复用比如工程缓存、人工导入词表
- [ ] ocpc，trade的人工词典的func修改 string(1)？？<br><br><br>
- [ ] SELECT * FROM fm_feature where dict_generation_mode='manual' and content->'$.func' like "%RECORD%"
- [ ] AS复用TM特征更新，主要是普通feature<br>- [ ] TM所有流接入：只接空流，不接配置<br> - [ ]  配置迁移：AS中去除feature_source:TM和TM动态词典@[ocpc]
- [ ] ==引用TM时，从旧的TM库copy feature==<br>- [ ] 旧库查询到搜索的feature<br>- [ ] 复制到TM对应流，并加上write，redis<br>- [ ] 复用到当前流，加上read


## Backlog

- [ ] 批量导入脚本： 检查,如果存在特征 opr_type ='update', 应该只检查线上特征。 现在是检查所有 ✖
- [ ] view：生产的特征，维度名， 选什么保存为什么
- [ ] record 错乱问题：新的上线会把上一个单的 update 认为是线上，排序放到最后；但是线上的时之前当做 update ，排序时放到中间
- [ ] 特征：<br>- [ ]  引用特征的版本控制<br>- [ ]  空间内 撤销特征时，创建和修改时，update fm_feature deleted=1<br>- [ ] feature 的 view 偶发bug：场景 view 无法出现
- [ ] 模拟过滤<br>- [ ]  ==配置增量，feature、policy 找依赖<br>policy 过滤结果和线上过滤结果的区别==<br>- [ ]  ==模拟过滤必定报错==：<br>	- [ ]  有读写 redis 的 feature => redis 开关控制读取特征<br>- [ ]  ==模拟过滤、上线日志，有\n 但没换行==<br>- [ ] 新发加服务管理修改权限<br>- [ ] 调jar包  检查配置<br>- [ ] ==任务完成时间还是不对，手动 sql 时==<br>- [ ] 重新拉起运行中的任务：比如可能会因上线导致airflow任务失败，但flink 任务在跑
- [ ] ==上线脚本修改，实例屏蔽==； 上线过程屏蔽前端功能
- [ ] Flink优化<br>- [x] 模拟过滤接口报错<br>- [ ] flink管理员权限<br>- [ ] 支持批量导入 record<br>- [x] deploy_flink 增加 jar的展示 填写 分发<br>- [ ] 支持回滚部署： savepoint？？
- [ ] 去掉 缓存、state_redis 功能 开关 代码
- [ ] 去掉tradeservice两个批量场景的引用 feature
- [ ] 配置迁移遗留：<br>- [ ] trade的6个update，只有过期时间不一样。2个query。<br>- [ ] dynamic旧record不能下，有其他地方用到 (service.conf)<br>后面要把新的featurename改成旧的recordname ???


## Nextup

- [ ] 📚  [+TODO 神盾](X/Archive/@Baidu/Compass/+TODO.md#神盾)
- [ ] 📚  [+TODO 风控](X/Archive/@Baidu/Compass/+TODO.md#风控)
- [ ] https://console.cloud.baidu-int.com/devops/icafe/issue/AntiPlatform-2151/show?source=copy-shortcut


## 🧭 In Progress

- [ ] **✴️ iCafe**<br>- [风控](https://console.cloud.baidu-int.com/devops/icafe/space/AntiPlatform/planbox/964688/issue?viewId=22505&c=title%2CissueStatusId%2CcreateTime%2ClastModifiedTime%2CcreatorId%2C22797%2CresponsiblePeopleId%2CissueTypeId%2Csequence)<br>- [未计划卡片](https://console.cloud.baidu-int.com/devops/icafe/space/AntiPlatform/planbox/-1/issue?filters%5BissueTypeId%5D=&filters%5BissueStatusId%5D%21%21=3&filters%5BresponsiblePeopleId%5D=currentUser&filters%5B45788%5D=EMPTY&filters%5BisContainSubPlanBox%5D=&c=title%2Csequence%2CissueTypeId%2CissueStatusId%2CresponsiblePeopleId%2C22797%2CcreateTime%2C20008%2C23880%2C45788%2C210)
- [ ] **✴️ 排期**<br>- [周报](https://okr.baidu-int.com/pages/weekly.html#/home?mandatorId=s&isEdit=true)<br>- [通用规则包排期](https://ku.baidu-int.com/knowledge/HFVrC7hq1Q/pKzJfZczuc/GUrlPrTtjQ/4bd4217b7f194f)<br>- [业务接入排期表](https://ku.baidu-int.com/knowledge/HFVrC7hq1Q/pKzJfZczuc/GUrlPrTtjQ/63f78af07da046)
- [ ] bns =>  host
- [ ] ui 调整：接入，管理，创建成功 https://ku.baidu-int.com/knowledge/HFVrC7hq1Q/pKzJfZczuc/GUrlPrTtjQ/U-TFKonac1OKdT#ancho
- [ ] 通用规则包优化 [https://ku.baidu-int.com/knowledge/HFVrC7hq1Q/pKzJfZczuc/GUrlPrTtjQ/TBjGq1InehXDgV](https://ku.baidu-int.com/knowledge/HFVrC7hq1Q/pKzJfZczuc/GUrlPrTtjQ/TBjGq1InehXDgV)<br>- rule 编辑联想; rule 语法检测
- [ ] pid 和 bid 的联动，页面初始加载时候没有点选 pid
- [ ] 神盾:policy_id 重复时，自动提示可用的 最小policy_id
- [ ] 从 sql 查询 redis 命中，到底是哪个表，需要 service_name 吗


## Dev Done

- [x] 神盾回写<br>- [x] 两个上线完成的回写<br>- [x] onlinemaster 页面，加 &service_id
- [x] flink afs dict https://console.cloud.baidu-int.com/devops/icafe/issue/AntiPlatform-2135/show?source=copy-shortcut
- [x] get_ip_bns 拼接 ip 错误   ip,port:undefined<br>http://10.151.51.27:8564/#/job/running
- [x] open_judge不填写会错误
- [x] 新建、修改特征添加不上
- [x] BUG: featrue.js 空间内查到的 relation 包括 delete+create， 导致 delete 的数据覆盖了 create 的。比如 reuse_records


## Shipped

**完成**


***

## 归档

- [x] business_id自动分配以及全局校验功能<br><br>bfe??
- [x] 大风控兼容老 feature_name
- [x] rule_id 兼容旧的+6 位
- [x] - 大风控 规则 exempt 字段支持 （ 1 / 不开启）<br>- disposetag
- [x] 规则 id 自动分配
- [x] service_id 自动分配
- [x] queryhash
- [x] 勾选策略集的组件
- [x] 测试 conf; 测试 policy 分 block
- [x] 关闭跳过开关
- [x] one-anti-service 7个流的 deploy info
- [x] 合代码，deploy
- [x] ==拉会：dynamic.conf==<br>配置：is_reload;is_cache; value_type;data_type
- [x] ==维度相关的修改==<br>- [x] 维度只能新增，不可修改；维度保存为snake
- [x] record在空间内增加维度、record按钮
- [x] feature批量引用
- [x] 所有流：确定产品线+策略影响
- [x] redis界面管理
- [x] AS复用Flink特征更新，主要是动态词表<br>- [x] cvt, klun_pc, klun_wise、liuhe_log、ocpc_as_log、app_activate_log<br>- [x] click<br>- [x] 上新：clue；as：ocpc<br>- [x] 上新：growth_log、trade_log；as：trade<br>- [x] ocpc引用cvt测试新配置
- [x] 导入动态词表时候，增加featurename<br><br>- [x] trade有的prefix不是策略号+view：<br>40017，需要改数据库feature_name<br>- [x] 合并多余的policy转换<br>- [x] bug:  ==两个DI应该合并转换==，60059 - 60067
- [x] dump时 feature view要变成reuse_record，==而且还不能转camel==；<br>复用时，有reuse_records不检查view存在；<br>批量初始化时，要检查view是否存在<br>复用时，check线上存在
- [x] 周四先做： view_readfeature<br><br>dataview feature：id,name;  view:id,name,label<br><br><br>==referenceView;referenceFeaId;dataView==<br>哪些特征的哪些字段支持填写feature_id
- [x] 维度：<br>- [ ] ==bug：feature的view取场景的交集，最后和服务取并集==<br>- [ ] 维度，全部snake，只在flink camel； 分type，name，label
- [x] or 批量下线
- [x] 编辑和查看引用：==复用方维度的查看，各个地方==
- [x] FIXME：场景的view选择项！
- [x] 权限加强：flink管理员；服务管理 员；redis管理
- [x] 特征产出和引用文档
- [x] 策略上线<br>预览和构建; flink上线加上当前版本展示<br>policy提速<br>展示修改删除复用
- [x] writelog写不全的bug！
- [x] 空配置修改
- [x] 空间编辑、模拟过滤拦截其他用户；模拟过略修复状态，设置同步
- [x] findServiceReuseFeature: flink应该是feature_id
- [x] bugfix： flink导入脚本 record提示重复直接raise了！！
- [x] checklist文档；okr; 批量引入
- [x] bug：master合并；代码评审的模拟过滤
- [x] 文件rename权限问题,没有copy出tmp文件  =>  copy
- [x] 限制：featurename后缀大于一位数字
- [x] flink空单构建时会把空文件覆盖线上吗？不会
- [x] flink迁移脚本，流程方案
- [x] ocpc复用cvt测试新配置
- [x] ==拉会：trade distinct v1 批量迁移==
- [x] 跨场景复用 @{2023-02-21}
- [x] ==read  write 重构==<br>- [x] 空间列表查询，group by w&r<br>- [x] 不允许场景重复<br>- [x] 修改线上时，不修改复用<br>- [x] 前端动态词典等交互改造<br>- [x] 特征管理，在线特征展示统一聚合<br>- [x] 线上特征<br>- [x] 数据库：<br>		- [ ] f.w -> r.w；跨服务w=0<br>		- [ ] r.r: 动态词典0;feature_source 1;
- [x] dynamic 清理数据，func，write，manual
- [x] 「bug」多条流共用firstproject=226
- [x] 写AFS   不托管； 允许动态词典不写出
- [x] distinct version
- [x] 配置遗留问题: <br>- [x] arr_ser<br>- [x] fea_arr_combine_field<br>- [x] remain
- [x] AS所有流接入 + 配置迁移 @{2023-02-23}<br>- [x] ocpc, trade, combfe, common<br>- [x] click, bfp, content
- [x] rule、feature 模糊搜索 @{2023-02-21}
- [x] ~~OCPC冲突@qichao~~ @{2023-02-17}
- [x] 动态词典类强制开写Redis: <br>func 必选 ✅ <br>key_prefix可不填✅
- [x] AS下除动态词典类特征外其他特征不能开 写Redis; flink不做✅
- [x] AS下 segment 和 distinct 特征有 redis_name✅
- [x] 非dynamic默认只带redis_name的情况，有例外：harass_baiduid_black、harass_dvid_black、harass_imei_black  设置为动态词典特征，写入方式是 “人工” ✅
- [x] dynamic转record：record => feature 后record继续保留， care中改为或逻辑；dynamic name根据query; 二阶三方转feature: record删除    ✅
- [x] 神盾MPS内审 ✅
- [x] 开发支持<br>- [x] feature 跨场景复用<br>- [x] 数据库读写redis字段重构<br>- [x] feature 从旧TM数据库复制和引用特征<br>- [x] 一键转换 dynamic_dict.conf中的词典
- [ ] [[流接入更新计划]]
- [x] Flink优化：<br>- [x] 测试空配置;  <br>- [x] ==jar版本自动化==<br>- [x] 文档修改<br>- [ ] record托管?
- [x] 神盾使用文档； ==Flink上线文档修改！==
- [x] dynamic & write=0合并？？<br>工程缓存拆分两条，这样所有read=1的只需要query_string。
- [x] AS 上线提速<br>- judge 拆分<br>-  judge 部署<br>-  测试环境 ✅ 2024-03-06
- [x] 单实例状态异常，下掉 cache 功能@周三前<br>- [x]  禁用功能上线<br>- [x]  分服务上线存量禁用：<br>	- [x]  trade<br>	- [x]  ocpc
- [x] 词表问题：<br>- [x] 词表 kv 结构的显示; 词表搜中文出错
- [x] 特征可视化：转所有动态词表特征到词表<br>- [x] 活动，电商<br>- [ ] other
- [x] 词表配置项https://console.cloud.baidu-int.com/devops/icafe/issue/AntiPlatform-2136/show?source=copy-shortcut

%% kanban:settings
```
{"kanban-plugin":"basic","show-checkboxes":true,"tag-colors":[{"tagKey":"","color":"","backgroundColor":""}],"lane-width":380,"new-line-trigger":"shift-enter","show-relative-date":true,"hide-date-in-title":true,"date-picker-week-start":1,"new-card-insertion-method":"append"}
```
%%