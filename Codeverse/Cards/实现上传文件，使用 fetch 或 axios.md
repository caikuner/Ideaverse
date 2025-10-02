---
tags:
  - handcode

related: 
rank: "3"
created: 2025-06-14
modified: 2025-06-16
---
文件上传主要有以下几种方式：

- 使用 FormData

```js
// HTML
<input type="file" id="file">


const file = document.querySelector('#file').files[0]
const formData = new FormData()
formData.append('file', file)

// fetch
fetch('/upload', {
    method: 'POST',
    body: formData
})

// axios
axios.post('/upload', formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})
```

- 使用 Base64

```js
// 将文件转为 Base64
function fileToBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.readAsDataURL(file)
  })
}
const base64 = await fileToBase64(file)


// fetch
fetch('/upload', {
  method: 'POST',
  body: JSON.stringify({ file: base64 }),
  headers: {
    'Content-Type': 'application/json',
  },
})

// axios
axios.post('/upload', {
  file: base64,
})
```

- 多文件上传

```js
// HTML
<input type="file" multiple id="files">

const files = document.querySelector('#files').files
const formData = new FormData()
Array.from(files).forEach(file => {
    formData.append('files', file)
})


// fetch
fetch('/upload', {
    method: 'POST',
    body: formData
})

// axios
axios.post('/upload', formData)
```

改进点：
- 设置正确的 Content-Type
- 处理上传错误
- 考虑文件类型限制
- 考虑文件大小限制
- 添加上传进度显示
- 添加取消上传功能
