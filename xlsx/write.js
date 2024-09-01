// 导入第三方
const xlsx = require('node-xlsx')
const fs = require ('fs');

// 开始读取 excel 文件
// 测试读取 a.xlsx 文件
const workbook = xlsx.parse('./resource.xlsx')

const sourceKeyMap = {}
const sourceUrlMap = {};


const sourceList = workbook[0].data.slice (1);
const sourceMap = sourceList.reduce ((prev, now) => {
  prev[now[1]] = {
    sourceId: now[0],
    parentId: now[3]
  }
  return prev;
}, {});

sourceList.forEach(now => {
sourceKeyMap[now[1]] = {
  sourceId: now[0],
  parentId: now[3],
};
sourceUrlMap[now[2]] = {
  sourceId: now[0],
};
})

sourceList.forEach(row => {
  sourceKeyMap[row[0]] = {
    parentId: row[3],
    name: row[1],
    url: row[2]
  }
})
console.log(sourceKeyMap);
console.log (sourceUrlMap, '1');


const list = workbook[1].data.slice(1)
const roleMap = list.reduce((prev, now) => {
  prev[now[0]] = now[1]
  return prev
}, {})

// console.log(roleMap)

function getParentBySourceId(resourceId) {
  if(!sourceKeyMap[resourceId]?.parentId) {
    return []
  }
  let key = sourceKeyMap[resourceId]?.parentId;
  let res = []

  while(key && sourceKeyMap[key]) {
    res.push(key)
    key = sourceKeyMap[key].parentId
  }
  return res
}

const pageList = workbook[2].data.slice(1)

// console.log (pageList);
function strSplit(s) {
  return (`${s}`).split(/\s/mg)
}
const mm = pageList.reduce((prev, now) => {
  const [page, role, queryList, operateList] = now
  // console.log(queryList.split(/\s/mg));
  prev[sourceMap[page].sourceId] = {
    roleList: strSplit(role).map(r => roleMap[r]),
    queryList: strSplit (queryList),
    operateList: strSplit (operateList),
    parentList: getParentBySourceId(sourceMap[page].sourceId)
  }
  return prev
}, {})
console.log(mm);

const data = [
  ['列1', '列2', '列3', '列412'],
  [1, 2, 3],
  [true, false, null, 'sheetjs'],
  ['foo', 'bar', new Date ('2014-02-19T14:30Z'), '0.3'],
  ['baz', null, 'qux'],
];
let result = []
Object.keys(mm).forEach(itemKey => {
  const { roleList, queryList, operateList, parentList } = mm[itemKey]
  roleList.forEach(role => {
      operateList.forEach(operateUrl => {
        result.push([role, operateUrl])
      })
  });
  [...roleList, 'Common user'].forEach (role => {
    queryList.forEach (url => {
      result.push ([role, sourceUrlMap[(`${url}`).trim()]?.sourceId]);
    });
    parentList?.forEach (parentSourceId => {
      result.push ([role, parentSourceId]);
    });
  });
})
console.log(result, result.length);
var buffer = xlsx.build ([{name: 'mySheetName', data: data}]); //
const path = './data/test.xlsx';
fs.unlink(path, err => {
  // if(err) throw err
// 把生成好的内容写入一个文件
// fs.writeFileSync ('./data/test.xlsx', buffer);

})


