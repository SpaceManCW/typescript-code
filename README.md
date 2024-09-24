# Typescript

## 数据类型

**Javascript数据类型：**

1. string
2. number
3. boolean
4. null
5. undefined
6. bigint
7. symbol
8. object

> 其中object包括：Array、Function、Date、Errord等

**Typescript数据类型：**

1. 上述所有Javascript数据类型
2. 六个新类型
   1. any
   2. unknown
   3. never
   4. void
   5. tuple
   6. enum
3. 两个用于自定义类型的方式；
   1. type
   2. interface

> 在Javascript中的这些内置函数中：Number、String、Boolean，它们用于创建对应的包装对象，在日常开发中很少使用，在Typescript中也是同理，所以在Typescript中进行类型声明时，通常都是使用小写的number、string、boolean

> 原始类型和包装对象的区别：原始类型在内存中占用空间小，处理速度快。包装对象是复杂类型，在内存中占用空间大，Javascript在必要时会将原始类型包装成对象，以便调用方法或者访问属性

### any
将一个变量的类型设置为any就相当于放弃了对这个变量的类型检查，复制什么类型的数据都可以，但是不要轻易设置any:
any类型的变量可以赋值给任意类型并且不会报错，容易对其他的变量造成污染

### unknown
unknown相当于是比较安全的any，unknown类型不能赋值给其他类型，要赋值的话有两种方式
1. 进行类型判断
2. 使用断言
```ts
let a: unknown
a = 99
a = 'hello'
let x: string
x = a // 不可以将unknown类型赋值给string类型
if( typeof a === 'string' ) {
   x = a // 可以
}

x = a as string // 断言 可以
x = <string>a // 断言 可以
```

any和unknown的区别：
1. unknown比any安全，any可以赋值给任意类型unknown不行
2. any类型可以点调用任意方法，unknown不行，需要使用断言

### never
never的含义就是任何值都不是，就是不能有值，用来声明变量没有意义，大多用来限制函数的返回值，抛出异常的函数或者递归循环调用的函数

### void
void通常用于限制函数的返回值，意思就是空，认可返回undefined，或者不写return，调用者不能依赖其返回值做任何操作

### object
```ts
let a: object // a能存储的类型是-非原始类型
let b: Object // b能存储的是可以调用到Object方法的类型  除了null和undefined都能存
```
> 无论是object还是Object限制的类型都过于宽泛，不适合声明对象，那怎么声明对象呢

```ts
let person: {
   name: string,
   age?: number,
   [key: string]: any // 索引签名 键为字符串 值为任何类型都行
}

person = { name: 'tom', age: 18, city: '北京' }

// 函数声明
let count: (a: number, b: number) => number // 这就是ts的语法 不是箭头函数
count = function(a, b) { return a + b }

// 数组声明
let arr1: string[]
let arr2: Array<string> // 注意这里的Array是大写
```

### tuple
注意tuplu不是关键字，元组就是一种特殊的数据类型
```ts
let arr1: [string, number]
arr1 = ['hello', 100]
```

### enum
用来定义不可改变的常量
注意：
1. 枚举值不可修改
2. 数字枚举有反向映射，字符串枚举没有
3. 加一个const 变成常量枚举，会将枚举成员换成实际的值，好处就是减少生成的js代码量，提高性能
```ts
enum Directions {
   Up,
   Down,
   Left,
   Right
}
// 实际上是数字枚举  值是 0123 递增
```

### type
为任意类型创建一个别名
```ts
// 联合类型  其实就是 或 的关系
type Status = number | string // 注意这里是等于号不是冒号
type Gender = '男' ｜ '女'

function printStatus(data: Status):void {
   console.log(data)
}

function printGender(data: Status):void {
   console.log(data)
}

printStatus(404)
printStatus('404')

printGender('男')

// 交叉类型  其实就是 且 的关系
type Address = {
   num: number,
   cell: number
}

type Area = {
   width: number,
   height: number
}

type House = Address & Area // 代表House包含Address和Area的所有类型

const house: House = {
   num: 2,
   cell: 3,
   width: 100,
   height: 100
}
```

## 属性修饰符

1. public: 公开的，可以被类的内部、子类、类的外部访问
2. protected: 可以被类的内部、子类访问
3. private: 私有的，仅可被类内部访问
4. readonly: 只读，不可修改

使用修饰符可以对类进行简写

```ts
// 简写前
class Person {
   public name: string
   public age: number
   constructor(name: string, age: number) {
      this.name = name
      this.age = age
   }
}

// 简写后
class Person {
   constructor(public name: string, public age: number) {}
}
```

## 抽象类

抽象类是无法被实例化的类，专门用来定义类的结构和行为，类中可以写抽象方法，也可以写具体实现；抽象类主要用来为其派生类提供一个基础结构，派生类必须实现其中的抽象方法。

抽象类不能实例化，其意义是可以被继承，抽象类里可以有普通方法，也可以有抽象方法

```ts
abstract class Package {
   // 构造方法
   constructor( public weight: number ) {}
   // 抽象方法
   abstract calculate(): number
   // 具体方法
   printPackage() {
      console.log(`包裹重量为：${this.weight}kg 运费为：${this.calculate()}元`)
   }
}

class StandardPackage extends Package {
   // 当新的类没有自己的额外的属性时就不需要写constructor了
   // 由于有自己的unitPrice属性，要写constructor 注意要加上修饰符
   constructor(
      weight: number,
      public unitPrice: number
   ){ super(weight) }
   // 抽象方法的具体实现
   calculate():number {
      return this.weight * this.unitPrice
   }
}
```

## interface
interface是一种定义结构的方式，主要作用是为：类、对象、函数等规定一种契约，这样可以确保代码的一致性和类型的安全，但是要注意interface只能定义格式，不能包含任何实现

```ts
// 对类的结构进行规范
interface PersonInterface {
  name: string
  age: number
  speak(n: number): void
}

class Person  implements PersonInterface {
  constructor( public name: string, public age: number ){}
  speak(n: number): void {
    console.log('说话',n);
  }
}

// 接口也可以作为类型使用  来规范对象
interface UserInterface {
  name: string
  readonly gender: string // 只读属性不可修改
  age?: number // 可选属性
  run: (n: number) => void
} 

const a: number = 10

const user: UserInterface = {
  name: '张三',
  gender: '男',
  run(n: number) {
    console.log('跑步',n);
  }
}

// 接口还可以定义函数结构
interface CountInterface {
  (n1: number, n2: number): number
}

const count: CountInterface = (n1: number, n2: number) => {
  return  n1 + n2
}
```

接口之间可以进行继承

接口可以进行重复定义，内部的内容自动合并

> interface 和 type的区别
> 相同点：interface 和 type都可以用来定义对象结构，两者在许多场景中是可以互换的
> 不同点：
> 1. interface更专注于用来定义对象和类的结构，支持集成和合并
> 2. type可以定义类型别名，联合类型，交叉类型，但不支持集成和自动合并

## 泛型

泛型允许我们在定义函数、类或接口时，使用类型参数来表示未指定的类型，这些参数在具体使用时才被指定具体的类型，泛型可以让同一段代码适用于多种类型，同时仍然保持类型的安全性

```ts
// 泛型函数

function logData<T, U>(data1: T, data2: U) {
   console.log(data1, data2);
}

logData<number, boolean>(1, false)
logData<string, number>('hello', 10)

// 泛型接口
interface PersonInterface2<T> {
  name: string,
  age: number,
  extraInfo: T
}

let p: PersonInterface2<number> = {
  name: '张三',
  age: 18,  
  extraInfo: 250
}

// 泛型类
class Hero<T> {
  constructor(public name: string, public skill: T){}
}
```

## 类型声明文件
类型声明文件是Typescript中的一种特殊文件，通常以.d.ts作为扩展名。它的主要作用是为现有的Javascript代码提供类型信息，使得Typescript能够在使用这些Javascript模块时能进行类型检查和提示