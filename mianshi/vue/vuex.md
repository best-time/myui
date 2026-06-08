## vue

```javascript
//State
	 mapState({
	    // 箭头函数可使代码更简练
	    count: state => state.count,

	    // 传字符串参数 'count' 等同于 `state => state.count`
	    countAlias: 'count',

	    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
	    countPlusLocalState (state) {
	      return state.count + this.localCount
	    }
	  })
//Getters
	 getters: {
	    doneTodos: (state, getters) => { // 接受其他 getter 作为第二个参数
	      return state.todos.filter(todo => todo.done)
	    },
		getTodoById: (state) => (id) => { // 通过方法访问 每次都会去调用, 不缓存结果
		    return state.todos.find(todo => todo.id === id)
		  }
	  }
	  // 组件中使用:
		computed: {
		  doneTodosCount () {
		    return this.$store.getters.doneTodosCount
		  },
		 // 使用对象展开运算符将 getter 混入 computed 对象中
		...mapGetters([
		  'doneTodosCount',
		  'anotherGetter',
		  // ...
		])
	  }
	  // 取别名同 mapState

//Mutations
	mutations: {
	    increment (state) {
	      // 变更状态
	      state.count++
	    }
	  }
	store.commit('increment')
	//1.  当需要在对象上添加新属性时，你应该
	//使用 `Vue.set(obj, 'newProp', 123)`, 或者
   // 以新对象替换老对象。例如，利用[对象展开运算符 (opens new window)]
   // state.obj = { ...state.obj, newProp: 123 }

	methods: {
	    ...mapMutations([
	      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

	      // `mapMutations` 也支持载荷：
	      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
	    ]),
	    ...mapMutations({
	      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
	    })
	  }
Actions
Modules
```
