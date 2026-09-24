---
tags: []
up:
  - "[[Home]]"
related:
in:
  - "[[Maps]]"
created: 2023-08-19
modified: 2025-07-22
---

Keep your priorities in order. Quickly adjust your bandwidth as needed.

> [!Box]+ ### 🔥 On
>
> ```dataview
> TABLE WITHOUT ID
> file.link as "",
>  rank as "Rank"
> FROM "Efforts/On"
> SORT rank desc
> ```

> [!Box]+ ### ♻️ Ongoing
>
> ```dataview
> TABLE WITHOUT ID
> file.link as "",
> rank as "Rank"
> FROM "Efforts/Ongoing"
> SORT rank desc
> ```

> [!Box]+ ### 〰️ Simmering
> Efforts can easily move from `on` to `simmering` in the background.
>
> ```dataview
> TABLE WITHOUT ID
> file.link as "",
> rank as "Rank"
> FROM "Efforts/Simmering"
> SORT rank desc
> ```

> [!Box]- ### 💤 Sleeping
> %% ``` dataview
> TABLE WITHOUT ID
> file.link as "",
> rank as "Rank"
> FROM "Efforts/Sleeping"
> SORT rank desc
>
> ```%%
>
> ```

---

> [!faq]+ Learn more about Efforts
>
> - [[A deeper dive into how ACE works]]
> - [[Why Efforts are Liberating]]
> - [[The Four Intensities of Efforts]]
> - [[How ideas and efforts play nicely together]]
> - [[The big differences between efforts and projects]]
>
>   ![[robert-mccall-black-hole-concept-art copy.jpg]]

Back to [[Home]].
