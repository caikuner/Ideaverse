---
tags: []
up:
  - "[[Home]]"
related:
  - "[[Communicate]]"
  - "[[Relate]]"
in:
  - "[[Views]]"
created: 2022-01-01
modified: 2025-07-22
obsidianUIMode: preview
---

## Add View

This **Add** note isn't just an inbox. It's a cooling pad 🧊.
Thoughts come in hot. But after a few days, they cool down.
When cooler thoughts prevail, you can better prioritize. Cool?

> [!activity]+ ## Added Stuff
> This view looks at the 10 newest notes in your **+** folder. As you process each note: add a link, add details, move them to the best folder, and delete everything that no longer sparks ✨.
>
> ```dataview
> TABLE WITHOUT ID
>  file.link as "",
>  (date(today) - file.cday).day as "Days alive"
>
> FROM ("+" or #x/readitlater ) and -#x/readme
>
> SORT file.cday desc
>
> LIMIT 50
> ```

## TODOs

[[+todo code ⭐️]]

```dataview  or "Codebase"
TABLE rank,tags
FROM #todo or #x/面试派 or #x/yuque
WHERE !startswith(file.path, "X/") and file.path != this.file.path 
SORT tags,rank DESC,file.name ASC
limit 50
```

## Webclipings

- [Next-level frosted glass with backdrop-filter • Josh W. Comeau](https://www.joshwcomeau.com/css/backdrop-filter/)
- [New sandboxes from Cloudflare and Vercel](https://simonwillison.net/2025/Jun/26/sandboxes/)
