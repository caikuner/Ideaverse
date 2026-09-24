---
aliases: [People MOC, Person Map]
tags: []
up:
  - "[[Home]]"
related:
in:
  - "[[Maps]]"
created: 2023-06-01
modified: 2025-07-22
---

> [!important]+ 人物笔记
> 和我们喜欢的人建立更多的连接，不管是我们身边的家人朋友、还是历史上的人物。只要感觉到舒适，就多去了解和连接吧！
>
> - 记录下特殊的记忆、值得注意的信息，或者是学习全新的行业知识
> - Smaller Circles
>   - [[People Map#Family and Friends 👫]]
> - Bigger Circles
>   - [[People by my eras in life]]
> - Special Areas
>   - [[People Map#Prominent People 🌋|Prominent People 🌋]]
>   - [[Entertainment Industry]]
>   - [[Literary Industry]]
>   - ……
>
> ---

## Family and Friends 👫

> [!user]+ 👫 `#person`
>
> ```dataview
> TABLE WITHOUT ID
>  file.link as Person,
>  birthday as Birthday,
>  tags as Tags
>
> FROM #person
> WHERE !startswith(file.path, "X/")
>
> SORT dates asc
> ```
>
> ---

- 陈瑄
- **万玉莹**、**许晴晴**、王潇、吴雪文、黄潇潇、韩海云、张硕、刘莹莹、丁雨晴、徐军
- **吴琰**、徐平凹、李震、许怀金、李梦圆、李硕、江曼、史经昊、苏珉、魏冉、郭雅慧
- 姜文佳、唐中华、刘永涛、**李弘昱**、卢会会、陈香、赵强、陈红、夏明霞、王越、王先文
- 邢豪蔚、吴文楷、吴晓双、**黄盼盼**
- **梁咏琪**、孟浩玲、权金兰、凌端化、于沛然、丁翠、张睿、李刚、李立、钱雯、杜建晖、庄新发、姜淞
- celine

## Prominent People 🌋

> [!user]+ 🌋 `#people`
>
> ```dataview
> TABLE WITHOUT ID
>  file.link as People,
>  dates as "Years Lived"
>
> FROM #people
> WHERE !startswith(file.path, "X/")
>
> SORT dates asc
> ```
>
> ---
