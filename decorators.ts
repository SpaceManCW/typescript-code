// 类装饰器的应用
function CoustomString(target: Function) {
  target.prototype.toString = function () {
    return JSON.stringify(this);
  }
}
@CoustomString
class Animal {
  constructor(public name: string, public age: number) {}
}
const dog = new  Animal('dog', 10);
console.log('装饰器测试', dog.toString());

// new 表示这是一个构造函数类型
// args 表示可以接受任意数量，任意类型的参数
// => {} 表示返回一个对象
type Constructor = new (...args: any[]) => {};

function GetTime(n: number) {
  return function<T extends Constructor>(target: T) {
    return class extends target {
      createTime: Date
      constructor(...args: any[]) {
        super(...args);
        this.createTime = new Date();
      }
      getTime() {
        return `这个对象创建于${this.createTime}`
      }
      getN() {
        return `接受的参数是${n}`
      }
    }
  }
  
}

@GetTime(3)
class Fruit {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age
  }
}
interface Fruit {
  getTime:() => string
  getN: () => string
}
const apple = new Fruit( 'apple', 10)
console.log(apple.getN());

// 属性装饰器的应用
/**
 * @param target 对于静态属性来说是类  对于实例属性来说是类的原型对象
 * @param propertyKey 属性名
 */
function Demo(target:object, propertyKey:string) {
  console.log('属性装饰器', target, propertyKey);
}

function State(target:object, propertyKey:string) {
  let key = `__${propertyKey}`
  Object.defineProperty(target, propertyKey,{
    get() {
      return this[key]
    },
    set(val) {
      // 在这里可以添加一些业务代码
      console.log('执行age的属性装饰器');
      this[key] = val
    }
  })
}

class TestClass {
  @Demo name: string
  @State age: number
  @Demo static school: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

const T1 = new TestClass('张三', 10)
const T2 = new TestClass('李四', 20)
T1.age = 30
T2.age = 40
console.log('年龄',T1.age, T2.age);

// 方法装饰器，可以在方法执行前后执行一些逻辑
function Logger(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
  // 存储原始方法
  const oldValue = descriptor.value
  descriptor.value = function(...args: any[]) {
    console.log('方法执行前');
    // 注意 不要让this丢失  调用该方法的是实例化的对象
    const result = oldValue.apply(this, args)
    console.log('方法执行后');
    return result
  }
}
class TestClass2 {
  constructor(public name:string, public age:number){}
  @Logger speak(word: string) {
    console.log('说话', word); 
  }
}

const T3 = new TestClass2('张三', 10)
T3.speak('hello')
