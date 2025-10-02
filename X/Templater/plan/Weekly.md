---
created: '<% tp.file.creation_date("YYYY-MM-DD") %>'
modified:
---

⏮️ <% tp.user.weeklyZoomOutRibbon(tp.file.title) %> ⏭️

⬅️ <% tp.user.weeklyNextPrevRibbon(tp.file.title) %> ➡️

---

<% tp.user.weeklyDateInfo(tp.file.title) %>

---

<% tp.user.render('weekly_declutter', tp.app) %>

```dataviewjs
await dv.view("scripts/dataview/views/tasks", {type: "remaining", onDate: "<% tp.file.title %> " , scope: "all", withContainer: true})
```

```dataviewjs
dv.view("scripts/dataview/views/tasks", {type: "unplanned", onDate: "<% tp.file.title %> ", scope: "all", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/notes", {type: "unsorted", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/goals", {type: "completed", onDate: "<% tp.file.title %> ", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/projects", {type: "completed", onDate: "<% tp.file.title %> ", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/tasks", {type: "completed", onDate: "<% tp.file.title %> ", scope: "all", withContainer: true})
```

---

<% tp.user.render('weeklyReview', tp.app) %>

---

<% tp.user.render('weekly_plan', tp.app) %>

```dataviewjs
await dv.view("scripts/dataview/views/goals", {type: "ongoing", onDate: "<% tp.file.title %> ", withContainer: true})
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

```dataviewjs
await dv.view("scripts/dataview/views/tasks", {type: "due-next", onDate: "<% tp.file.title %>", scope: "all", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/tasks", {type: "ongoing", onDate: "<% tp.file.title %> ", scope: "all", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/button", {command: "add-task"})
```

```dataviewjs
await dv.view("scripts/dataview/views/meetings", {type: "scheduled-next", onDate: "<% tp.file.title %> ", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/button", {command: "add-meeting"})
```
