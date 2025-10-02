---
title: "flink过滤框架配置方法（适配特征中心版本）"
url: "https://ku.baidu-int.com/knowledge/HFVrC7hq1Q/pKzJfZczuc/GUrlPrTtjQ/T_XTwp5rrdBL31#anchor-20e81f40-6719-11ed-8358-c774cbb6e715"
author:
published:
created: 2025-02-19
description: "如流知识库"
tags:
  - "clippings"
---
AI

通用

布局

文本格式

数据表

图表

功能卡片（插入后会切换到卡片视图）

第三方应用

**需要配置啥**：flink版的特征服务配置与原tm类似，你需要配置：

- feature.conf

- policy.conf

- dict.conf

- model.conf

- judge.conf

- 不用再配置record.conf

在flink的实现中，一种日志就是一个Java类，日志的所有字段都是类的字段，如果要添加字段，找工程提需求，或者在代码中自己开发。

**关于格式**：

- flink 配置化文件采用yaml的文件格式，对于你写好的yaml，可以在﻿[**https://yamlchecker.com**](https://yamlchecker.com/)﻿检查下。

- 字段命名采用**驼峰表达式**。如字段baiduid\_fresh, 现在写作 baiduidFresh

**怎么上线：**

神盾平台上线：

1.通过神盾平台更改配置策略文件并上线，无需工程操作

       与Themis基本保持一致。但是有些暂不支持

<table><colgroup><col width="57"><col width="290"><col width="553"></colgroup><tbody><tr><td colspan="1" rowspan="1"><div><p><span><span><span>运算符</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>示例格式</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>含义</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>:=</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span><span>"'actId':='123','456'"</span></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>维度值等于右值</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>!=</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span><span>"'actId'!='100','200'"</span></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>维度值不等于右值( 维度值不存在时 也会满足条件 返回true)</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>:&gt;</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span><span>"'channel':&gt;'2'"</span></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>维度值大于右值</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>:&lt;</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span><span>"'uid':&lt;'9999'"</span></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>维度值小于右值</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>&gt;=</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span><span>"'uid'&gt;='1000'"</span></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>维度值大于等于右值</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>&lt;=</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span><span>"'uid'&lt;='9999'"</span></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>维度值小于等于右值</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span><strong><span>:&amp;</span></strong></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span><span>"'logid':&amp;'10800000000000'"</span></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>stat_flag专用，</span></span></span></p><p><span><span><span><span>left &amp; right = right</span></span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>:|</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>略</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span><span>stagflag :| (left &amp; right) != 0;</span></span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>!&amp;</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>略</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span><span>stagflag !&amp; (left &amp; right) == 0;</span></span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>!|</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>略</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span><span>stagflag !| (left &amp; right) != right;</span></span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>IN or NI</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>‘cnt’IN‘cnt_file’</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>维度值in or not in词表文件</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>HA</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span><span>"'channel'HA"</span></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>维度值存在</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>NH</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span><span>"'ipCity'NH"</span></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>维度值不存在</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>:~</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span><span>"'ipCity':~'北京','天津','南阳'"</span></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>维度值是否匹配子字符串,如当ipCity等于【北京市】的时候，该条件为true，即右值是左值的子串。</span></span></span></p><p><span><span><span>left.contains(r)则返回true</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>!~</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span><span>"'ipCity'!~'天津','南阳'"</span></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>维度值是否匹配子字符串</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>EQ</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span><span>"'ipCity'EQ'mobCity'"</span></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>两个维度值是否相等</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>NE</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span><span>"'ipCity'NE'mobCity'"</span></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>两个维度值是否相等</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>:C or !C</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span><span>"'mobCity':C'天津','北京'"</span></span></span></span></p><p><span><span><span><span>"'mobCity'!C'天津','北京'"</span></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span><span>mobCity</span></span></span></span><span><span><span>是否等于</span></span></span></p><p><span><span><span><span>'天津'或者'北京'</span></span></span></span></p><p><span><span><span>r.equals(leftString)则返回true</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>VA , IV</span></span></span></p></div></td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"><div><p><span><span><span><strong><span>暂不支持</span></strong></span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span><span>IL，NL</span></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span><span>'mobile' IL 'mobile_sub_3'</span></span></span></span></p><p><span><span><span><strong><span>注意左右两边都是字段名字</span></strong></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>左边的字段对应的值是否包含右边字段对应的值</span></span></span></p><p><span><span><span>IL包含</span></span></span></p><p><span><span><span>NL不包含</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span><span>:^</span></span></span></span></p><p><span><span><span>!^</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span><span>'ip':^'10'</span></span></span></span></p><p><span><span><span><span>'ip'!^'10'</span></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>ip是否以10开头</span></span></span></p><p><span><span><span>ip是否不以10开头</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span><span>:$</span></span></span></span></p><p><span><span><span>!$</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span><span>'ip':$'10'</span></span></span></span></p><p><span><span><span><span>'ip'!$'10'</span></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>ip是否以10结尾</span></span></span></p><p><span><span><span>ip是否不以10结尾</span></span></span></p></div></td></tr></tbody></table>

注意：

1.care里边支持viewValue是中文如： "'mobCity':C'天津','北京'"

2.care支持括号来调整优先级如：(\['actId':='123','456'\]\['channel':='2000'\])||(\['ipCity'!='北京市'\]\['ua'HA\])

3.维度值本身不支持包含英文逗号这个特殊字符，如\['phone' !~ ','\]，在解析care条件右值的时候会按照逗号进行字符串切分，如果数据本身就有逗号会导致解析错误。

4.维度值本身不自持包含care运算符本身，比如\['ua':='NE'\]，此处NE是care运算符。

5.!= =: !~ ~:等运算符左值支持各种类型，计算时会将左值按照java的toString方法进行转换，按照字符串匹配

### 

2.1.2 feature的care条件配置注意事项

如果readFromRedis: "true" 则该特征的care配置中只能使用字段解析得到的字段。该特征会在抽取特征阶段之前从Redis读取。

如果readFromRedis: "false" 则该特征的care配置即可以使用字段解析得到的字段，也可以将从redis抽取的外部字段作为care条件和维度进行累积。

整个flink数据处理流程如下：

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="421px" height="911px" viewBox="-0.5 -0.5 421 911"><defs></defs><g><path d="M 190 150 L 190 170 L 190 160 L 190 173.63" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 190 178.88 L 186.5 171.88 L 190 173.63 L 193.5 171.88 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all"></path><rect x="130" y="90" width="120" height="60" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"></foreignObject><text x="190" y="124" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle">log</text></switch></g><path d="M 340 210 L 256.37 210" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 251.12 210 L 258.12 206.5 L 256.37 210 L 258.12 213.5 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all"></path><path d="M 330 230 L 350 190 L 420 190 L 400 230 Z" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all"></path><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"></foreignObject><text x="375" y="214" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle">redis</text></switch></g><path d="M 190 240 Q 190 240 190 273.63" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 190 278.88 L 186.5 271.88 L 190 273.63 L 193.5 271.88 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all"></path><rect x="130" y="180" width="120" height="60" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"></foreignObject><text x="190" y="214" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle">log + RedisFeature</text></switch></g><path d="M 190 60 L 190 80 L 190 70 L 190 83.63" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 190 88.88 L 186.5 81.88 L 190 83.63 L 193.5 81.88 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all"></path><rect x="130" y="0" width="120" height="60" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"></foreignObject><text x="190" y="34" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle">外部日志 BP/AFS</text></switch></g><rect x="191" y="60" width="40" height="20" fill="none" stroke="none" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"></foreignObject><text x="211" y="74" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle">读取</text></switch></g><rect x="131" y="60" width="60" height="20" fill="none" stroke="none" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"></foreignObject><text x="161" y="74" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle">字段解析</text></switch></g><rect x="252" y="181" width="100" height="30" fill="none" stroke="none" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"></foreignObject><text x="254" y="200" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px">抽取外部特征fea</text></switch></g><path d="M 190 340 Q 190 365 260 365 Q 330 365 330 383.63" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 330 388.88 L 326.5 381.88 L 330 383.63 L 333.5 381.88 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all"></path><path d="M 190 340 Q 190 365 125 365 Q 60 365 60 383.63" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 60 388.88 L 56.5 381.88 L 60 383.63 L 63.5 381.88 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all"></path><rect x="130" y="280" width="120" height="60" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div data-drawio-colors="color: rgb(0, 0, 0); " xmlns="http://www.w3.org/1999/xhtml"><p>log + RedisFeature&nbsp;+ extractFea</p></div></foreignObject><text x="190" y="314" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle">log + RedisFeature&nbsp;+...</text></switch></g><rect x="191" y="250" width="130" height="20" fill="none" stroke="none" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"></foreignObject><text x="256" y="264" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle">根据care条件抽取特征</text></switch></g><path d="M 60 450 Q 60 450 60 483.63" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 60 488.88 L 56.5 481.88 L 60 483.63 L 63.5 481.88 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all"></path><rect x="0" y="390" width="120" height="60" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"></foreignObject><text x="60" y="424" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle">extractFea</text></switch></g><path d="M 330 450 Q 330 505 260 505 Q 190 505 190 553.63" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 190 558.88 L 186.5 551.88 L 190 553.63 L 193.5 551.88 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all"></path><rect x="270" y="390" width="120" height="60" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"></foreignObject><text x="330" y="424" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle">log + RedisFeature</text></switch></g><path d="M 120 520 Q 183.6 520 183.63 552.09" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 183.64 557.34 L 180.13 550.35 L 183.63 552.09 L 187.13 550.34 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all"></path><rect x="0" y="490" width="120" height="60" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"></foreignObject><text x="60" y="524" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle">extractFea</text></switch></g><rect x="60" y="455" width="60" height="20" fill="none" stroke="none" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"></foreignObject><text x="90" y="469" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle">特征累积</text></switch></g><path d="M 190 580 Q 190 600 190 595 Q 190 590 190 603.63" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 190 608.88 L 186.5 601.88 L 190 603.63 L 193.5 601.88 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all"></path><path d="M 190 670 Q 190 670 190 713.63" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 190 718.88 L 186.5 711.88 L 190 713.63 L 193.5 711.88 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all"></path><rect x="130" y="610" width="120" height="60" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div data-drawio-colors="color: rgb(0, 0, 0); " xmlns="http://www.w3.org/1999/xhtml"><p>log + features + RedisFeature</p></div></foreignObject><text x="190" y="644" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle">log + features + Red...</text></switch></g><path d="M 300 640 Q 300 640 256.37 640" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 251.12 640 L 258.12 636.5 L 256.37 640 L 258.12 643.5 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all"></path><rect x="300" y="610" width="120" height="60" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"></foreignObject><text x="360" y="644" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle">afterJoinFea</text></switch></g><path d="M 190 780 Q 190 815 130 815 Q 70 815 70 843.63" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 70 848.88 L 66.5 841.88 L 70 843.63 L 73.5 841.88 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all"></path><path d="M 190 780 Q 190 815 259 815 Q 328 815 328 843.63" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 328 848.88 L 324.5 841.88 L 328 843.63 L 331.5 841.88 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all"></path><rect x="130" y="720" width="120" height="60" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div data-drawio-colors="color: rgb(0, 0, 0); " xmlns="http://www.w3.org/1999/xhtml"><p>log + features + RedisFeature&nbsp;+ policyResult</p></div></foreignObject><text x="190" y="754" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle">log + features + Red...</text></switch></g><rect x="130" y="690" width="60" height="20" fill="none" stroke="none" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"></foreignObject><text x="160" y="704" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle">策略判定</text></switch></g><path d="M 300 750 Q 300 750 256.37 750" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 251.12 750 L 258.12 746.5 L 256.37 750 L 258.12 753.5 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all"></path><rect x="300" y="720" width="120" height="60" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"></foreignObject><text x="360" y="754" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle">afterpolicyFea</text></switch></g><rect x="10" y="850" width="120" height="60" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"></foreignObject><text x="70" y="884" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle">UDW...</text></switch></g><rect x="90" y="820" width="60" height="20" fill="none" stroke="none" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"></foreignObject><text x="120" y="834" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle">数据落盘</text></switch></g><rect x="175" y="560" width="30" height="20" fill="#f5f5f5" stroke="none" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"></foreignObject><text x="190" y="574" fill="#333333" font-family="Helvetica" font-size="12px" text-anchor="middle">join</text></switch></g><rect x="268" y="850" width="120" height="60" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"></foreignObject><text x="328" y="884" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle">redis</text></switch></g><rect x="220" y="816" width="80" height="20" fill="none" stroke="none" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"></foreignObject><text x="260" y="830" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle">特征写redis</text></switch></g></g><switch><g requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"></g><a transform="translate(0,-5)" xlink:href="https://www.diagrams.net/doc/faq/svg-export-text-problems" target="_blank"><text text-anchor="middle" font-size="10px" x="50%" y="100%">Text is not SVG - cannot display</text></a></switch></svg>

![](https://ku.baidu-int.com/58cf66ad-0ff7-43f7-bce8-cb3bef5e6597)

名词解释

RedisFeature: 所有配置readFromRedis为true的都将从redis进行读取，作为RedisFeature

extractFea: 所有featureType不是"calculation"、 "dynamic\_dict"、distribution\_distance、concentration\_ratio 的特征是extractFea，需要在抽取阶段抽取

afterJoinFea: featureType是 "calculation"、distribution\_distance、concentration\_ratio的特征是afterJoinFea，在此阶段进行计算

afterPolicyFea: featureType是dynamic\_dict的特征，afterPolicyFea是在judge完后进行计算的，根据是否命中某些特征等care条件的配置，觉得是否写动态词表

flink目前所有的支持的feature类型如下：

<table><colgroup><col width="279"><col width="433"></colgroup><tbody><tr><td colspan="1" rowspan="1"><div><p><span><span><span>特征类型</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>含义</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span><strong><span>segment</span></strong></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>窗口内view出现次数</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span><strong><span>distinct</span></strong></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>窗口内view维度下dataView的去重数量</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span><strong><span>sum_segment</span></strong></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>窗口内view维度下dataView的值的求和</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span><strong><span>max</span></strong></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>窗口内view维度下dataView的最大值</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span><strong><span>min</span></strong></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>窗口内view维度下dataView的最小值</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span><strong><span>avg</span></strong></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>窗口内view维度下dataView的平均值</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span><strong><span>concentration</span></strong></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>窗口内view维度下出现次数最多的k个dataView</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span><strong><span>distribution</span></strong></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>窗口内view维度下dataView的分布情况</span></span></span></p><p><span><span><span>(根据dataView的具体的值来决定进入哪个分桶)</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span><strong><span>distinct_distribution</span></strong></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>窗口内view维度下dataView的分布情况</span></span></span></p><p><span><span><span>(根据dataView的窗口内出现次数来决定进入哪个分桶)</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span><strong><span>count_distribution</span></strong></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>窗口内view维度下dataView的分布情况</span></span></span></p><p><span><span><span>(根据dataView下的cumulateView的distinct值来决定进入哪个分桶）</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span><strong><span>dynamic_dict</span></strong></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>动态词表，将某个具体的字段写入redis</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span><strong><span>calculation</span></strong></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>根据其他字段和特征值进行运算得到的新的特征值</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span><strong><span>distribution_distance</span></strong></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>返回分布特征的与标准分布的距离，计算失败返回-1</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span><strong><span>concentration_ratio</span></strong></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>返回集中特征的topk占总数的比例，计算失败返回-1</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span><strong><span>sequence</span></strong></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>序列特征</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span><strong><span>ratio</span></strong></span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>比例特征，在care条件下，满足filter条件的比例</span></span></span></p></div></td></tr></tbody></table>

一个完整的只包含一个feature的feature.yaml配置文件如下所示：

```java
feaList: "1001"features:  # 一周内用户下回答数，5分钟滑动一次,频控  - featureType: "distinct"    featureId: "1001"    view: "replyUid"    dataView: "replyId"    stepLength: 120    windowLength: 86400    windowType: "time"    care: "[*]"    accMode: "iterative" # iterative:精准模式，每条更新一次累积值。incremental：小批模式，可能多条更新一次累积值。    writeToRedis: "false" # 特征值需要写入redis，二阶特征中使用    readFromRedis: "false" # 提前读取redis中特征值到record中，特征抽取和统计阶段就可以作为一个普通维度使用，二阶特征是一种典型应用场景
```

1. feaList配置项，表示生效的特征，每个特征用featureId来表示。 一个文件里只能有一个（和原来不同）**不****要忘记配置feaList！！！！**

1. features表示具体的feature配置，每一个feature用一个数组表示，前面用 - 开头（yaml的语法）。

1. 对于每一个配置项，value与冒号之间必须有一个空格。

1. yaml对value类型的检查时自动的，所以对于featureId这种以数字表示的value必须加引号表示为string,否则会被认定为数字类型。如果需要特别标注类型的，可以参考【**强制类型转换**】一节

读写redis的key的构造逻辑完全一致。

如果配置了readFromRedis: "true":

则在特征抽取之前会将所有的readFromRedis: "true"的特征从Redis进行读取。

读取到的特征可以在其他特征中作为view、dataVeiw、care、cumulateView中的字段使用。

读取Redis的key如下：

```java
查询redisKey的构造逻辑：String redisKey = "dict_" + featureInfo.getFeatureId() + "_" + SecurityUtil.createSignMd64(logPoJo.get(featureInfo.getView()));
```

如果配置了writeToRedis: "true":

则在累积完成后将改特征的累积结果写到Redis，写Redis的key的格式如下，value位累计结果：

```java
读取redisKey的逻辑:String redisKey = "dict_" + featurePoJo.getFeatureId() + "_" + SecurityUtil.createSignMd64(featurePoJo.getViewValue());
```

如果一个特征即从redis读取，也在flink内部进行计算。

那么在特征抽取阶段使用的是外部的结果，在计算calculation、dynamic\_dict特征值和进行策略判定的时候将会使用最新的flink内部的计算值。

segment特征没有dataView

```java
  - featureType: "segment"// 特征类型    featureId: "1006"    view: "replyUid"    windowType: "time"    stepLength: 3600    windowLength: 3600    care: "[*]"    writeToRedis: "false" # 特征值需要写入redis，二阶特征中使用    readFromRedis: "false" # 提前读取特征值到record中，特征抽取和统计阶段就可以作为一个普通维度使用
```

#### 

distinct、sum\_segment、max、min、avg

这几类特征除了featureType不同之外其余配置要求均相同，都需要配置dataView。

```java
  - featureType: "distinct"// 特征类型    featureId: "1002"    view: "replyUid"    dataView: "replyId"    windowType: "time"    stepLength: 3600    windowLength: 3600    care: "[*]"    writeToRedis: "false" # 特征值需要写入redis，二阶特征中使用    readFromRedis: "false" # 提前读取特征值到record中，特征抽取和统计阶段就可以作为一个普通维度使用
```

各个配置项的解释如下：

```yaml
  - featureType: 'concentration'    view: 'actId'    dataView: 'mobileSub3'    top: 5    windowType: 'time'    stepLength: 3600    windowLength: 7200    care: "['actId':='50446']"    featureId: '1005'    writeToRedis: "true"
```

配置示例：

```java
  - featureType: 'concentration_ratio' // 特征类型    view: 'actId,mobileSub3' // 特征类型 写redis词表的view    dataView: 'mobileSub3' // 对应集中度特征的dataView 用于判断dataView是否是topK之一    referenceFeaId: "1005" // 计算集中度需要引用的featureID 对应集中度特征的featureId    remainNumerator: 10 // 分子remain值，即只有分子大于reamin值才进行后续计算，否则返回ILLEGAL_FEA_RESULT  （不配置则不生效）    remainDenominator: 10 // 分母remain值，即只有分母大于reamin值才进行后续计算，否则返回ILLEGAL_FEA_RESULT（不配置则不生效）    requireHitFilter: true  // 是否要求当前日志的dataView是topk之一 没有配置则为false  原TMfilterMode    featureId: '1006'
```

#### 

distinct\_distribution、count\_distribution

分布特征，用于计算特征累计值与基准分布的距离，支持支持chiSquareTest、maxDiff、chiSquareDis、klDivergence四种距离函数。各个配置项解释参考配置示例。

配置示例：

```java
  - featureId: "1005"    featureType: "distinct_distribution"// 特征类型    view: "replyUid"    dataView: "replyId"    cumulateView: "consumeId" // 必填    intervalEndpoints: '100,100000'    windowType: "time"    stepLength: 600    windowLength: 604800    care: "[*]"    writeToRedis: "false" # 特征值需要写入redis，二阶特征中使用    readFromRedis: "false" # 提前读取特征值到record中，特征抽取和统计阶段就可以作为一个普通维度使用  - featureId: "1005"    featureType: "count_distribution"// 特征类型    view: "replyUid"    dataView: "replyId"    intervalEndpoints: '100,100000'    windowType: "time"    stepLength: 600    windowLength: 604800    care: "[*]"    writeToRedis: "false" # 特征值需要写入redis，二阶特征中使用    readFromRedis: "false" # 提前读取特征值到record中，特征抽取和统计阶段就可以作为一个普通维度使用
```

配置示例：

```java
  - featureId: "1005"    featureType: "distribution"// 特征类型    view: "replyUid"    dataView: "replyId"    intervalEndpoints: '100,100000'    windowType: "time"    stepLength: 600    windowLength: 604800    writeToRedis: "false" # 特征值需要写入redis，二阶特征中使用    readFromRedis: "false" # 提前读取特征值到record中，特征抽取和统计阶段就可以作为一个普通维度使用
```

用于计算特征累计值与基准分布的距离，支持支持chiSquareTest、maxDiff、chiSquareDis、klDivergence四种距离函数。各个配置项解释参考配置示例。

下边是基于一条distinct\_distribution和一条distinct特征计算distribution\_distance的配置示例：

对于distribution\_distance特征还需要配置一条distinct才能计算distribution\_distance

```yaml
  - featureId﻿: "1001"    featureType﻿: "distinct_distribution"// 特征类型    view﻿: "actId"    dataView﻿: "replyId"    cumulateView﻿: "uid" // 必填    intervalEndpoints﻿: '100,100000'    windowType﻿: "time"    stepLength﻿: 600    windowLength﻿: 604800    care﻿: "[*]"    writeToRedis﻿: "false" # 特征值需要写入redis，二阶特征中使用    readFromRedis﻿: "false" # 提前读取特征值到record中，特征抽取和统计阶段就可以作为一个普通维度使用  - featureType﻿: "distinct"// 特征类型    featureId﻿: "1002"    view﻿: "actId,replyUid" //     dataView﻿: "uid"    windowType﻿: "time"    stepLength﻿: 3600    windowLength﻿: 3600    care﻿: "[*]"    writeToRedis﻿: "false" # 特征值需要写入redis，二阶特征中使用    readFromRedis﻿: "false" # 提前读取特征值到record中，特征抽取和统计阶段就可以作为一个普通维度使用  - featureType﻿: 'distribution_distance'    view﻿: 'actId,mobileSub3,uid' // 写redis动态词表的view 支持自定义    referenceFeaId﻿: "1001" // 用于分布距离计算的分布特征的featureID    referenceView﻿: "1002"  //必填 对于计数分布和去重分布而言是对应segment和distinct的featureID  对于分布特征而言是字段名    intervalEndpoints﻿: '100,﻿1000﻿,﻿2000﻿,﻿5000﻿,10000' //必填 桶的间隔 用英文逗号隔开    standProb﻿: "0.2909,﻿0.2061﻿,﻿0.1885﻿,﻿0.1765﻿,﻿0.1299﻿,0.1" //必填 基准分布    windowType﻿: 'time'    stepLength﻿: 3600    windowLength﻿: 7200    featureId﻿: '1003'    funcType﻿: "maxDiff" //必填 距离函数,支持chiSquareTest、maxDiff、chiSquareDis、klDivergence四种    countThreshold﻿: 10  //必填 等同于feature_lib的count_thrshold    writeToRedis﻿: "true"
```

支持在content字段配置特定的四则运算表达式，如content: "('40410200001' + 10)/'40410200002'" 表示为特征40410200001 加10 除以40410200002

该特征的累积值即为四则运算后的结果。

如果计算失败则返回0

```java
  - featureId: "1005"     featureType: "calculation"  // 特征类型    view: "replyUid"  // viewValue会作为写redis的key     content: "('10041'+'replySentenceNumber') * 2"  // 必填 四则运算表达式  特征或日志中字段名需要用单引号包裹，而普通数字不需要    writeToRedis: "false" # 特征值需要写入redis，二阶特征中使用    readFromRedis: "false" # 提前读取特征值到record中，特征抽取和统计阶段就可以作为一个普通维度使用
```

如果命中care条件则将viewValue作为Key，func函数的结果作为value写出到Redis。

```java
  - featureId: "1003"    featureType: "dynamic_dict" // 特征类型    care: "['policyResult':~'12010010']"    view: "uid"    func : "STRING(1)" // 写值方式,支持STRING(1)和RECORD(cuid)等形式    writeToRedis: "true"    readFromRedis: "false"
```

注意policyResult是所有命中的策略id拼接成的字符串，这里使用子串匹配的方式进行care条件判定，例如如果同时命中1001，10010。则policyResult为：1001,10010

此时使用子串匹配\['policyResult':~'1001'\]则也会命中10010的策略，因为1001也是10010的子串，在使用时要注意！！！

配置示例：

```java
  # 序列特征示例  - featureId: "1007"    featureType: "sequence"    care: "[*]"  #特征 1003为1则为本条回答重复    view: "replyUid"    dataView: "replyContent"    calculateFunc: "DemoSequenceFunction" # 计算序列特征的计算函数类名，接口已经预留好了，可以自定义各种类型的计算算子    stepLength: 21600    windowLength: 21600    windowType: "time"    writeToRedis: "false" # 特征值需要写入redis，二阶特征中使用    readFromRedis: "false" # 提前读取特征值到record中，特征抽取和统计阶段就可以作为一个普通维度使用
```

配置示例：

```yaml
- featureId: '11111111111'  # 必须配置  featureType: ratio # 必须配置  care: '[''actId'':=''50472'',''50811'']' # 必须配置 整个特征和分母的care条件  view: finalResult # 必须配置  filter: '[''actId'':=''50811'']' # 必须配置 分子的care条件（只有满足care和filter两个条件，分子才会+1）  accMode: incremental # 必须配置  stepLength: 300 # 必须配置  windowType: time # 必须配置  windowLength: 300 # 必须配置  writeToRedis: false # 按需配置  readFromRedis: false # 按需配置
```

配置示例：

```yaml
- featureId: '1401000181'  featureType: switch  care: '[''accessType'':=''click'',''se'']&&[''query''!='''']'  view: query  dataView: ip  stepLength: 3600  windowType: time  windowLength: 3600
```

上述配置标识当前query下ip变换了多少次

**注意****：**该特征的累积值会受到数据顺序的影响，如数据dataView序列AAAABBBB的累积值为2，ABABABAB的累积值为8。

yaml对value类型的检查是自动的，所以对于featureId这种以数字表示的value必须加引号表示为string,否则会被认定为数字类型。如果需要特别标注类型的，可以进行强制类型转换：

```java
port: !!str 8000num: !!int '1999'boolean: !!bool 'true'second: !!float '18.362'# yaml中，强制转换时，只是给字符串加引号，去引号，如果去引号后的值和要求的类型不符，转换报错。# 结果{ port: '8000', num: 1999, boolean: true, second: 18.362 }
```

1. 对于care表达式，存在引号的嵌套时候，外面的引号为双引号，里面为单引号。

1. 特征支持：见2.2.3节。 ratio类型可采用两个count类型代替，careSpace特征可以直接在policy层配置

1. 窗口起始时间的问题：flink的默认窗口起点是早上8点，为了能对齐到凌晨12点窗起始，需要加上16小时偏移量，同时flink规定滑段窗口的stepLength必须大于偏移量，即16小时。

1. 因此如果你滑段窗口的stepLength小于16小时，窗口起点是早上八点；为了窗页与零点能对齐以方便离线统计，我们默认的滑段长度规定为8小时，也建议你将滑段长度设置为8小时的公约数

1. 如果你的滑段窗口的段长大于16小时，或跳段，则无此问题，窗口起点是零点。

已上线特征仅仅支持修改care条件，不支持修改窗口长度和步长等信息。

修改care条件对于窗口内已经累积过的数据不生效，仅对于上线后的新抽取的特征生效。

目前仅仅支持careSpace一种类型的policy，命中careString则表示命中当前policy。

**policy.yml 配置示例**

```java
poList: "473,474"policies:  - policyId: "473"    policyType: careSpace    careString: "['40210200002':>'10']['expression1':>'0.3']['price':>'20']"    disposeTag: 6 // 仅支持电商订单流    policyTag: "cattle"// 仅支持电商订单流  - policyId: "474"    policyType: careSpace    careString: "['40410200002':>'10']['expression1':>'0.3']['40410200002':>'20']"
```

1. poList表示各个策略的id。一个文件只能有一个

1. policies表示具体的policies配置，每一个policy用一个数组表示，所以前面用 - 开头。

1. 对于每一个配置项，value与冒号之间必须有一个空格。

1. 当前只有一种策略类型policyType：careSpace类型

 careString 是一个care表达式， care表达式为真时则策略命中。

 左值为**feature\_id**或**日志中字段**或**计算表达式名**，使用单引号包裹。如\['40410200002':>'10'\]表示如 特征 40410200002大于10，则策略命中

1. disposeTag取值: 0 / 1 / 2 / 4 / 6

<table><colgroup><col width="74"><col width="108"><col width="116"></colgroup><tbody><tr><td colspan="1" rowspan="1"><div><p><span><span><span>取值</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>含义</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>二进制(bitmap)</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>6</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>B&amp;C结类作弊</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>110</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>4</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>B端作弊</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>100</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>2</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>C端作弊</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>010</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>1</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>待人工审核</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>001</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>0</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>非作弊</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>000</span></span></span></p></div></td></tr></tbody></table>

1. policyTag : 便于业务侧理解的反作弊标签, 若有多个值, 则用 "," 拼接.

policy是否开启judge可以再judge.yaml里边配置，配置示例如下：

开启judge：

```json
- policyId: "180001"  openJudge: true
```

不开启judge,配置为false或者干脆不配置：

```json
- policyId: "180001"  openJudge: false
```

<table><colgroup><col width="186"><col width="74"><col width="426"><col width="316"></colgroup><tbody><tr><td colspan="1" rowspan="1"><div><p><span><span><span>配置项</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>格式</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>说明</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>示例</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>modelNameList</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>String</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>生效的模型名字组成的list，多个名字之间应为逗号分割</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>"mode1,model2"</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>models</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>Array</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>模型的详细配置</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>无</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>modelName</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>String</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>模型名字，跟modelNameList中的配置名字保持一致</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>model1</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>version</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>String</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>模型版本，更新模型时请更新模型版本</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>1</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>type</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>String</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>模型类型，当前仅支持pmml</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>pmml</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>modelType</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>String</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>模型算法，模型使用的机器学习算法</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>LogisticRegression</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>path</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>String</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>模型地址，仅支持afs地址</span></span></span></p><p><span><span><span>为避免afs集群密码暴露，用前缀标识afs集群：</span></span></span></p><p><span><span><span>当前仅支持&lt;$ yinglong_afs_prefix $&gt;标识yinglong_remora集群</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>&lt;$ yinglong_afs_prefix $&gt;/app/ecom/remora/rd/zhuangxinfa/model/ecom_order_filter_lr/test.pmml</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>input</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>String</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>见下方详细说明</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>0:totalAmount:double:0,1:paymentAmount:double:0</span></span></span></p></div></td></tr><tr><td colspan="1" rowspan="1"><div><p><span><span><span>output</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>String</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>见下方详细说明</span></span></span></p></div></td><td colspan="1" rowspan="1"><div><p><span><span><span>label:ecom_order_filter_lr_label,probability(0.0):ecom_order_filter_lr_probability_0</span></span></span></p></div></td></tr></tbody></table>