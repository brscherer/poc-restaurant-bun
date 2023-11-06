interface OrderItem {
  name: string
  timeToPrepare: number
}

interface Order {
  number?: number
  items?: OrderItem[]
  timeToPrepareOrder?: number
  estimatedWaitingTime?: number
}

interface Dish {
  name: string,
  timeToPrepare: number
}

class Pizza implements Dish {
  name = "PIZZA"
  timeToPrepare = 10
}
class Hamburger implements Dish {
  name = "HAMBURGER"
  timeToPrepare = 5
}
class Burrito implements Dish {
  name = "BURRITO"
  timeToPrepare = 3
}
class Sushi implements Dish {
  name = "SUSHI"
  timeToPrepare = 8
}

class OrderBuilder {
  private order: Order = {}

  constructor(restaurant: Restaurant) {
    this.order = {
      number: restaurant.getOrdersLeft() + 1,
      estimatedWaitingTime: restaurant.getTotalWaitingTime(),
      items: []
    }
  }

  addItem(item: OrderItem | null) {
    if (!item) return this
    console.log(`Added ${item.name} to order number ${this.order.number}`)
    this.order.items?.length ? this.order.items?.push(item) : this.order.items = [item]
    return this
  }

  finish() {
    const timeToPrepareOrder = this.order.items?.reduce((acc, curr) => {
      acc += curr.timeToPrepare ?? 0
      return acc
    }, 0) ?? 0
    const result = { 
      ...this.order,
      timeToPrepareOrder,
      estimatedWaitingTime: (this.order.estimatedWaitingTime ?? 0) + timeToPrepareOrder
    }
    this.order = {}
    return result
  }
}

class Restaurant {
  private menu: Dish[]
  private orders: Order[]
  private currentTimeout: Timer | null = null

  constructor() {
    this.orders = []
    this.buildMenu()
  }

  private buildMenu() {
    this.menu = [new Pizza(), new Hamburger(), new Burrito(), new Sushi()]
  }

  private startTimer() {
    const currentOrder = this.orders[0]

    if(currentOrder) {
      this.currentTimeout = setTimeout(() => {
        console.log(`Order ${currentOrder.number} delivered.`);
        this.dequeue()
        this.reportState()
      }, (currentOrder.timeToPrepareOrder ?? 0) * 1000)
    }
  }

  private clearTimer() {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout)
    }
  }

  addOrder(order: Order): void {
    this.orders.push(order)

    if (this.orders.length === 1) {
      this.startTimer()
    }
  }

  dequeue() {
    this.orders.shift()
    if (this.orders.length > 0 ) {
      this.startTimer()
    } else {
      this.clearTimer()
    }
  }

  getTotalWaitingTime(): number {
    return this.orders.reduce((acc, curr) => {
      acc += curr.timeToPrepareOrder ?? 0
      return acc
    }, 0)
  }

  getOrdersLeft(): number {
    return this.orders.length
  }

  getMenuItem(dish: string): OrderItem | null {
    const dishItem = this.menu.find(item => item.name === dish)
    if (!dishItem) {
      console.log(`Dish ${dish} not found`)
      return null
    }
    return dishItem
  }

  reportState() {
    console.log(`
    Total Orders Left: ${this.getOrdersLeft()}
    Aprox. Waiting Time: ${this.getTotalWaitingTime()}
    `)
  }
}

const restaurant = new Restaurant()
const firstOrder = new OrderBuilder(restaurant).addItem(restaurant.getMenuItem("PIZZA")).finish()
restaurant.addOrder(firstOrder)

const secondOrder = new OrderBuilder(restaurant).addItem(restaurant.getMenuItem("SUSHI")).addItem(restaurant.getMenuItem("HAMBURGER")).finish()
restaurant.addOrder(secondOrder)

const thirdOrder = new OrderBuilder(restaurant).addItem(restaurant.getMenuItem("HAMBURGER")).addItem(restaurant.getMenuItem("BURRITO")).finish()
restaurant.addOrder(thirdOrder)

restaurant.reportState()

