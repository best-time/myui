### el-table-v2 基于 **虚拟滚动（窗口化渲染）** 实现：
1. 三层容器结构：外层视口、占位高度层、可视渲染层；
2. 监听滚动事件，通过 scrollTop 计算起始 / 结束索引，只渲染可视区域 + 缓冲区的行；
3. 用占位容器撑开总高度，让滚动条正常；渲染层用 transform: translateY 定位，保证视觉连续；
4. 无限下拉是虚拟滚动 + 触底加载：监听滚动位置，距离底部阈值时触发分页请求，追加到总数据后，虚拟滚动自动更新占位高度和可视区；
5. 配合 DOM 复用、缓冲区、RAF 节流，实现大数据下流畅滚动与无限加载。

```javascript
外层视口（.el-table-v2）
└── 滚动容器（监听 scroll，控制 scrollTop）
    ├── 占位高度容器（总高度 = 数据行数 × 行高，撑开滚动条）
    └── 可视渲染区（只渲染 10~20 行，用 transform 偏移）
```

1. 外层：固定宽高，overflow: hidden，作为视口。
2. 占位层：用一个空 div 设置总高度，让滚动条长度正确。
3. 渲染层：仅渲染可视行 + 缓冲区，通过 translateY 定位，制造 “完整列表” 的视觉。

### 源码级关键优化（面试常问）
1. DOM 复用：只创建可视数量的 <tr>，滚动时更新内容 + 改 transform，不销毁 / 新建行。
2. 缓冲区预渲染：endIndex = startIndex + visibleCount + 4，快滚不白屏。
3. requestAnimationFrame 节流：合并高频 scroll 事件，减少计算次数。
4. 行高缓存：动态行高时，渲染后缓存高度，下次直接用，不用重复计算。
5. 数据切片：永远只对 allData 做 slice，不操作原数组，保证响应式稳定。


### 滚动核心公式
```javascript
// 1. 从滚动位置算起始行
startIndex = Math.floor(scrollTop / rowHeight)

// 2. 可视区能放多少行
visibleCount = Math.ceil(clientHeight / rowHeight)

// 3. 结束行（前后多渲染 2~5 行做缓冲区，防白屏）
endIndex = startIndex + visibleCount + 4

// 4. 切片出要渲染的数据
visibleData = allData.slice(startIndex, endIndex)

// 5. 渲染区整体偏移，对齐滚动位置
offsetY = startIndex * rowHeight

// 6. 占位容器高度（决定滚动条总长）
placeholderHeight = allData.length * rowHeight
```