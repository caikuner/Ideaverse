---
tags: []
up:
related:
companies:
created: 2025-06-15
modified: 2025-07-23
---

> [!note]- Note
>
> - 所有项目见 `Projects/…`，做过的所有项目：公司的，开源的，个人的

```dataview
LIST
FROM "Projects"
WHERE !startswith(file.path, "X/") and file.path != this.file.path
SORT rank desc,file.name ASC
limit 100
```
