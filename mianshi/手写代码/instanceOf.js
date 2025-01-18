function instanceOf(ins, obj) {
  let proto = Object.getPrototypeOf(ins);
  while (true) {
    if (proto === null) {
      return false;
    }
    if (proto === obj.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
}

function A() {}
function B() {}

const a = new A()
const b = new B()

console.log(instanceOf(a, A))
console.log(instanceOf(b, A))
