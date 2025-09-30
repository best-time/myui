export function pathJoin(...args) {
  let val = args
    .filter((i) => {
      if (i == null) {
        return false
      }
      if (i.trim() == '/') {
        return false
      }
      return true
    })
    .reduce((prev, item) => {
      if (!prev) {
        return item
      }
      return prev + '/' + item
    }, '')
  const prependStringList = ['http://', 'https://']
  const prependString = prependStringList.find((i) => val.indexOf(i) === 0)
  let ret
  if (!prependString) {
    /*非http.https开头*/
    ret = val.replace(/\/{2,}/g, '/')
  } else {
    const leftString = val.slice(prependString.length)
    // console.log({ prependString, leftString });
    ret = prependString + leftString.replace(/\/{2,}/g, '/')
  }
  if (ret === '/') {
    return ''
  }
  return ret
}
/*function assert(name: string, expect: any, result: any) {
  if (expect !== result) {
    console.error(`${name} failed!`, { expect, result });
  } else {
    console.log(`${name} pass. ${result}`);
  }
}

assert('去掉末尾的斜杠 1', pathJoin('https://www.baidu.com/', '/'), 'https://www.baidu.com/');
assert('去掉末尾的斜杠 2', pathJoin('https://www.baidu.com/', '//'), 'https://www.baidu.com/');
assert('去掉中间的斜杠 1', pathJoin('https://www.baidu.com/', '/', '/hello'), 'https://www.baidu.com/hello');
assert('去掉中间的斜杠 2', pathJoin('https://www.baidu.com/', '/', '', '/', '/hello'), 'https://www.baidu.com/hello');
assert('全部都是斜杠', pathJoin('', '/', '//'), '');
assert('拼接1', pathJoin('https://www.baidu.com', 'hello'), 'https://www.baidu.com/hello');
assert('拼接2', pathJoin('https://www.baidu.com', '/hello'), 'https://www.baidu.com/hello');
assert('拼接3', pathJoin('https://www.baidu.com', '//hello'), 'https://www.baidu.com/hello');
assert('拼接4', pathJoin('https://www.baidu.com', '///hello'), 'https://www.baidu.com/hello');
assert('拼接5', pathJoin('https://www.baidu.com/', 'hello'), 'https://www.baidu.com/hello');
assert('拼接6', pathJoin('https://www.baidu.com//', '/hello'), 'https://www.baidu.com/hello');
assert('拼接7', pathJoin('https://www.baidu.com/', '/hello'), 'https://www.baidu.com/hello');*/
//# sourceMappingURL=pathJoin.js.map
