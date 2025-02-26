### props和State
Props（属性）：

定义：Props 是组件之间传递数据的一种方式。父组件可以通过 props 向子组件传递数据。
不可变：Props 是只读的，子组件不能修改传入的 props。
用途：用于配置组件的行为和外观。

State（状态）：

定义：State 是组件内部的状态，用于存储组件的数据。
可变：State 是可变的，可以通过 setState 方法更新。
用途：用于管理组件的内部状态，控制组件的行为和渲染。

区别：

来源：Props 来自父组件，State 是组件自身的状态。
可变性：Props 是只读的，State 是可变的。
用途：Props 用于配置组件，State 用于管理组件的内部状态。

### 创建组件
```javascript
// 函数组件
const MyComponent = (props) => {
	return <div>Hello, {props.name}!</div>;
};

// 类组件
class MyComponent extends React.Component {
	render() {
		return <div>Hello, {this.props.name}!</div>;
	}
}

```
```text
区别:

函数组件：

定义：函数组件是一个简单的 JavaScript 函数，接收 props 作为参数，返回 JSX。
优点：代码更简洁，性能更好（因为没有类的开销）。
限制：早期版本的函数组件不支持生命周期方法和状态管理，但随着 Hooks 的引入，这些限制已经被解除。

类组件：

定义：类组件是继承自React.Component的 ES6 类，可以定义生命周期方法和管理状态。
优点：支持生命周期方法和状态管理，功能更强大。
缺点：代码相对复杂，性能略逊于函数组件。

```

### refs
使用方法：

创建 Ref：使用 useRef Hook 或 React.createRef。
附加 Ref：将 Ref 附加到需要访问的 DOM 节点或组件实例。
访问 Ref：通过 ref.current 访问 DOM 节点或组件实例。

```javascript
import React, { useRef } from 'react';

const App = () => {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
};

export default App;

```

### 使用redux
```javascript
// 创建reducer
const initialState = { count: 0 };

const counterReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return { ...state, count: state.count + 1 };
		case 'DECREMENT':
			return { ...state, count: state.count - 1 };
		default:
			return state;
	}
};


// 创建store
import { createStore } from 'redux';
import counterReducer from './counterReducer';

const store = createStore(counterReducer);


// 提供store
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);


// 链接组件
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
	const count = useSelector(state => state.count);
	const dispatch = useDispatch();

	const increment = () => dispatch({ type: 'INCREMENT' });
	const decrement = () => dispatch({ type: 'DECREMENT' });

	return (
		<div>
			<h1>Count: {count}</h1>
			<button onClick={increment}>Increment</button>
			<button onClick={decrement}>Decrement</button>
		</div>
	);
};

export default Counter;


```


### Context Api
Context API 是 React 提供的一种在组件树中传递数据的机制，无需通过 props 逐层传递。
区别：

简单性：Context API 更简单，适合小型应用或局部状态管理。
性能：Context API 在状态变化时会重新渲染所有订阅的组件，可能会影响性能。
功能：Redux 功能更强大，适合大型应用和全局状态管理，提供了更多的工具和中间件支持。



```javascript
import React, { createContext, useContext, useState } from 'react';

// 创建 Context
const ThemeContext = createContext();

// 提供 Context
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


```
**使用 Context**
```javascript

const App = () => {
  return (
    <ThemeProvider>
      <Header />
      <Content />
    </ThemeProvider>
  );
};

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </header>
  );
};

const Content = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
      <h1>Welcome to the App</h1>
    </div>
  );
};

```


### 生命周期

React 组件的生命周期可以分为三个阶段：挂载（Mounting）、更新（Updating）和卸载（Unmounting）

- 挂载阶段（Mounting）


- - constructor(props) ：
  作用：初始化组件的 state 和绑定事件处理器。
  调用时机：组件实例被创建时。



- - static getDerivedStateFromProps(props, state) ：
作用：在组件实例被创建和更新时调用，用于根据 props 更新 state。
调用时机：组件实例被创建和每次更新之前。



- - render() ：
作用：返回组件的 JSX，描述 UI 的结构。
调用时机：组件实例被创建和每次更新时。



- - componentDidMount() ：
作用：组件挂载完成后调用，通常用于发起网络请求、设置定时器等。
调用时机：组件首次渲染到 DOM 后。



- 更新阶段（Updating）


- - static getDerivedStateFromProps(props, state) ：
作用：在组件更新时调用，用于根据新的 props 更新 state。
调用时机：组件接收到新 props 或 state 变化时。



- - shouldComponentUpdate(nextProps, nextState) ：
作用：决定组件是否需要重新渲染，默认返回true。
调用时机：组件接收到新 props 或 state 变化时。



- - render() ：
作用：返回组件的 JSX，描述 UI 的结构。
调用时机：组件实例被创建和每次更新时。



- - getSnapshotBeforeUpdate(prevProps, prevState) ：
作用：在组件更新前捕获一些信息，这些信息可以在 componentDidUpdate 中使用。
调用时机：组件更新前。



- - componentDidUpdate(prevProps, prevState, snapshot) ：
作用：组件更新完成后调用，通常用于更新 DOM 或发起网络请求。
调用时机：组件更新后。



- 卸载阶段（Unmounting）


- - componentWillUnmount() ：
作用：组件卸载前调用，通常用于清理工作，如取消网络请求、清除定时器等。
调用时机：组件从 DOM 中移除前。


### hooks
解决的问题：

- 状态管理：在函数组件中管理状态，而不需要转换为类组件。
- 生命周期方法：在函数组件中使用生命周期方法，而不需要编写复杂的类组件。
- 逻辑复用：通过自定义 Hooks 复用组件逻辑，提高代码复用性。
- 代码简洁：使得函数组件的代码更加简洁和易读。

```text
常用 Hooks：

useState：用于在函数组件中添加状态。
useEffect：用于在函数组件中执行副作用操作，如数据获取、订阅或手动更改 DOM。
    useEffect会在第一次渲染和更新之后都会执行，
    相当于在componentDidMount和componentDidUpdate两个生命周期函数中执行回调
    如果返回函数, 相当于componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个生命周期函数的组合

useContext：用于在函数组件中访问 React 的 Context。
useReducer：用于在函数组件中管理复杂的状态逻辑。
useMemo：用于 memoize 计算结果，避免不必要的计算。
useCallback：用于 memoize 回调函数，避免不必要的重新渲染。
useRef：用于在函数组件中创建一个可变的引用对象。
useImperativeHandle：用于自定义暴露给父组件的实例值。
useLayoutEffect：与useEffect类似，但在所有的 DOM 变更之后同步调用。
useDebugValue：用于在 React DevTools 中显示自定义 Hooks 的标签。

```

### useEffect
```javascript
useEffect(() => {    document.title = `You clicked ${count} times`;  });

// 传入第二个参数后，如果 count 的值是 5，而且我们的组件重渲染的时候 count 还是等于 5，
// React 将对前一次渲染的 [5] 和后一次渲染的 [5] 进行比较，如果是相等则跳过effects执行
useEffect(() => {
	document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新


useEffect(() => {
    function handleStatusChange(status) {
        setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
        ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
});
```

### Code Splitting
实现方法：

动态导入：使用 import() 语法动态导入模块。
React.lazy 和 Suspense：结合 React.lazy 和 Suspense 实现组件的懒加载。
```javascript
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = React.lazy(() => import('./components/Home'));
const About = React.lazy(() => import('./components/About'));

// lazy loading
const HeavyComponent = lazy(() => import('./HeavyComponent'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Suspense>
  </Router>
);

export default App;

```


### Memoization
实现方法：

useMemo：用于 memoize 计算结果。
useCallback：用于 memoize 回调函数。

```javascript
import React, { useMemo, useCallback } from 'react';

const ExpensiveComponent = ({ count }) => {
  const expensiveCalculation = useMemo(() => {
    console.log('Performing expensive calculation');
    return count * 1000;
  }, [count]);

  return <div>Expensive Calculation Result: {expensiveCalculation}</div>;
};

const ParentComponent = () => {
  const [count, setCount] = React.useState(0);
  const [text, setText] = React.useState('');

  const increment = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  return (
    <div>
      <h1>Count: {count}</h1>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <ExpensiveComponent count={count} />
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default ParentComponent;

```



### 性能优化

#### Key：

作用：在列表渲染中，为每个列表项提供一个唯一的标识符，帮助 React 识别哪些项发生了变化、添加或删除。
好处：提高虚拟 DOM 的 diff 效率，减少不必要的重新渲染。



#### Code Splitting：

作用：将应用的代码分割成多个小块，按需加载。
好处：减少初始加载时间，提高首屏渲染速度。



#### Lazy Loading：

作用：延迟加载组件，直到需要时才加载。
好处：减少初始加载时间，提高应用性能。



#### Memoization：

作用：缓存计算结果，避免不必要的重复计算。
好处：提高组件的渲染性能，减少计算开销。



#### React.memo：

作用：对函数组件进行浅比较，如果 props 没有变化，则跳过重新渲染。
好处：减少不必要的重新渲染，提高性能。



#### ShouldComponentUpdate：

作用：在类组件中，通过返回布尔值来决定组件是否需要重新渲染。
好处：减少不必要的重新渲染，提高性能。



#### PureComponent：

作用：继承自React.PureComponent的组件会进行浅比较，如果 props 和 state 没有变化，则跳过重新渲染。
好处：减少不必要的重新渲染，提高性能。



#### UseCallback 和 useMemo：

作用：分别用于 memoize 回调函数和计算结果，避免不必要的重新渲染和计算。
好处：提高组件的渲染性能，减少计算开销。



#### Profiler API：

作用：用于测量应用的性能，找出性能瓶颈。
好处：帮助开发者优化应用性能，提高用户体验。


### Diff原理

把树形结构按照层级分解，只比较同级元素。
列表结构的每个单元添加唯一的 key 属性，方便比较。
React 只会匹配相同 class 的 component（这里面的 class 指的是组件的名字）
合并操作，调用 component 的 setState 方法的时候, React 将其标记为 dirty 到每一个事件循环结束, React 检查所有标记 dirty 的 component 重新绘制.
选择性子树渲染。开发人员可以重写 shouldComponentUpdate 提高 diff 的性能。


### 虚拟dom提高性能?
虚拟dom相当于在js和真实dom中间加了一个缓存，利用dom diff算法避免了没有必要的dom操作，从而提高性能。
具体实现步骤如下：
用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中
当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了。


### setState是同步还是异步?
在React中，setState()函数通常被认为是异步的，这意味着调用setState()时不会立刻改变react组件中state的值，
setState通过触发一次组件的更新来引发重绘，多次setState函数调用产生的效果会合并
调用 setState时，React会做的第一件事情是将传递给 setState的对象合并到组件的当前状态。
这将启动一个称为和解（reconciliation）的过程。和解（reconciliation）的最终目标是以最有效的方式，
根据这个新的状态来更新UI。 为此，React将构建一个新的 React元素树（您可以将其视为 UI 的对象表示）。
一旦有了这个树，为了弄清 UI 如何响应新的状态而改变，React 会将这个新树与上一个元素树相比较

### 什么是fiber，fiber解决了什么问题
React15 的 StackReconciler 方案由于递归不可中断问题，如果 Diff 时间过长（JS计算时间），
会造成页面 UI 的无响应（比如输入框）的表现，vdom 无法应用到 dom 中。
为了解决这个问题，React16 实现了新的基于 requestIdleCallback 的调度器
（因为 requestIdleCallback 兼容性和稳定性问题，自己实现了 polyfill），
通过任务优先级的思想，在高优先级任务进入的时候，中断 reconciler。
为了适配这种新的调度器，推出了 FiberReconciler，
将原来的树形结构（vdom）转换成 Fiber 链表的形式（child/sibling/return），
整个 Fiber 的遍历是基于循环而非递归，可以随时中断。
更加核心的是，基于 Fiber 的链表结构，对于后续（React 17 lane 架构）的异步渲染
和 （可能存在的）worker 计算都有非常好的应用基础


### React事件机制和原生DOM事件流有什么区别
react中的事件是绑定到document上面的，
原生的事件是绑定到dom上面的，
因此相对绑定的地方来说，dom上的事件要优先于document上的事件执行
