interface callback {
  (): void
}

interface stack {
  evName: string,
  evCb: callback
}

interface Options {
  stack: Array<stack>,
  step: number | 1000
}

export class MyInterVal {
  timer: number | undefined
  stack: Array<stack>
  constructor (options: Options) {
    this.stack = options.stack
    this.init(options.step)
  }

  // life style
  init (step: number):void {
    this.timer = setInterval(() => {
      if (this.stack.length < 1) this.destory()
      this.stack.forEach(_stack => {
        _stack.evCb()
      })
    }, step)
  }

  destory ():void {
    if (this.timer) clearInterval(this.timer)
  }

  // common func
  getStack (eventName: string): stack | null {
    return this.stack.find(_event => _event.evName === eventName) || null
  }

  bind (event: stack):void {
    if (!this.getStack(event.evName)) {
      this.stack.push(event)
    }
  }

  unbind (event:stack): void {
    const index = this.stack.findIndex(_event => _event.evName === event.evName)
    if (index) {
      this.stack.splice(index, 0)
    }
  }
}
