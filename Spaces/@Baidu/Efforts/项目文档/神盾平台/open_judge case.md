
- judge is null
```
select p.project_id,s.name, p.file_id, p.id, p.policy_id,p.feature_id, j.id,j.file_id,j.quality from conf_policy as p left join conf_judgepolicyrelation as j on j.policy_id = p.id 
join conf_secondproject as s on s.id = p.project_id
where p.scope = 1 and p.status = 0 and (j.id is null or (j.quality=0 and j.scope=1))
order by p.id



select id,policy_id,file_id,scope,status,create_user_id,update_user_id from conf_policy where id in (3715,3852,4048);

20057, 91500502,60016
```


- 多个judge
```
1. judge file
2. 
select count(1) as cc,p.project_id,s.name,cp.casespace_id,p.id,p.policy_id,p.scope,p.status,group_concat(j.scope),group_concat(j.status),group_concat(j.file_id),group_concat(j.policy_id),group_concat(j.policy_relay_id),group_concat(j.quality)
from conf_policy as p
left join conf_judgepolicyrelation as j on j.policy_id = p.id
left join conf_casespace_policy_list as cp on cp.policy_id = p.id
join conf_secondproject as s on s.id=p.project_id

where p.status!=1 and p.scope=1 and j.scope=1 and j.status=0
group by p.id
having cc > 1;


and p.scope=1 and j.scope=1 and j.status=0 and cp.id is not null


select project_id,count(1) as cc from conf_file where type =4 group by project_id having cc > 1;

select * from conf_file where type=4 and project_id=10;

```


