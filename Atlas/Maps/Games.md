---
tags: []
up:
  - "[[Sources]]"
related: []
in:
created: 2022-01-01
modified: 2025-07-22
---

This note passively looks at the properties of all notes.

If a note has an `in` property that includes a link to `Games`, it will show up below.

> [!Play]+
>
> ```dataview
> TABLE WITHOUT ID
> year as "Year",
> file.link as Game
>
> FROM -#x/readme
>
> WHERE
> contains(in,link("Games")) and
> !contains(file.name, "Template")
>
> SORT year asc
> ```
