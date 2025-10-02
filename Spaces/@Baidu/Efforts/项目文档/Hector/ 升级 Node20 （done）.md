---
title: Hector 升级 Node20 （done）
url: https://ku.baidu-int.com/knowledge/HFVrC7hq1Q/pKzJfZczuc/NWkxDSckt3/oUL1exHKg6_qn0
author: 
published: 
created: 2024-10-28
description: 如流知识库
tags:
  - clippings
---

## 需求开发
- iCafe：[\[AntiPlatform-2364\] 【P1】【ALL】【Hector】Node 版本升级](https://console.cloud.baidu-int.com/devops/icafe/issue/AntiPlatform-2364/show)

- 代码评审：

- [评审：AntiPlatform-2364 \[Story\] 【P1】【ALL】【Hector】Node 版本升级](https://console.cloud.baidu-int.com/devops/icode/repos/baidu/anti/hector/reviews/113332178/files)

- [评审：AntiPlatform-2364 \[Story\] 【P1】【ALL】【Hector】Node 版本校验](https://console.cloud.baidu-int.com/devops/icode/repos/baidu/anti/hector/reviews/113357980)


- 主要内容

- 升级 node20 版本

- 本地升级后 和 当前线上的所有产出进行diff

- 丰富测试，包括 7 种主要浏览器(Desktop Chromium，Desktop Chrome，Desktop Edge，Desktop Firefox，Desktop Safari，Android Chrome，IPhone Safari)的种植测试、主要特征的结果测试等，测试需 100% pass

- 建设后端日志监控 [Hector 报表建设](https://ku.baidu-int.com/knowledge/HFVrC7hq1Q/pKzJfZczuc/NWkxDSckt3/NUfMvkmKRzB2cI?source=137)

## 预上线
新增了 ipipe 流水线预上线环节，完全按照正式上线的部署环节，进行预发布。

使用预上线环境的产出进行下述的上线前测试。


## 上线前测试

hector 主要有两个大功能：

- 前端 sdk 落cookie

- 前端 sdk 收集环境数据，并加密发送到后端，后端进行解密落日志

**测试结果**

1. diff 所有产出的外链sdk

结果：分别下载了线上与预发布环境的所有外链 sdk，diff 完全一致

```bash
cd tests/diffnode jssdk.test.mjsdiff -r old new
```

![](https://rte.weiyun.baidu.com/wiki/attach/image/api/imageDownloadAddress?attachId=95e5e8c514014fd3b88b22b6232c437d&docGuid=oUL1exHKg6_qn0&sign=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiYXBwSWQiOjEsInVpZCI6IjRBVVFLYkw0ZmoiLCJkb2NJZCI6Im9VTDFleEhLZzZfcW4wIn0..PIxCIzNYNnyyjFMM.tfB-OuHQ9Vgtj8LpMkRhscHqrxI0-hvZdTIXKAWuFhgfKYTnfhGJv6YkEkI-YmBRYJM79MVQasMzuOnjzN3KWCDgxC754YLgtU6W2w_Rii-hP-v__0cnp096QBJ0nlYnPCgj33w2k5MiTmUlMFRg8jcUiCzSxWXLs5hWq_3Zt7eyfjaapjlOOc0nt2POR2NPX9WjbWansZB2W57pLM2Rv_o3Ug.V-iOXOPiIJY-dQA_46-H7A&x-bce-process=image/resize,m_lfit,w_960/ignore-error,i_1)

1. 预发布环境的前端 sdk e2e测试，验证 cookie 生成和数据收集

选择了 7 种常见浏览器做测试：Desktop Chromium，Desktop Chrome，Desktop Edge，Desktop Firefox，Desktop Safari，Android Chrome，IPhone Safari。

其中本次新增了 10 个特征用例，1 个数据采集用例。分别配对 7 个产品线、7 种浏览器的测试。共有用例 (10+1) \* 7 \* 7 = 539 个

结果：全部 pass

```bash
# 本地验证npm run test:dev# 线上验证# npm run test:prod
```

![](https://rte.weiyun.baidu.com/wiki/attach/image/api/imageDownloadAddress?attachId=a161028281c14297aa202c4b6654116a&docGuid=oUL1exHKg6_qn0&sign=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiYXBwSWQiOjEsInVpZCI6IjRBVVFLYkw0ZmoiLCJkb2NJZCI6Im9VTDFleEhLZzZfcW4wIn0..PIxCIzNYNnyyjFMM.tfB-OuHQ9Vgtj8LpMkRhscHqrxI0-hvZdTIXKAWuFhgfKYTnfhGJv6YkEkI-YmBRYJM79MVQasMzuOnjzN3KWCDgxC754YLgtU6W2w_Rii-hP-v__0cnp096QBJ0nlYnPCgj33w2k5MiTmUlMFRg8jcUiCzSxWXLs5hWq_3Zt7eyfjaapjlOOc0nt2POR2NPX9WjbWansZB2W57pLM2Rv_o3Ug.V-iOXOPiIJY-dQA_46-H7A&x-bce-process=image/resize,m_lfit,w_960/ignore-error,i_1)

1. 后台日志

上述 539 条功能测试，共落日志 1483。其中：

- 请求日志 819

- 10 个特征用例：

- 产生 10\* 7\*7 个测试用例，应落请求日志 490，实落 490，无误

- 有且仅有 pc，wise，pcAiAssistant, bcp 四个产品线使用了外链来收集数据，除了pcAiAssistant外的 3个产品线 各应落日志 10\* 7 = 70，共计实落 70\* 3=210，无误

- 1 个数据采集用例：

- 使用的是 pcAiAssistant 产品线，因此额外产生了 7\*7 条请求，该产品线应落日志 49 + 上面的 70，共计应落 119，实落 119，无误

![](https://rte.weiyun.baidu.com/wiki/attach/image/api/imageDownloadAddress?attachId=0f56792b684841dda483fd5054225381&docGuid=oUL1exHKg6_qn0&sign=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiYXBwSWQiOjEsInVpZCI6IjRBVVFLYkw0ZmoiLCJkb2NJZCI6Im9VTDFleEhLZzZfcW4wIn0..PIxCIzNYNnyyjFMM.tfB-OuHQ9Vgtj8LpMkRhscHqrxI0-hvZdTIXKAWuFhgfKYTnfhGJv6YkEkI-YmBRYJM79MVQasMzuOnjzN3KWCDgxC754YLgtU6W2w_Rii-hP-v__0cnp096QBJ0nlYnPCgj33w2k5MiTmUlMFRg8jcUiCzSxWXLs5hWq_3Zt7eyfjaapjlOOc0nt2POR2NPX9WjbWansZB2W57pLM2Rv_o3Ug.V-iOXOPiIJY-dQA_46-H7A)

- 采集数据的日志 664，其中：

- 没有 error 日志，无误

- type:etag 日志，应落490，实落 490，无误

- type:access 的正常日志，174。由于数据的收集和发送是异步的，单测期间可能未完全发出和返回，且有逻辑判断是否收集，所以数目不太match，但各产品线都能正常落盘。本次代码也未做任何修改，故认为正确。（数目问题见下一条）

- 重新修改数据收集的测试用例，修改为等待请求完全发出和返回之后才关闭。该测试用例应落收集日志 7\*7=49, 实落 49， 无误

以上保证日志数目完全无误。下面是日志示例，解密正常