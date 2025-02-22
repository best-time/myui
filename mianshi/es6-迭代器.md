

```javascript
let obj = {
	arr: [2,34,1,4,1,2,4],
	[Symbol.iterator]() {
		let _this = this
		let index = 0
		return {
			next: function() {
				if(index< _this.arr.length) {
					return {value: _this.arr[index++], done: false}
				}
				return {value: undefined, done: true}
			}
		}
	}
}



class List {
    constructor() {
        this.index = 0;
        this.data = arguments;
    }

    [Symbol.iterator]() {
        return {
            next: () => {
                if (this.index < this.data.length) {
                    return { value: this.data[this.index++], done: false};
                }
                this.index = 0;
                return {done: true, value: undefined};
            }
        }
    }
}


let list = new List("小玲", "小霞", "小星", "小民");
let iter = list[Symbol.iterator]();
console.log(iter.next());    // { value: '小玲', done: false }
console.log(iter.next());    // { value: '小霞', done: false }
console.log(iter.next());    // { value: '小星', done: false }
console.log(iter.next());    // { value: '小民', done: false }
console.log(iter.next());    // { done: true, value: undefined }


```