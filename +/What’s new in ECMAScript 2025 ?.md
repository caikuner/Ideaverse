---
tags: ["clippings"]
up:
related:
url: "https://2ality.com/2025/06/ecmascript-2025.html#import-attributes-and-json-modules"
author:
created: 2025-07-04
modified: 2025-07-04
description: "On 25 June 2025, the 129th Ecma General Assembly approved the ECMAScript 2025 language specification (press release), which means that it’s officially a standard now. This blog post explains what’s new."
---

### Import attributes and JSON modules

[[https://exploringjs.com/js/book/ch_modules.html#import-attributes]] provide the syntactic foundation for importing non-JavaScript artifacts. The first such artifacts to be supported are [[https://exploringjs.com/js/book/ch_modules.html#json-modules]]:

```js
// Static import
import configData1 from './config-data.json' with { type: 'json' };

// Dynamic import
const configData2 = await import(
  './config-data.json', { with: { type: 'json' } }
);
```

The object literal syntax after is used for specifying import attributes. is an import attribute.`with` `type`

### Iterator helper methods

[[https://exploringjs.com/js/book/ch_sync-iteration.html#class-iterator]] let us do more with iterators:

```js
const arr = ['a', '', 'b', '', 'c', '', 'd', '', 'e'];
assert.deepEqual(
  arr.values() // creates an iterator
    .filter(x => x.length > 0)
    .drop(1)
    .take(3)
    .map(x => \`=${x}=\`)
    .toArray()
  ,
  ['=b=', '=c=', '=d=']
);
```

Some of the iterator helper methods work like the Array methods with the same names:

- Methods that return iterators:
	- `iterator.filter(filterFn)`
	- `iterator.map(mapFn)`
	- `iterator.flatMap(mapFn)`
- Methods that return booleans:
	- `iterator.some(fn)`
	- `iterator.every(fn)`
- Methods that return other values:
	- `iterator.find(fn)`
	- `iterator.reduce(reducer, initialValue?)`
- Methods that return no values:
	- `iterator.forEach(fn)`

Other iterator helper methods are unique to iterators:

- `iterator.drop(limit)`
	- Returns an iterator without the first elements of .`limit` `iterator`
- `iterator.take(limit)`
	- Returns an iterator with the first elements of .`limit` `iterator`
- `iterator.toArray()`
	- Collects all remaining elements of in an Array and returns it.`iterator`

#### How are iterator methods an improvement over Arrays methods?

- Iterator methods can be used with any iterable data structure – e.g., they let us filter and map the data structures and .`Set` `Map`
- Iterator methods don’t create intermediate Arrays and compute data incrementally. That is useful for large amounts of data:
	- With iterator methods, all methods are applied to the first value, then to the second value, etc.
	- With Array methods, the first method is applied to all values, then the second method is applied to all results, etc.

### New Set methods

There are several new Set methods:

- [[https://exploringjs.com/js/book/ch_sets.html#combining-sets]]:
	- `Set.prototype.intersection(other)`
	- `Set.prototype.union(other)`
	- `Set.prototype.difference(other)`
	- `Set.prototype.symmetricDifference(other)`
- [[https://exploringjs.com/js/book/ch_sets.html#checking-set-relationships]]:
	- `Set.prototype.isSubsetOf(other)`
	- `Set.prototype.isSupersetOf(other)`
	- `Set.prototype.isDisjointFrom(other)`

Examples:

```js
assert.deepEqual(
  new Set(['a', 'b', 'c']).union(new Set(['b', 'c', 'd'])),
  new Set(['a', 'b', 'c', 'd'])
);
assert.deepEqual(
  new Set(['a', 'b', 'c']).intersection(new Set(['b', 'c', 'd'])),
  new Set(['b', 'c'])
);
assert.deepEqual(
  new Set(['a', 'b']).isSubsetOf(new Set(['a', 'b', 'c'])),
  true
);
assert.deepEqual(
  new Set(['a', 'b', 'c']).isSupersetOf(new Set(['a', 'b'])),
  true
);
```

### RegExp.escape()

[[https://exploringjs.com/js/book/ch_regexps.html#RegExp.escape]] escapes text so that it can be used inside a regular expression – e.g., the following code removes all occurrences of inside that are not quoted:`text` `str`

```js
function removeUnquotedText(str, text) {
  const regExp = new RegExp(
    \`(?<!“)${RegExp.escape(text)}(?!”)\`,
    'gu'
  );
  return str.replaceAll(regExp, '•');
}
assert.equal(
  removeUnquotedText('“yes” and yes and “yes”', 'yes'),
  '“yes” and • and “yes”'
);
```

### Regular expression pattern modifiers (inline flags)

[[https://exploringjs.com/js/book/ch_regexps.html#regexp-pattern-modifiers]] let us apply flags to parts of a regular expression (vs. all of the regular expression) – for example, in the following regular expression, the flag is only applied to “HELLO”:`i`

```js
> /^x(?i:HELLO)x$/.test('xHELLOx')
true
> /^x(?i:HELLO)x$/.test('xhellox')
true
> /^x(?i:HELLO)x$/.test('XhelloX')
false
```

### Duplicate named capture groups

[[https://exploringjs.com/js/book/ch_regexps.html#duplicate-named-capture-groups]]: We can now use the same group name twice – as long as it appears in different alternatives:

```js
const RE = /(?<chars>a+)|(?<chars>b+)/v;
assert.deepEqual(
  RE.exec('aaa').groups,
  {
    chars: 'aaa',
    __proto__: null,
  }
);
assert.deepEqual(
  RE.exec('bb').groups,
  {
    chars: 'bb',
    __proto__: null,
  }
);
```

### Promise.try()

[[https://exploringjs.com/js/book/ch_promises.html#Promise.try]] lets us start a Promise chain with code that is not purely asynchronous – e.g.:

```js
function computeAsync() {
  return Promise.try(() => {
    const value = syncFuncMightThrow();
    return asyncFunc(value);
  });
}
```

### Support for 16-bit floating point numbers (float16)

This support provides the following features:

- [[https://exploringjs.com/js/book/ch_math.html#rounding-floats]]
- [[https://exploringjs.com/js/book/ch_typed-arrays.html#typed-array-element-types]]:
	- `Float16Array`
	- `DataView.prototype.getFloat16()`
	- `DataView.prototype.setFloat16()`
