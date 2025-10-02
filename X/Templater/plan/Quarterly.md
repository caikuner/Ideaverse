---
created: '<% tp.file.creation_date("YYYY-MM-DD") %>'
modified:
---

⏮️ <% tp.user.quarterlyZoomOutRibbon(tp.file.title) %> ⏭️

⬅️ <% tp.user.quarterlyNextPrevRibbon(tp.file.title) %> ➡️

---

<% tp.user.quarterlyDateInfo(tp.file.title) %>

---

<% tp.user.render('quarterly_declutter', tp.app) %>

```dataviewjs
await dv.view("scripts/dataview/views/goals", {type: "completed", onDate: "<% tp.file.title %> " , scope: "all", withContainer: true })
```

```dataviewjs
await dv.view("scripts/dataview/views/projects", {type: "completed", onDate: "<% tp.file.title %> " , scope: "all", withContainer: true})
```

---

<% tp.user.render('quarterlyReview', tp.app) %>

---

<% tp.user.render('quarterly_plan', tp.app) %>

```dataviewjs
await dv.view("scripts/dataview/views/goals", {type: "ongoing", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/goals", {type: "on-hold", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/button", {command: "add-goal"})
```

```dataviewjs
await dv.view("scripts/dataview/views/projects", {type: "ongoing", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/projects", {type: "on-hold", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/button", {command: "add-project"})
```
