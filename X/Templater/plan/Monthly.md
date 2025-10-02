---
created: '<% tp.file.creation_date("YYYY-MM-DD") %>'
modified:
---

⏮️ <% tp.user.monthlyZoomOutRibbon(tp.file.title) %> ⏭️

⬅️ <% tp.user.monthlyNextPrevRibbon(tp.file.title) %> ➡️

---

<% tp.user.render('monthly_declutter', tp.app) %>

```dataviewjs
await dv.view("scripts/dataview/views/goals", {type: "completed", onDate: "<% tp.file.title %> ", scope: "all", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/projects", {type: "completed", onDate: "<% tp.file.title %> ", scope: "all", withContainer: true})
```

```dataviewjs
dv.view("scripts/dataview/views/areas", {type:"all", withContainer: true})
```

<% tp.user.render('monthlyReview', tp.app) %>

<% tp.user.render('monthly_plan', tp.app) %>

```dataviewjs
await dv.view("scripts/dataview/views/goals", {type: "ongoing", onDate: "<% tp.file.title %> ", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/goals", {type: "on-hold", onDate: "<% tp.file.title %> ", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/button", {command: "add-goal"})
```

```dataviewjs
await dv.view("scripts/dataview/views/projects", {type: "ongoing", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/button", {command: "add-project"})
```
