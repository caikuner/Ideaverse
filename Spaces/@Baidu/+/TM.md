![[X/Archive/Obsidian-baidu/Assets/Pasted image 20230306161353.png]]
conf_featurebase.id                  ->    conf_featurecode.feature_id    ->  29306
conf_featurebase.feature_id (真实id) ->  conf_feature_ratio.feature_id,  242004006
conf_featurebase.featureInfoId    ->    conf_feature_ratio.id      ->  13588

选择 feature_id (242004006), 生产方服务的project_id (35,click-cpc)
```sql

select themis_conf from conf_featurecode
where status=0 
and feature_id in (
select id from conf_featurebase where scope=1 and feature_id = 242004006
)
order by id desc limit 1

```


```
[@feature]
feature_id : 242004006
view_level : click_level
feature_type : ratio
filter : ['android_version_head':='1','2','3','4','5','6','7','8']
remain_numerator : 1
remain : 0
refer : [*]
care : ['is_wireless':='1']['accessid':='1','29','31','37']['flow_group':~'organic']
view : userid
window_type : time
version : 1
window_length : 86400
```

```
# AS
[.@feature]
feature_id: 96082003
feature_name: fea_96082003
feature_type: count_distribution
feature_source: THEMIS
care: ['is_wireless':='1']['cntname'!='']['accessid':='1']['q'!='-']
view: n     # view显然不一样！！！！！是策略自己加的
data_view: q # 和tm一样，reids key是否使用
step_length: 21600
version: 0
window_length: 86400
write_to_redis: false
read_from_redis: true

# THEMIS
 [@feature]
feature_id : 96082003
view_level : click_level
feature_type : count_distribution
stand_prob : 0.56,0.44
count_threshold : 50
func_type : chi_square_dis
interval_endpoints : 3
care : ['is_wireless':='1']['cntname'!='']['accessid':='1']['q'!='-']
view : cntname
data_view : q
window_type : time
version : 1
window_length : 86400
```