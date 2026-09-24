---
tags: []
up:
related:
in:
created: 2025-03-09
modified: 2025-07-22
---

使用 Tasks 插件筛选的任务列表 `#task`

```tasks
# Only tasks that are not done, that is, which begin like this (but without the quotes):
#   '- [ ] ' or
#   '* [ ] ' or
#   '1. [ ] '
# Indented tasks are supported, but only single-line tasks.
not done

# Tasks due today or earlier:
# due before tomorrow

# Restrict to at most 100 tasks.
# If you ask Tasks to display many hundreds or thousands of tasks,
# Obsidian's editing performance really slows down.
limit 100

# Group and sort the output:
# group by filename
group by due
sort by due

# Optionally, ask Tasks to explain how it interpreted this query:
explain
```
