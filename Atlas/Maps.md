---
tags: []
up:
  - "[[Home]]"
related:
  - "[[Views]]"
in:
created: 2024-09-02
modified: 2025-07-22
version:
  - "1.5"
---
To learn more, visit [[MOCs Overview]]

> [!map]+ # Maps
> This note collects all notes where the `in` property says `Maps`.
>
> ```dataview
> TABLE WITHOUT ID
> 	file.link as Map
> WHERE
> 	contains(in,link("Maps")) and
> 	!contains(file.name, "Template")
> SORT file.name asc
> LIMIT 50
> ```
