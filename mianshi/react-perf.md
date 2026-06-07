### 性能优化

1. 渲染优化

- 业务组件全部使用 React.memo
- 传递函数必须用 useCallback
- 传递对象 / 计算结果必须用 useMemo
- 禁止在 JSX 中写匿名函数、对象、数组
- 拆分小组件，缩小渲染范围
```javascript
// 企业级标准写法
const Page = () => {
  const [data, setData] = useState([]);

  // 函数缓存
  const handleClick = useCallback((id) => {
    setData(prev => prev.filter(item => item.id !== id));
  }, []);

  // 计算值缓存
  const filteredData = useMemo(() => 
    data.filter(item => item.status === 1), 
  [data]);

  // 子组件缓存
  const ListItem = React.memo(({ item, onClick }) => <div onClick={onClick} />);

  return <ListItem item={item} onClick={handleClick} />
};
```

2. 长列表大数据渲染优化

- 虚拟列表（react-virtualized /react-window）
- 只渲染可视区域，性能提升 10~100 倍
- 表格组件替换为 antd5 + virtualized
- 分页 + 懒加载 + 滚动加载
- 关闭 unnecessary 展开行 / 复杂 DOM
- 搜索防抖（delay 300ms）

3. 首屏加载优化

- 骨架屏（Skeleton） 降低用户等待焦虑
- 路由预加载
- 接口请求提前（Suspense + 接口缓存）
- 关键路由优先加载
- HTTP 缓存（强缓存 + 协商缓存）
- 接口合并、接口缓存

4. 图片优化
- 所有图片 WebP 格式
- 图片懒加载（loading="lazy"）
- 小图片转 Base64
- 大图使用缩略图
- SVG 代替 PNG/JPG
- 使用图片 CDN