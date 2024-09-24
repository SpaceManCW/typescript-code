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

interface CountInterface {
  (n1: number, n2: number): number
}

const count: CountInterface = (n1: number, n2: number) => {
  return  n1 + n2
}

// 泛型用在函数上  可以使用多个
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
