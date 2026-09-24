```
<property>
  <name>fs.default.name</name>
  <value>afs://yinglong.afs.baidu.com:9902</value>
  <description>The name of the default file system.  A URI whose
  scheme and authority determine the FileSystem implementation.  The
  uri's scheme determines the config property (fs.SCHEME.impl) naming
  the FileSystem implementation class.  The uri's authority is used to
  determine the host, port, etc. for a filesystem.</description>
</property>


<property>
  <name>hadoop.job.ugi</name>
  <value>remora,uKphLI3F2aMvgirq</value>
  <description>username, password used by client</description>
</property>


65012. /home/work/local/hadoop-client/hadoop/conf/hadoop-site.xml    hadoop.job.ugi

/app/ecom/remora/rd/caikun01
./bin/afs_mount /home/volume/test_afs_mount/ afs://yinglong.afs.baidu.com:9902/app/ecom/remora/rd/caikun01


hadoop fs -ls afs://yinglong.afs.baidu.com:9902/app/ecom/remora/rd/caikun01
```

支持离线策略平台托管, 实现在线、流式、离线特征的复用。离线策略托管率>80%

【特征中心】完成动态词典、三方、二阶等特征表达重构；打平AS和FLINK框架中Redis、特征复用配置， 完成AS和Flink 100%服务接入；

【特征中心】剩余涉及动态词表的流的接入使用；实现Antiservice对TM特征的复用； 完成AS存量特征的迁移改造
改进flink的上线体验；

词表分组
redis交互：区分dynamic和非

- AS所有流配置迁移完成

跨场景复用
读写redis字段重构

批量转换 dynamic_dict.conf 中的词表，增加rule+feature中或的逻辑

动态词表表达更新，配置打平
as复用flink的普通特征 flink特征，测试验证符合预期

bug：view支持选择；重复bug
所有页面增加title信息便于查找；代码对比预览优化；上线审批单展示优化；特征、策略支持模糊搜索；批量引入flink特征

- - flink 重启作业api修复，已上线
  - flink模拟过滤获取airflow任务api修复，已上线
  - data_view字段修复，已上线
  - 上线时master文件全量备份修复，已上线
  - flink重新上线

以神盾平台为核心，改进业务开发效率，优化策略上线使用体验
