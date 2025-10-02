---
title: Hector 上线 checklist
tags:
  - clippings
url: https://ku.baidu-int.com/knowledge/HFVrC7hq1Q/pKzJfZczuc/GUrlPrTtjQ/98kRp0Tg8BEUNI
author: 
published: 
created: 2024-10-28
description: 如流知识库
---
- 完整版上线规范详见：[[Hector 上线流程规范]]

- 上线记录可参考：[[Hector 升级 Node20 （done）]]


## 工程开发测试

- RD 开发自测

- 增加新代码测试用例： /tests/core

- 线下开发环境，通过所有测试用例：

- 预发布环境测试

- changepipe 流水线中，部署代码到预发布环境

- 🌟 切换预发布环境，通过所有测试用例：

- 代码合入，发布新版本


## 小流量上线

如果更改旧代码，需要看线上影响，先进行小流量测试；如果只是新增特征，理论上不需要

- 周知 lu 对接人：yaoshuangji@baidu.com

- 工程代码修改 lu 小流量到新版本

- ANTI上线通报

- 检查上线版本一致

- 推全 100%

- 🌟 后端日志服务监控报表正常：﻿[链接](https://console.cloud.baidu-int.com/mtgrafana/p/d/cn504FCSz/ri-zhi-cai-ji-jian-kong?orgId=265&refresh=1m)

- 🌟 刷新cdn (只刷新 lu 小流量)

```java
https://hectorstatic.baidu.com/d94e62c13d641aa7.js?v=1http://hectorstatic.baidu.com/d94e62c13d641aa7.js?v=1
```

- 🌟 线上回归测试，通过全部测试用例

- 🌟 同步策略同学，观察线上策略和特征波动。

- 版本覆盖率：如果新增了版本，可以查询下版本的覆盖率 （有延迟，次日查看）

- Sugar 报表查看新版本覆盖率：﻿[Hector 分析](https://sugar.baidu-int.com/group/Anti-Policy/report/r_1013e-bmswfdro-1nrm3k?__scp__=Baidu&conditions=%7B%22dateRange%22%3A%222024-04-23%2C2024-04-24%22%2C%22product%22%3A%5B%22pc%22%2C%22wise%22%2C%22lu%22%2C%22bcp%22%2C%22sjh%22%5D%2C%22isCpm%22%3A%5B%221%22%2C%220%22%5D%2C%22dateGranularity%22%3A%22hour%22%7D)

- 一脉查询采集表特征覆盖率

- anti\_ods\_hector\_log\_hour，(udw\_ns.default.anti\_ods\_hector\_log\_hour) 落表有 3h 左右的延迟

如查询版本 30、31总量，版本 31下的某特征命中量

```sql
select  count(1) total,  sum(case when (hector like '%1s' or hector like '%1t') then 1 else 0 end) v_30,  sum(case when (hector like '%1u' or hector like '%1v') then 1 else 0 end) v_31from  anti_ods_hector_log_hourwhere  event_day = '20240508'  and hector is not null and hector != '-' and hector != ''  and product = 'lu';select  count(1) total,  sum(if (get_json_object(anti_hector (hector), '$.features.37') = '1', 1, 0)) hector_hit_37,from  anti_ods_hector_log_hourwhere  event_day = '20240705' and event_hour='18'  and hector is not null and hector != '-' and hector != ''  and get_json_object(anti_hector (hector), '$.version') = '31';
```


## 正式上线
- 搜索产品部邮件审批

- 工程代码修改所有产品线到新版本

- ANTI上线通报

- 检查上线版本一致

- 🌟 勾选每 10% 上线暂停，在上线到 10%，40%， 100% 节点时暂停，分三次进行下面所有步骤。

- 【注】由于很多策略报表有延迟，可以当日只最多上线到 40%， 次日验证报表后再进行 100% 推全。

- 🌟 后端日志服务监控报表正常：﻿[链接](https://console.cloud.baidu-int.com/mtgrafana/p/d/cn504FCSz/ri-zhi-cai-ji-jian-kong?orgId=265&refresh=1m)

- 🌟 刷新cdn

- 🌟 线上回归测试，通过全部测试用例

- 群内同步，策略同学观察线上策略和特征波动。

- 版本覆盖率：如果新增了版本，可以查询下版本的覆盖率 （有延迟，次日查看）

- Sugar 报表查看新版本覆盖率：﻿[Hector 分析](https://sugar.baidu-int.com/group/Anti-Policy/report/r_1013e-bmswfdro-1nrm3k?__scp__=Baidu&conditions=%7B%22dateRange%22%3A%222024-04-23%2C2024-04-24%22%2C%22product%22%3A%5B%22pc%22%2C%22wise%22%2C%22lu%22%2C%22bcp%22%2C%22sjh%22%5D%2C%22isCpm%22%3A%5B%221%22%2C%220%22%5D%2C%22dateGranularity%22%3A%22hour%22%7D)

- 一脉查询采集表特征覆盖率

- anti\_ods\_hector\_log\_hour，(udw\_ns.default.anti\_ods\_hector\_log\_hour) 落表有 3h 左右的延迟

如查询版本 30、31总量，版本 31下的某特征命中量

```sql
select  count(1) total,  sum(case when (hector like '%1s' or hector like '%1t') then 1 else 0 end) v_30,  sum(case when (hector like '%1u' or hector like '%1v') then 1 else 0 end) v_31from  anti_ods_hector_log_hourwhere  event_day = '20240508'  and hector is not null and hector != '-' and hector != ''  and product = 'lu';select  count(1) total,  sum(if (get_json_object(anti_hector (hector), '$.features.37') = '1', 1, 0)) hector_hit_37,from  anti_ods_hector_log_hourwhere  event_day = '20240705' and event_hour='18'  and hector is not null and hector != '-' and hector != ''  and get_json_object(anti_hector (hector), '$.version') = '31';
```

## 上线后策略观察

小流量上线完毕、以及正式上线的三个节点(10%, 40%,100%)，共四个节点都需要观察

﻿@于亚男﻿﻿

- 凤巢同比环比（滤前点击、滤前消费、滤后点击、滤后消费、点击过滤比例、消费过滤比例）是否有明显波动

- 原生同比环比（滤前点击、滤前消费、滤后点击、滤后消费、点击过滤比例、消费过滤比例）是否有明显波动

**10%~40%**

- 凤巢同比环比（滤前点击、滤前消费、滤后点击、滤后消费、点击过滤比例、消费过滤比例）是否有明显波动

- 原生同比环比（滤前点击、滤前消费、滤后点击、滤后消费、点击过滤比例、消费过滤比例）是否有明显波动

- hector线上策略是否有波动

当前线上hector策略：15756001,15756031,15756041,15756181,15756301,15756381,15756461,15756491,15756511,15756501,15755901,4104101,15756571,15756551

- 特征命中是否符合预期

- 上线新特征命中流量是否符合预期（命中量级和Top cntname、cmatch、ua是否有聚集）

```sql
-- 查询某一个特征命中的Top 计费名select cntname, count(1) as clk, sum(price/100) as prices,count(if(hector_decode['61']='1', 1, null)) as h_clk,sum(if(hector_decode['61']='1', price/100, 0)) as h_price,count(if(hector_decode['61']='1' and believe = '10000', 1, null)) as h_n_clk,sum(if(hector_decode['61']='1' and believe = '10000', price/100, 0)) as h_n_pricefrom anti.click_logwhere event_day = '2024-06-30'and drate != '11'and accessid = '1'group by cntnameorder by h_n_price desc
```

- 新版本version是否更新成功

```sql
select event_hour, get_json_object(anti_hector (hector), '$.version'), IFNULL(count(1),0) as numfrom udw_ns.default.anti_ods_hector_log_hourwhere event_day = '20240327'and get_json_object(anti_hector (hector), '$.version') in ('30', '31')and event_hour > '15'group by event_hour, get_json_object(anti_hector (hector), '$.version')
```

观察后记得群里同步！

**100%** （40% -> 100% 推全会在第二天进行）

- 凤巢同比环比（滤前点击、滤前消费、滤后点击、滤后消费、点击过滤比例、消费过滤比例）是否有明显波动

- 原生同比环比（滤前点击、滤前消费、滤后点击、滤后消费、点击过滤比例、消费过滤比例）是否有明显波动

- hector线上策略是否有波动

线上hector策略：15756001,15756031,15756041,15756181,15756301,15756381,15756461,15756491,15756511,15756501,15755901,4104101,15756571,15756551

- 特征命中是否符合预期

- 上线新特征命中流量是否符合预期（命中量级和Top cntname、cmatch、ua是否有聚集）

- 新版本version是否更新成功

- 观察安全侧监控 - 特征采集趋势是否有波动（T+1延迟，第二天观察前一天40%上线时波动情况）

![](https://rte.weiyun.baidu.com/wiki/attach/image/api/imageDownloadAddress?attachId=864a4b6b53ef4f1d853f309b40d9bb82&docGuid=98kRp0Tg8BEUNI&sign=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiYXBwSWQiOjEsInVpZCI6IjRBVVFLYkw0ZmoiLCJkb2NJZCI6Ijk4a1JwMFRnOEJFVU5JIn0..9mtjBiM68JbpMqkp.KwZ8qcbLmUOxo_iN8McshMa4uVgOHBDhmFp-PkDPrbbXrG-Lkr8rAu7dOde-dF9qo6xivoH8GOi2sxx9H7SgMT7nrw1UXHBxRmY6xLO0JBPvAeL2-ox1epqfbu9UmmSCEYFhMc3_E2G6NSqVdmUNMaspThUS1X4z2wOQ1XUlNOop0e8vUJfOUVNfcSO_hxrSKPPUaJNc2B99Ade0QDf83glckA.LcP-09ai_jepuALHqcUPHQ)

观察后记得群里同步！