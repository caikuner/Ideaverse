---
tags: []
up:
related:
in:
created: 2024-09-02
modified: 2025-07-22
version:
  - "1.5"
---

"Views" are maps whose main purpose is **_to show auto-updating, dynamic results of custom searches._**

> [!map]+ # Views
> This note collects all notes where the `in` property says `Views`.
>
> ```dataview
> TABLE WITHOUT ID
> 	file.link as View
> WHERE
> 	contains(in,link("Views")) and
> 	!contains(file.name, "Template")
> SORT file.name asc
> LIMIT 50
> ```
