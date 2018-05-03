// global datastore
let store = { meals: [], customers: [], deliveries: [] };

let customerClassId = 0;
let mealClassId = 0;
let deliveryClassId = 0;

class Customer {
  constructor(name) {
    this.id = ++customerClassId;
    this.name = name;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }

  meals() {
    let meals = []
    this.deliveries().map(delivery => {
      if(!meals.includes(delivery.meal())) {
        meals.push(delivery.meal())
      }
    })
    return meals
  }

  totalSpent() {
    let prices = [];
    this.meals().map(meal => {
      prices.push(meal.price)
    })
    return prices.reduce(function(acc, val) { return acc + val; });
  }
}

class Delivery {
  constructor(mealId, customerId) {
    this.id = ++deliveryClassId;
    this.mealId = mealId;
    this.customerId = customerId;
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }

  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId
    })
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++mealClassId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    })
  }

  customers() {
    let customers = [];
    this.deliveries().map(delivery => {
      if(!customers.includes(delivery.customer())) {
        customers.push(delivery.customer())
      }
    })
    return customers;
  }

  static byPrice() {
    return store.meals.sort(function(a, b){return b.price-a.price})
  }
}
