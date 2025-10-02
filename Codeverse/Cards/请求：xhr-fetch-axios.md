---
tags: []
up:
related:
created: 2025-06-14
modified: 2025-06-14
---
在 Ajax 出现之前，网页想要和服务器通信，最常用的方式是使用 form 表单：用户提交表单后，浏览器开始跳转，服务器接收表单并处理，然后将新的网页返回给浏览器。

但是使用表单来进行网页和服务器的交互，用户体验差，还浪费带宽，用户页面会刷新，之前的操作状态会丢失。



Ajax （Asynchronous JavaScript and XML），技术核心是 <font style="color:#FF4D4F;">XMLHttpRequest </font>(XHR)。网页使用 Ajax 与服务器通信，可以规避上述 form 表单存在的问题，以异步方式从服务器取得数据。用户提交表单后，使用 XHR 取得新数据，然后通过 DOM 把新数据插入到页面。这样无需重载（刷新）整个页面，用户也不用等待请求的返回。



后来浏览器使用基于 Promise 的 Fetch 代替了 XHR，另外 Axios 请求库进行了很好的封装，也很受欢迎。

# xhr

浏览器提供了 `XMLHttpRequest` 对象（低版本 IE6 及以下 使用 ActiveXObject 对象），让我们能够方便地使用 Ajax。

注意：AJAX 请求是异步执行，要通过回调函数获得响应。

## 使用 xhr

具体来说，包括以下几个步骤：



+ 实例化一个 XMLHttpRequest 对象
+ 绑定 readyState 改变时调用的回调 onreadystatechange（在 open<font style="color:#FF4D4F;">之前</font>指定）
+ 在回调函数中根据 readyState、status 获知响应状态，处理返回的响应数据
+ 使用 open、send 方法发出 HTTP 请求（新版本的浏览器不建议发送同步请求）

```javascript
// 处理将来的响应数据
function success(text) {
    var textarea = document.getElementById('test-response-text');
    textarea.value = text;
}

function fail(code) {
    var textarea = document.getElementById('test-response-text');
    textarea.value = 'Error code: ' + code;
}

// 实例化一个 XMLHttpRequest 对象(使用实例化的XHR对象变量而不是this，这样不会有作用域问题，比较可靠)
// 为兼容IE6及以下，检测window对象是否有XMLHttpRequest属性，来确定浏览器是否支持标准的XMLHttpRequest
var request;
if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
} else {
    request = new ActiveXObject('Microsoft.XMLHTTP');
}

// 绑定 XMLHttpRequest.readyState 改变时调用的回调
request.onreadystatechange = function () { // 状态一旦发生变化，函数就被回调
    if (request.readyState === 4) { 
      // 成功接收响应数据
        // 判断响应结果:
        if ( (xhr.status >= 200 && xhr.status < 300)
    || (xhr.status === 304) ) {
            // 成功，通过responseText拿到响应的文本:
            console.log(request.responseText);
        } else {
            // 失败，根据响应码判断失败原因:
            console.log(request.status);
        }
    } else {
        // HTTP请求还在继续...
    }
}

// 初始化请求:
request.open('GET', '/api/categories');

xhr.timeout = 2000 // 超时时间，单位是毫秒
xhr.ontimeout = function (e) {
  // XMLHttpRequest 超时，在此做超时的处理
}

// 自定义请求头
request.setRequestHeader('MyHeader', 'MyValue');
// 发送请求
request.send(null); // post可以传递参数

request.abort() // 取消请求
```

## XMLHttpRequest Level 2

在 HTML5 之前，虽然各家浏览器都实现了 XMLHttpRequest 接口，但由于没有统一的规范，导致各个浏览器的实现或多或少有些差异。HTML5 将 XMLHttpRequest 纳入了规范，并在原来的基础上做了升级，提出了 XMLHttpRequest Level 2。



XMLHttpRequest Level 2 相较于老版本的 XMLHttpRequest 主要新增了如下内容：



+ 可以设置 HTTP 请求的超时时间
+ 可以通过 FormData 发送表单数据
+ 可以上传文件
+ 支持跨域请求
+ 可以获取服务器端的二进制数据
+ 可以获得数据传输的进度信息

### 设置 HTTP 请求的超时时间

`XMLHttpRequest.timeout`



和 XMLHttpRequest.setRequestHeader 一样，XMLHttpRequest.timeout 的值只能在调用 XMLHttpRequest.open 之后且在 XMLHttpRequest.send 之前设置

```javascript
var xhr = new XMLHttpRequest()
xhr.open('GET', '/api/hello')
xhr.timeout = 2000 // 超时时间，单位是毫秒
xhr.ontimeout = function (e) {
  // XMLHttpRequest 超时，在此做超时的处理
}
xhr.send(null)
```

### 发送表单数据

HTML5 新增了一个 FormData 对象，用于模拟表单。我们可以结合 FormData 与 xhr 发送表单数据

```javascript
var xhr = new XMLHttpRequest()
// 实例化一个 FormData 对象
var formData = new FormData()
// 向 FormData 添加数据
formData.append('username', 'whale')
formData.append('age', '18')
xhr.open('POST', '/api/form')
// 发送表单数据
xhr.send(formData)
```

### 上传文件

FormData 除了可以添加字符串数据，也可以添加 [blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)、[file](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects) 类型的数据，因此可以用于上传文件。在浏览器中，一般是通过文件上传输入框来获取 file 对象，比如：

```html
<input type="file" name='uploadFile' id="upload-file" />
```

然后监听 input 的 change 事件，获取 file 对象：

```javascript
document.getElementById('upload-file').addEventListener('change', function () {
  formData.append('uploadFile', this.files[0])
  xhr.send(formData)
})
```

### 跨域请求

见 [[浏览器：跨域]]

### 接收二进制数据

XMLHttpRequest level 1 只能接收文本数据，新版本 XMLHttpRequest 添加了接收二进制数据的能力。要接收二进制数据，一般有两种方式。



一种是使用 `overrideMimeType` 方法覆写服务器指定的 [MIME 类型](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)，从而改变浏览器解析数据的方式。



`XMLHttpRequest.overrideMimeType(mimeType)`



+ mimeType：要设置的 MIME 类型



比如：

```javascript
// 告诉浏览器，服务器响应的内容是用户自定义的字符集
xhr.overrideMimeType('text/plain; charset=x-user-defined')
```

执行上面的代码后，浏览器就会将服务器返回的二进制数据当成文本处理，我们需要做进一步的转换才能拿到真实的数据：

```javascript
// 获取二进制数据的第 i 位的值
var byte = xhr.responseText.charCodeAt(i) & 0xff
```

针对 "& 0xff" 运算，参考 [阮一峰的文章](http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html) 解释如下：

> "& 0xff" 运算，表示在每个字符的两个字节之中，只保留后一个字节，将前一个字节扔掉。原因是浏览器解读字符的时候，会把字符自动解读成 Unicode 的 0xF700-0xF7ff 区段。

在较新的浏览器中，可以采用另一种接收二进制数据的方式。



XMLHttpRequest.responseType 用于设置服务器返回的数据的类型。我们可以将返回类型设置为 [blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 或者 [arraybuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)，然后就可以从 XMLHttpRequest.response 属性获取到对应类型的服务器返回数据。比如：

```javascript
xhr.responseType = 'arraybuffer'
xhr.onload = function () {
  var arrayBuffer = oReq.response
  // 接下来对 arrayBuffer 做进一步处理...
}
```

### 数据传输进度信息

新版本的 XMLHttpRequest 允许我们监听数据传输的详细状态，上面的示例代码，我们就使用 onload 监听了一个数据传输完成的事件。可以监听的事件如下：

| 事件 | 描述 |
| --- | --- |
| onloadstart | 获取数据开始 |
| onprogress | 数据传输过程中 |
| onabort | 数据获取被取消 |
| onerror | 获取数据错误 |
| onload | 获取数据成功 |
| ontimeout | 获取数据超时 |
| onloadend | 获取完成（无论成功或失败） |

## 改写 XHR ❤❤

> 手写代码题：改写 xhr，给它添加 hook，打印各阶段日志 (call apply call && 对象的属性重写 defineProperty)

```javascript
/* 改写xhr，给xhr对象添加自定义的属性和方法。

- class new
- this指向
- apply call
- Object.defineProperty
- 面向对象代码设计
*/
class XhrHook {
  constructor(beforeHooks = {}, afterHooks = {}) {
    this.XHR = window.XMLHttpRequest; //保存下来原始的XHR类
    this.beforeHooks = beforeHooks;
    this.afterHooks = afterHooks;
    this._init()
  }

  _init() {
    let _this = this;
    // 重写XHR类。这里不要用箭头函数，会修改this
    window.XMLHttpRequest = function () {
      this._xhr = new _this.XHR() // 保存下来new出来的 xhr 原始实例对象，这是需要去代理的
      _this.overwrite(this) // 重写代理类上的方法属性，覆盖原始的。这里的this是XMLHttpRequest类
    }
  }

  overwrite(proxyXHR) {
    for (let key in proxyXHR._xhr) {
      // 遍历实例对象上的所有属性方法
      if (typeof proxyXHR._xhr[key] === 'function') {
        // 重写方法
        this.overwriteMethod(key, proxyXHR)
      } else {
        // 重写属性
        this.overwriteAttribute(key, proxyXHR)
      }
    }
  }

  /* 重写方法 */
  overwriteMethod(key, proxyXHR) {
    let { beforeHooks, afterHooks } = this;

    proxyXHR[key] = (...args) => {

      // 前置的钩子函数，就是拦截器的效果
      // 如果beforeHooks里面有同名方法，就改变this指向为proxyXHR，执行proxyXHR上的同名方法
      if (beforeHooks[key]) {
        const res = beforeHooks[key].apply(proxyXHR, args)
        if (res === false) return
        // 返回false，就拦截掉
      }

      // 执行原始xhr对象上的方法
      const res = proxyXHR._xhr[key].apply(proxyXHR._xhr, args)

      // 后置的钩子函数要拿到结果
      afterHooks[key] && afterHooks[key].call(proxyXHR._xhr, res)

      return res
    }

  }

  /* 重写属性 */
  overwriteAttribute(key, proxyXHR) {
    Object.defineProperty(proxyXHR, key, this.setProperty(key, proxyXHR))
  }
  setProperty(key, proxyXHR) {
    let obj = Object.create(null)
    let _this = this;

    // 只改写一些on开头的有用属性,比如 onload onerror,实际都是函数引用
    obj.set = function (val) {
      if (!key.startsWith('on')) {
        proxyXHR['_' + key] = val;
        return
      }

      if (_this.beforeHooks[key]) {
        this._xhr[key] = function (...args) {

          _this.beforeHooks[key].call(proxyXHR);// 执行这个钩子函数

          val.apply(proxyXHR, args) // 执行新set的函数 ???
        }
        return
      }

      // 没有钩子就直接set
      this._xhr[key] = val
    }


    obj.get = function () {
      return proxyXHR['_' + key] || this._xhr[key]
    }

    return obj
  }

}

// test:
new XhrHook({
  open: function () { console.log('before open') },
  onload: function () { console.log('before load') },
  onreadystatechange: function () { console.log('before readychange') },
  onerror: function () { console.log('before error') },
}, {
  open: function () { console.log('after open') },
  onload: function () { console.log('after load') },
  onreadystatechange: function () { console.log('after readychange') },
  onerror: function () { console.log('after error') },

})

const xhr = new XMLHttpRequest();
console.log('xhr: ', xhr);

xhr.onreadystatechange = function () {
  console.log('readychange:', xhr.readyState, xhr.status,xhr.responseText)
}
xhr.onerror = function (err) {
  console.log('err', err)
}

xhr.open('GET', "https://www.runoob.com/try/ajax/demo_get.php", true)
xhr.send()

```

# fetch

[Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 是一种新的用于获取资源的技术，它被用来代替我们已经吐槽了很久的技术（[XHR](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)）。



[Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 使用起来很简单，它返回的是一个 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)：

```javascript
fetch('https://someUrl', {
	method: 'get'
}).then(function(response) {})
  .catch(function(err) {
	// Error });
```

## fetch 的四个概念

对应于 HTTP 报文， [Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 中有四个基本概念，他们分别是 **Headers**、**Body、Request** 、**Response** 。



+ **<font style="color:#FF4D4F;">Header </font>**请求头和响应头

Headers 属于 [HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP) 中 [首部](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers) 的一份子，它是一个抽象的接口，利用它可以对 [HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP) 的请求头和响应头做出添加、修改和删除的操作。

可以 new 实例化，可以通过 `append` 、 `delete` 、`set` 、`get` 和 `has` 方法修改请求头。

```javascript
const headers = new Headers({
    'Content-Type': 'text/plain',
		'auth-Token': 'abcdefg'
});

// 自定义请求头时注意要在CORS配置一下，以免跨域
```

+ **<font style="color:#FF4D4F;">Body </font>**请求体和响应体
+ **<font style="color:#FF4D4F;">Request </font>**表示一个请求类，需要通过实例化来生成一个请求对象。



通过该对象可以描述一个 [HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP) 请求中的请求（一般含有请求头和请求体）。既然是用来描述请求对象，那么该请求对象应该具有修改请求头（Headers）和请求体（Body）的方式。我们可以通过 `Request` 对象拿到一些常用的属性，比如 `method`、`url`、`headers` 、`body` 等等只读属性。

```javascript
// 客户端
  const headers = new Headers({
    'X-Token': 'fe9',
  });
  const request = new Request('/api/request', {
    method: 'GET',
    headers,
  });
  console.log(request); // Request {method: "GET", url: "http://127.0.0.1:4000/api/request", headers: Headers, destination: "", referrer: "about:client", …}
  console.log(request.method); // GET
  console.log(request.mode); // cors
  console.log(request.credentials); // same-origin
  // 如果你想打印headers信息，可以调用 printHeaders(request.headers)
```

+ **<font style="color:#FF4D4F;">Response</font>**: 一次请求返回的响应数据

```javascript
// 客户端
  const headers = new Headers({
    'X-Token': 'fe9-token-from-frontend',
  });
  const request = new Request('/api/response', {
    method: 'GET',
    headers,
  });

  // 这里我们先发起一个请求试一试
  fetch(request)
    .then(response => {
      const { status, headers } = response;
      document.getElementById('status').innerHTML = `${status}`;
      document.getElementById('headers').innerHTML = headersToString(headers);

      return response.json();
    })
    .then(resData => {
      const { status, data } = resData;
      if (!status) {
        window.alert('发生了一个错误！');
        return;
      }
      document.getElementById('fetch').innerHTML = data;
    });
```

示例中拿了 `status` 和 `headers` ，为了方便，这里我将其放到 html 中。再看看该回调中最后一行，我们调用了一个 `response.json()` 方法（这里后端返的数据是一个 `JSON` 对象，为了方便直接调用 `json()`），该方法返回一个 `Promise`，我们将处理结果返给最后一个 `then` 回调，这样就可以获得最终处理过后的数据。

## Fetch 与 XHR 比较

Fetch 相对 [XHR](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 来说具有简洁、易用、声明式、天生基于 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 等特点。[XHR](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)  使用方式复杂，接口繁多，最重要的一点个人觉得是它的回调设计，对于实现 `try…catch` 比较繁琐。



但是 Fetch 也有它的不足，相对于 [XHR](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)  来说，目前它具有以下劣势：



+ 不能取消（虽然 [AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/FetchController) 能实现，但是目前兼容性基本不能使用，可以使用 [polyfill](https://github.com/mo/abortcontroller-polyfill) ）
+ 不能获取进度
+ 不能设置超时（可以通过简单的封装来模拟实现）



在了解 Fetch 和 [XHR](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 的一些不同后，还是需要根据自身的业务需求来选择合适的技术，因为技术没有永远的好坏，只有合不合适。

## fetch 使用示例

```javascript
const headers = new Headers({
    'X-Token': 'fe9',
  });  
  const request = new Request('/api/request', {
    method: 'GET',
    headers,
  });

  setTimeout(() => {
    fetch(request)
      .then(res => res.json())
      .then(res => {
        const { status, data } = res;
        if (!status) {
          alert('服务器处理失败');
          return;
        }
        document.getElementById('fetch-req').innerHTML = data;
      });
  }, 1200);
```

## 手动实现简易响应拦截器

```javascript
function parseJSON(response) {
  const { status } = response;
  if (status === 204 || status === 205) {
    return null;
  }

  return response.json();
}

function checkStatus(response) {
  const { status } = response;
  if (status >= 200 && status < 300) {
    return response;
  }
  // 权限不允许则跳转到登陆页面
  if (status === 403 || status === 401) {
    window ? (window.location = '/login.html') : null;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
/**
 * @description 默认配置
 * 设置请求头为json
 */
const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
  // credentials: 'include', // 跨域传递cookie
};

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    const headers = { ...defaultOptions.headers, ...options.headers };
    let abortId;
    let timeout = false;
    if (options.timeout) {
      abortId = setTimeout(() => {
        timeout = true;
        reject(new Error('timeout!'));
      }, options.timeout || 6000);
    }
    fetch(url, { ...defaultOptions, ...options, headers })
      .then((res) => {
        if (timeout) throw new Error('timeout!');
        return res;
      })
      .then(checkStatus)
      .then(parseJSON)
      .then((res) => {
        clearTimeout(abortId);
        resolve(res);
      })
      .catch((e) => {
        clearTimeout(abortId);
        reject(e);
      });
  });
}
// 首先检查了状态码。当状态码为 403 或 401 时，将页面跳转到了 login 登录页面。
// 还加了一个处理方法就是 parseJSON，由于后端统一返回 json 数据，为了方便，我们就直接统一处理了 json 数据。
```

# axios

## 1. 说说 axios

[axios](https://github.com/axios/axios)<font style="color:rgb(44, 62, 80);"> 是目前最常用的 http 请求库，可以同时用于浏览器和 node.js 。</font>

<font style="color:rgb(44, 62, 80);"></font>

<font style="color:rgb(44, 62, 80);">它的主要特性包括：</font>

+ **<font style="color:rgb(44, 62, 80);">同时支持</font>**<font style="color:rgb(44, 62, 80);">浏览器和 node.js</font>
    + <font style="color:rgb(44, 62, 80);">在浏览器</font>基于 **XMLHttpRequests** 实现 axios
    + 在 Node 环境，基于 node **内置核心模块 http** 实现
+ 基于 Promise
+ <font style="color:rgb(44, 62, 80);">可</font>**<font style="color:rgb(44, 62, 80);">拦截</font>**<font style="color:rgb(44, 62, 80);">请求与响应</font>
+ <font style="color:rgb(44, 62, 80);">可转换请求与响应数据</font>
+ **<font style="color:rgb(44, 62, 80);">请求可以取消</font>**
+ <font style="color:rgb(44, 62, 80);">自动转换 JSON 数据</font>
+ <font style="color:rgb(44, 62, 80);">客户端支持防范 XSRF</font>

![](https://cdn.nlark.com/yuque/0/2021/png/523629/1626858984832-3379ad19-a908-45d8-a9c5-8141a7b53d2e.png)



下面主要来看一下这些实现：

**<font style="color:#820014;">request => 请求拦截 =>dispatchRequest => Adapter => 响应拦截</font>**

## 2. axios 是怎么发请求的

axios 既可以当函数调用，也可以当对象使用，比如：

```javascript
axios({
  method:'get',
  url:'http://bit.ly/2mTM3nY',
  params: {}
}).then()

axios({
  method:'post',
  url:'http://bit.ly/2mTM3nY',
  dfata: {}
}).then()

axios.get('http://bit.ly/2mTM3nY')
```

+ 这是为什么呢 ?

axios 本质是函数，赋值了一些别名方法，比如 get、post 方法，可被调用，但最终调用的还是核心方法 Axios.prototype.request 。



<font style="color:rgb(71, 101, 130);">Axios.prototype.request</font><font style="color:rgb(44, 62, 80);"> 调用 </font><font style="color:rgb(71, 101, 130);">dispatchRequest，选择请求适配器，</font><font style="color:rgb(44, 62, 80);">最终处理 </font><font style="color:rgb(71, 101, 130);">axios</font><font style="color:rgb(44, 62, 80);"> 请求。</font>

## 3. axios 有哪些拦截器？你项目中怎么用的？原理？

### 拦截器

axios 有两个拦截器：请求拦截器、响应拦截器，各自分别有成功和失败两个回调。

+ `axios.interceptors.request.use` 添加请求 (前) 拦截，可以拦截处理请求头、请求体，进行用户权限验证等
+ `axios.interceptors.response.use` 添加响应 (后) 拦截，可以拦截响应头、响应体，进行响应状态判断、数据处理、cookie 设置等
+ 也支持移除某个拦截器，比如请求 myInterceptor： `axios.interceptors.request.<font style="color:#820014;">eject</font>(myInterceptor);`

```javascript
const service = axios.create({
  // process.env.NODE_ENV === 'development' 来判断是否开发环境
  baseURL: 'http://brother.prod.thingcom.com', //请求路径
  timeout: 10000
});

service.interceptors.request.use(
  (config) => {
    // console.log(config);
    for (const key in config.params) {
      // 去除对象内多余的空值key
      if (config.params[key] === '') {
        delete config.params[key];
      }
    }
    // 用户信息：
    let roleId = sessionStorage.getItem('roleId') ? sessionStorage.getItem('roleId') : '';
    let userId = sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : '';
    config.headers = {
      roleId : roleId,
      userId: userId
    }
    // 还可以进行请求权限验证 “token”
    return config;
  },
  (error) => {
    return Promise.reject();
  }
);
service.interceptors.response.use(
  (response) => {
    // console.log('response: ', response);
    if (response.status === 200) {
      if (response.data.code != '0') {
        Message.error(response.data.msg);
      }
      return response.data;
    } else {
      Message.error(response.data.error);
      return Promise.reject();
    }
  },
  (error) => {
    return Promise.reject();
  }
);
```

### 拦截器原理

上面说到， axios 的请求最终都会调用核心方法 request, 看看实现：

```javascript
class Axios {
  constructor(config) {
    this.defaults = config
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    }
  }
  // 发送一个请求
  request(config) {
    // 这里呢其实就是去处理了 axios(url[,config])
    if (typeof config == 'string') {
      config = arguments[1] || {}
      config.url = arguments[0]
    } else {
      config = config || {}
    }

    // 默认get请求，并且都转成小写
    if (config.method) {
      config.method = config.method.toLowerCase()
    } else {
      config.method = 'get'
    }

    // dispatchRequest 就是发送ajax请求
    const chain = [dispatchRequest, undefined]
    
    //  发生请求之前加入拦截的 fulfille 和reject 函数
    this.interceptors.request.forEach((item) => {
      chain.unshift(item.fulfilled, item.rejected)
    })
    
    // 在请求之后增加 fulfilled 和reject 函数
    this.interceptors.response.forEach((item) => {
      chain.push(item.fulfilled, item.rejected)
    })

    // 利用promise的链式调用，将参数一层一层传下去
    let promise = Promise.resolve(config)

    //然后我去遍历 chain
    while (chain.length) {
      // 这里一对一对不断出 直到结束为止
      promise = promise.then(chain.shift(), chain.shift())
    }
    return promise
  }
}

```

可以看到: `const chain = [dispatchRequest, undefined]`

+ 把真正的请求 <font style="color:#820014;">dispatchRequest </font>放到了一个数组 chain 中，可以称之为 链 (chain)，在数据结构中我们可以把它想象成一个 **<font style="color:#820014;">双端队列</font>****（双端队列也只允许队头出队）**
+ 刚开始，chain 队列中只有: 请求 dispatchRequest 和 响应（目前是 undefined）
+ 发现请求拦截器，就把成功、失败两个回调 从**队头**入队
+ 发现响应拦截器，就把成功、失败两个回调 从**队尾**入队
+ 最后遍历队列 chain，组成 promise 链式调用，把其中的函数元素一对一对出队 (从队头)，就可以实现** 请求前拦截 - 请求 - 响应 - 响应后拦截** 的顺序。

## 4. 核心请求模块 dispatchRequest

上面提到，核心方法 request 把 真正的请求 dispatchRequest 放进了链，来实现拦截器。下面来看看这和核心请求模块 dispatchRequest 的实现。



下面的源码可以看到，dispatchRequest 实际就是选择自定义/默认适配器，去根据不同的环境调用各自的请求封装模块，并包装成一个 **Promise **而已。

用户如果在配置中自定义<font style="color:rgb(51, 51, 51);"> adapter，就使用 config.adapter。 否则就是默认</font>`<font style="color:rgb(51, 51, 51);"> default.adpter</font>`<font style="color:rgb(51, 51, 51);">。</font>

```javascript
module.exports = function dispatchRequest (config) {
    throwIfCancellationRequested (config);
    // ...
    // 默认适配器是一个模块，可以根据当前环境选择使用 Node 或者 XHR 发送请求。
    var adapter = config.adapter || defaults.adapter; 
  
    return adapter (config).then (function onAdapterResolution (response) {
        throwIfCancellationRequested (config);
        // 其他源码
        return response;
    }, function onAdapterRejection (reason) {
        if (!isCancel (reason)) {
            throwIfCancellationRequested (config);
            // 其他源码
            return Promise.reject (reason);
        });
};
```

## 5. axios 的适配器？为什么 axios 可以前后端同构

dispatchRequest 中会选择自定义或默认的适配器，那适配器使做什么呢？

适配器 Adapter 做的事情很简单，就是根据不同的环境，来加载不同的请求封装。

<font style="color:rgb(51, 51, 51);"></font>

在默认适配器中，其实就是做个选择：

+ 如果是浏览器环境：就用 xhr 封装模块
+ 否则就是 node 环境。 判断 process 是否存在，存在就去加载 内部模块 http 的封装。



这有点像设计模式中的**适配器模式**，可扩展性非常好。 浏览器端和 node 端发送请求其实并不一样，适配器就帮助我们做到了前后端同构，我们使用时不必管内部实现。

```javascript
 var adapter = config.adapter || defaults.adapter;
 return adapter(config).then() ...
 
 // deafults.adapter:
 function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
    
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
   
  return adapter;
}
```

## 6. 使用过 axios 的取消请求功能吗？内部怎么实现的？

用过，通过传递 config 配置 **cancelToken**的形式，来取消的。

先判断有传 cancelToken，在 promise 链式调用的 **dispatchRequest**** 就会抛出错误**，在 adapter 中 调用 **request.abort()**取消请求，使 promise 走向 rejected，被用户捕获取消信息。

<font style="color:rgb(153, 153, 153);"></font>

```javascript
function CancelToken (executor) {
    if (typeof executor !== 'function') {
        throw new TypeError ('executor must be a function.');
    }
    var resolvePromise;
    this.promise = new Promise (function promiseExecutor (resolve) {
        resolvePromise = resolve;
    });
    var token = this;
    executor (function cancel (message) {
        if (token.reason) {
            // 已经被撤销了
            return;
        }
        token.reason = new Cancel (message);
        resolvePromise (token.reason);
    });
}
CancelToken.source = function source () {
    var cancel;
    var token = new CancelToken (function executor (c) {
        cancel = c;
    });
    return {
        token: token,
        cancel: cancel
    };
};
```

看一下 浏览器 adapter 的 xhr 怎么 absort 的：

```javascript
// adapter/xhr.js
if (config.cancelToken) {
    // 等待撤销
    config.cancelToken.promise.then (function onCanceled (cancel) {
        if (!request) {
            return;
        }
        request.abort ();
        reject (cancel);
        // 重置请求
        request = null;
    });
}
```
