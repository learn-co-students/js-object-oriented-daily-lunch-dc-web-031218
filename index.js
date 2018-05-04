// global datastore
let store = { meals: [], customers: [], deliveries: [] };
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    });
  }

  // customers() {

  // }

  static byPrice() {
    // orders all meals instances by their price in descending order
    let sortedMeals = store.meals.sort((a, b) => b.price - a.price);
    // debugger
    return sortedMeals;
  }

  customers () {
    // returns a unique list of customers who have ordered this meal
    // customer.delivery() which will return an array with delivery objects, then delivery.customers() to get customer object
    let allDeliveries = this.deliveries();
    let allCustomers = allDeliveries.map(delivery => delivery.customer());
    // let deepCopy = allMeals.map(meal => Object.assign({}, meal))
    
    function onlyUnique(value, index, self) { 
      return self.indexOf(value) === index;
  }

  return allCustomers.filter(onlyUnique)
    // debugger
  }
}

class Delivery {
  constructor(mealId, customerId) {
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.customerId = customerId;

    store.deliveries.push(this);
  }
  meal() {
    // returns the meal instance associated with a particular delivery; delivery belongs to a meal
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    });
  }

  customer() {
    // returns the meal instance associated with a particular delivery; delivery belongs to a meal
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    });
  }
}

class Customer {
  constructor(name) {
    this.id = ++customerId;
    this.name = name;

    store.customers.push(this);
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    });
  }
  meals () {
    // returns all unique meals a customer has ordered
    // customer.delivery() which will return an array with delivery objects, then delivery.meals() to get meal object
    let allDeliveries = this.deliveries();
    let allMeals = allDeliveries.map(delivery => delivery.meal());
    // let deepCopy = allMeals.map(meal => Object.assign({}, meal))
    
    function onlyUnique(value, index, self) { 
      return self.indexOf(value) === index;
  }

  return allMeals.filter(onlyUnique)
    // debugger
  }
  // calculates totalSpent()

  totalSpent() {
    return this.meals().reduce(
      (accumulator, currentMeal) => {
      return accumulator + currentMeal.price
    }, 0);
  }
}

let meal = new Meal("test title", 23);
let meal2 = new Meal("test", 26);
let meal3 = new Meal("pizza", 19);
let customer = new Customer("Julio");
let delivery = new Delivery(1, 1);
let delivery2 = new Delivery(2, 2);
let delivery3 = new Delivery(3, 3);

Meal.byPrice();
