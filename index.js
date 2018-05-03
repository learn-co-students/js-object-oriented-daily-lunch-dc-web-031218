// global datastore
let store = { meals: [], customers: [], deliveries: [] };

class Customer {
  constructor(name) {
    this.name = name;
    store.customers.push(this);
    this.id = store.customers.length-1;
  }

  deliveries() {
    let allDeliveries = [];
    store.deliveries.map(delivery => {
      if (delivery.customerId === this.id){
        allDeliveries.push(delivery)
      }
    })
    return allDeliveries
  }

  meals() {
    let allMeals = [];
    store.meals.map(meal => {
      this.deliveries().forEach(delivery => {
        if (meal.id === delivery.mealId){
          allMeals.push(meal)
        }
      })
    })
    let uniqueMeals = [...new Set(allMeals)]
    // debugger;
    return uniqueMeals;
  }

  totalSpent() {
    let total = 0;
    this.meals().forEach(meal => {
      total += meal.price
    })
    return total;
  }
}

class Delivery {
  constructor(mealId, customerId) {
    this.mealId = mealId
    this.customerId = customerId
    store.deliveries.push(this)
    this.id = store.deliveries.length-1
  }

  meal() {
   return store.meals[this.mealId]
  }

  customer() {
    return store.customers[this.customerId]
  }
}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    store.meals.push(this)
    this.id = store.meals.length-1
  }

  deliveries() {
    let allDeliveries = [];
    store.deliveries.map(delivery => {
      if (delivery.mealId === this.id){
        allDeliveries.push(delivery)
      }
    })
    return allDeliveries
  }

  customers() {
    let allCustomers = [];
    store.customers.map(customer => {
      this.deliveries().forEach(delivery => {
        if (customer.id === delivery.customerId){
          allCustomers.push(customer)
        }
      })
    })
    let uniqueCustomers = [...new Set(allCustomers)]
    // debugger;
    return uniqueCustomers;
  }

  static byPrice() {
    let sortedArray = [];
    sortedArray = store.meals.sort((a,b) => {
      // debugger;
      return b.price - a.price
    })
    // debugger;
    return sortedArray;
  }
}
