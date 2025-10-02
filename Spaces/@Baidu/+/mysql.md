
- Q & A
Can't connect to local MySQL server through socket '/var/lib/mysql/mysql.sock'

sudo mysql -u root -p


- 神盾  5.6.23
- 特征中心 8.0.26



- mysql

```
-- 从另一个库 复制一个表

CREATE TABLE `dict_businessproduct` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `created` datetime NOT NULL COMMENT 'create time',
  `updated` datetime NOT NULL COMMENT 'update time',
  `status` int(11) NOT NULL COMMENT 'status',
  `description` varchar(1024) DEFAULT NULL COMMENT 'description',
  `product_name` varchar(256) NOT NULL COMMENT 'product_name',
  `notice_group` varchar(256) DEFAULT NULL COMMENT '抄送用户组',
  `anti_approver_user_id` int(11) NOT NULL COMMENT '内部负责人',
  `anti_approver_user1_id` int(11) DEFAULT NULL COMMENT '内部经理',
  `anti_approver_user2_id` int(11) DEFAULT NULL COMMENT '内部总监',
  `external_approver_user_id` int(11) DEFAULT NULL COMMENT '外部负责人',
  `external_approver_user1_id` int(11) DEFAULT NULL COMMENT '外部经理/总监',
  `influence_view_conf` varchar(1024) NOT NULL DEFAULT '' COMMENT '需要填写的影响指标',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='词表审批业务线表';

insert into dict_businessproduct
select * from platform_policymanager_peiran.dict_businessproduct;

```

```json

```