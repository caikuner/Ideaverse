
```bash
# Git 解决冲突

## Step1. 在本地仓库中, 更新并合并代码
git fetch origin
git rebase origin/hotfixs

## Step2. 依据提示分别打开冲突的文件, 逐一修改冲突代码

## Step3. 所有冲突都修改完毕后, 提交修改的代码
git add -u
git rebase --continue

## Step4. 更新patch
git push origin HEAD:refs/for/hotfixs
```


