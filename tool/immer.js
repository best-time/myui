function immer(state, thunk) {
     // draft.company.name    过程是: 先get  再 set
    let copies = new Map()

    const handler = {
        set(target, prop, value) {
            const copy = {...target} // 浅拷贝
            copy[prop] = value // 对象赋值
            copies.set(target, copy)
        },
        get(target, prop) { // 增加一个get劫持, 返回proxy
            return new Proxy(target[prop], handler)
        }
    }

    function finalize(state) {
        const result = {...state}
        Object.keys(state).map(key => {
            const copy = copies.get(state[key])
            if(copy) {// 如果有 copy 表示被修改过
                result[key] = copy // 就是用修改后的内容
            } else {
                result[key] = state[key] // 否则还是保留原来的内容
            }
        })
        return result
    }

    const proxy = new Proxy(state, handler)
    thunk(proxy)
    return finalize(state)
}



const state = {
    "phone": "1-770-736-8031 x56442",
    "website": {site: "hildegard.org"}, // 注意这里为了方便测试状态共享，将简单数据类型改成了对象
    "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
    }
};

const copy = immer(state, draft => {
    draft.company.name = 'google';
});

console.log(copy.company.name); // 'google'
console.log(copy.website === state.website); // true

