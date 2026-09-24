function getType(val) {
  const originType = Object.prototype.toString.call(val); // eg. [object Function]
  return originType.slice(8, -1).toLowerCase();
}

console.log(getType(() => {}));
