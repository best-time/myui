const xlsx = require('node-xlsx')
const fs = require ('fs');

// 开始读取 excel 文件
// 测试读取 a.xlsx 文件
const workbook = xlsx.parse('./resource.xlsx')

console.log(workbook[66], 123123)
const [sourceList, list, pageList, existResources] = [
  getXlsxTabData(0).slice (1),
  getXlsxTabData(1).slice (1),
  getXlsxTabData(2).slice (1),
  getXlsxTabData(3).slice (1),
]
console.log(existResources)
const existRuleToResourceMap = existResources.reduce((prev, now) => {
  const [role, resourceId] = now
  console.log(role, resourceId)
  if(!prev[role]) {
    prev[role] = []
  }
  prev[role].push(resourceId)
  return prev
}, {})

console.log(existRuleToResourceMap)


const sourceKeyMap = {}
const sourceUrlMap = {};

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

console.log('==========================')

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

// console.log (pageList);
function strSplit(s) {
  return (`${s}`).split(/\s/mg)
}
const pageToRoleResource = pageList.reduce((prev, now) => {
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
console.log(pageToRoleResource);

console.log('==========================')
// const data = [
//   ['列1', '列2', '列3', '列412'],
//   [1, 2, 3],
//   [true, false, null, 'sheetjs'],
//   ['foo', 'bar', new Date ('2014-02-19T14:30Z'), '0.3'],
//   ['baz', null, 'qux'],
// ];
const result = []
const existResult = []
Object.keys(pageToRoleResource).forEach(itemKey => {
  const { roleList, queryList, operateList, parentList } = pageToRoleResource[itemKey]
  roleList.forEach(role => {
    // 操作数据接口
      operateList.forEach(operateUrl => {
        if(validateRuleToResourceId(role, sourceUrlMap[operateUrl]?.sourceId)) {
          result.push([role, sourceUrlMap[operateUrl]?.sourceId])
        } else {
          existResult.push([role, sourceUrlMap[operateUrl]?.sourceId])
        }
      })
    // 当前页面
    if(validateRuleToResourceId(role, itemKey)) {
      result.push([role, itemKey])
    } else {
      existResult.push([role, itemKey])
    }
  });
  [...roleList, 'Common user'].forEach (role => {
    // 查询类接口
    queryList.forEach (url => {
      if(validateRuleToResourceId(role, sourceUrlMap[(`${url}`).trim()]?.sourceId)) {
        result.push ([role, sourceUrlMap[(`${url}`).trim()]?.sourceId]);
      }else {
        existResult.push([role, sourceUrlMap[(`${url}`).trim()]?.sourceId]);
      }
    });
    // 当前页面的父级菜单
    parentList?.forEach (parentSourceId => {
      if(validateRuleToResourceId(role, parentSourceId)) {
        result.push ([role, parentSourceId]);
      }else {
        existResult.push([role, parentSourceId]);
      }
    });
  });
})
console.log(result, result.length);

build(result)

function build(result) {
  const buffer = xlsx.build ([
    {
      name: '资源',
      data: [['角色', '资源id'], ...result],
      options: {
        "!cols": [{wch: 35}, {wch: 50}]
      }
    },
    {
      name: '已存在的资源',
      data: [['角色', '资源id'], ...existResult],
      options: {
        "!cols": [{wch: 35}, {wch: 50}]
      }
    }
    ]); //
  const path = './data/test.xlsx';
  fs.unlink(path, err => {
    // if(err) throw err
// 把生成好的内容写入一个文件
    fs.writeFile ('./data/test.xlsx', buffer, (err) => {
      if(err) {
        console.log('写入失败: ', err)
      }
    });
  })
}




function getXlsxTabData(tabIndex) {
  return workbook[tabIndex]?.data || []
}

function validateRuleToResourceId(role, resourceId) {
  if(!existRuleToResourceMap[role]) {
    return true
  }
  return !existRuleToResourceMap[role].find(sourceId => {
    return sourceId === resourceId
  })
}
