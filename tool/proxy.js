
// 1、验证
// 您可以使用Proxy类在访问或修改对象属性之前对其进行验证。这在您希望对对象属性强制执行某些规则的情况下非常有用，
// 例如确保它们具有特定的数据类型，或确保它们落在某个特定范围内。


const person = {
    name: 'John',  // 人的名字
    age: 30,  // 人的年龄
};

const validator = {
    set(target, key, value) {
        // 在设置属性值时，如果属性名称是'age'，并且属性值不是数字类型，就抛出类型错误
        if (key === 'age' && typeof value !== 'number') {
            throw new TypeError('Age must be a number');
        }
        // 否则，将属性值设置到目标对象上
        target[key] = value;
        // 并返回true
        return true;
    },
};

// 创建一个代理对象，将目标对象和验证器对象传递给Proxy类的构造函数
const personProxy = new Proxy(person, validator);

// 尝试将age属性设置为字符串类型的'30'，将抛出类型错误
personProxy.age = '30'; // 抛出类型错误：Age must be a number
// 在这里，我们创建了一个人(person)对象和一个验证器(validator)对象，用于检查年龄(age)属性是否为数字类型。然后，
// 我们使用Proxy类创建了一个personProxy对象，将person对象和validator对象传递给它。当我们试图将personProxy对象的age属性设置为非数字值时，
// 将抛出一个TypeError类型的错误，阻止属性被设置。

// 2、缓存
// 您可以使用Proxy类缓存对象属性值，这可以通过减少需要重新计算已计算过的值的需求来提高性能。

// 让我们看一个例子：

// 一个耗时的计算函数，将生成随机数
const expensiveCalculation = () => {
    console.log('正在执行耗时计算...');
    return Math.random();
};

// 一个用于缓存计算结果的Map对象
const cache = new Map();

// 创建一个代理对象，使用Proxy类的apply()方法来拦截函数的调用
const calculationProxy = new Proxy(expensiveCalculation, {
    apply(target, thisArg, args) {
        // 将函数调用的参数作为缓存的键，用下划线连接起来
        const cacheKey = args.join('_');
        // 如果缓存中没有这个键，则执行计算函数并将结果存入缓存
        if (!cache.has(cacheKey)) {
            cache.set(cacheKey, target.apply(thisArg, args));
        }
        // 返回缓存中的值
        return cache.get(cacheKey);
    },
});

// 第一次调用计算函数时，会执行计算操作，并将结果存入缓存
console.log(calculationProxy()); // 输出 "正在执行耗时计算..." 和计算结果 0.5932315027880835

// 第二次调用计算函数时，不会执行计算操作，而是直接从缓存中取出结果
console.log(calculationProxy()); // 直接输出缓存中的结果 0.5932315027880835
// 在上面的示例代码中，我们定义了一个耗时的计算函数和一个缓存对象，用于存储之前计算的结果。然后，我们使用Proxy类创建了一个calculationProxy对象，
// 将expensiveCalculation函数和一个包含apply方法的新对象传递给它，该方法在执行计算之前检查缓存。当我们多次调用calculationProxy函数时，
// 耗时计算的结果仅计算一次，然后缓存在后续调用中使用，从而显著提高性能。

// 3、记录日志
// 您可以使用Proxy类记录对象属性访问和修改事件，这对于调试或审计目的非常有用。

// 让我们实现一个例子：

const person = {
    name: 'John',  // 人的名字
    age: 30,  // 人的年龄
};

// 一个日志记录器对象，使用Proxy类的get()和set()方法来拦截对象属性的访问和修改
const logger = {
    get(target, key) {
        // 在获取属性值时，记录访问日志
        console.log(`访问了属性: ${key}`);
        return target[key];
    },
    set(target, key, value) {
        // 在设置属性值时，记录修改日志
        console.log(`修改了属性: ${key}`);
        target[key] = value;
        return true;
    },
};

// 创建一个代理对象，将目标对象和日志记录器对象传递给Proxy类的构造函数
const personProxy = new Proxy(person, logger);

// 访问age属性时，将记录访问日志
personProxy.age; // 输出 "访问了属性: age"

// 修改age属性时，将记录修改日志
personProxy.age = 40; // 输出 "修改了属性: age"
// 在上面的示例代码中，我们定义了一个人(person)对象和一个日志记录器(logger)对象，用于记录属性访问和修改事件。然后，
// 我们使用Proxy类创建了一个personProxy对象，将person对象和logger对象传递给它。当我们访问或修改personProxy对象的属性时，
// 将调用日志记录器，导致日志消息被打印到控制台上。

// 4、访问控制
// 您可以使用Proxy类实现对象属性的访问控制。这在您希望基于用户权限限制对某些属性的访问的情况下非常有用。

// 让我们来看看它的实现：

const user = {
    name: 'John',  // 用户名
    email: 'john@example.com',  // 用户邮箱
    isAdmin: false,  // 是否是管理员
};

// 一个访问控制器对象，使用Proxy类的get()方法来拦截对象属性的访问
const accessControl = {
    get(target, key) {
        // 如果用户不是管理员，且试图访问email属性，则抛出错误
        if (key === 'email' && !target.isAdmin) {
            throw new Error('拒绝访问');
        }
        // 否则，返回属性值
        return target[key];
    },
};

// 创建一个代理对象，将目标对象和访问控制器对象传递给Proxy类的构造函数
const userProxy = new Proxy(user, accessControl);

// 访问name属性时，将返回属性值
console.log(userProxy.name);  // 输出 "John"

// 访问email属性时，因为用户不是管理员，将抛出错误
console.log(userProxy.email);  // 抛出错误："拒绝访问"
// 在上面的示例代码中，我们创建了一个用户(user)对象，包含属性name、email和isAdmin。然后，我们创建了一个访问控制器(accessControl)对象，
// 包含get方法，用于根据isAdmin属性检查是否可以访问email属性。最后，我们使用Proxy类创建了一个userProxy对象，将user对象和accessControl对象传递给它。
//
// 当我们试图访问userProxy对象的name属性时，访问控制器对象的get方法不会被调用，因为name属性没有访问限制。但是，如果我们试图访问userProxy对象的email属性，并且isAdmin属性为false，则会抛出错误，阻止对email属性的访问。
//
// 5、虚拟属性
// 您可以使用Proxy类创建虚拟属性，这些属性实际上不存储在对象上，而是在访问时动态计算。这对于您想要在对象上公开不是实际数据模型的附加属性的情况非常有用。
//
// 例如，我们使用Proxy创建一个虚拟属性，根据矩形对象的宽度和高度属性实时计算其面积：

const rectangle = {
    width: 10,  // 矩形的宽度
    height: 20  // 矩形的高度
};

// 创建一个代理对象，将目标对象和一个拦截器对象传递给Proxy类的构造函数
const rectangleProxy = new Proxy(rectangle, {
    // 拦截器对象的get()方法，用于获取对象属性的值
    get: function(target, property) {
        // 如果请求获取的属性是"area"，则返回计算出的面积值
        if (property === 'area') {
            return target.width * target.height;
        } else {
            // 否则，返回目标对象的对应属性值
            return target[property];
        }
    }
});

// 访问矩形对象的各个属性和虚拟属性area
console.log(rectangleProxy.width); // 输出 "10"
console.log(rectangleProxy.height); // 输出 "20"
console.log(rectangleProxy.area); // 输出 "200"
// 在这个示例中，我们在Proxy对象上定义了一个get拦截器，用于拦截对area属性的访问。当访问area属性时，拦截器会根据原始对象的width和height属性计算面积，并返回结果。对于所有其他属性，拦截器会将访问转发到原始对象。这样，我们就创建了一个虚拟属性area，它并不实际存储在对象上，而是在访问时动态计算。

/*
6、包装对象
您可以使用Proxy类在不修改原始对象的情况下为对象添加额外的功能。这在您想要扩展对象的功能，但不想直接修改其行为的情况下非常有用。

让我们创建一个小的演示。我们将使用Proxy在对象上包装额外的功能，以记录对其属性的每个访问：
*/
const originalObject = {
    property1: 'value1',  // 原始对象的属性1
    property2: 'value2'   // 原始对象的属性2
};

// 创建一个代理对象，将原始对象和一个拦截器对象传递给Proxy类的构造函数
const loggingProxy = new Proxy(originalObject, {
    // 拦截器对象的get()方法，用于获取对象属性的值
    get: function(target, property) {
        console.log(`Getting property "${property}"`); // 记录访问的属性名
        return target[property];  // 返回原始对象对应属性的值
    },
    // 拦截器对象的set()方法，用于设置对象属性的值
    set: function(target, property, value) {
        console.log(`Setting property "${property}" to "${value}"`); // 记录设置的属性名和属性值
        target[property] = value;  // 设置原始对象对应属性的值
    }
});

// 访问代理对象的属性
loggingProxy.property1; // 输出 "Getting property "property1""
loggingProxy.property2 = 'new value'; // 输出 "Setting property "property2" to "new value""
// 正如上面的示例代码所示，我们在Proxy对象上定义了get和set拦截器，用于拦截对其属性的访问或修改。这些拦截器将属性名称和值记录在控制台上，然后将访问或修改转发到原始对象。这样，我们就可以在不直接修改其行为的情况下为任何对象添加日志功能。
