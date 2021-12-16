class MyPromise {
  constructor (options:any) {
    console.log(options)
  }

  set state (val: string) {
    this.state = ''
  }
}

const p1 = new MyPromise({})

console.log(p1)
