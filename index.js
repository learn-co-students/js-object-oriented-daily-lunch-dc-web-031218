// global datastore
let store = { meals: [], customers: [], deliveries: [] };

// id counters for all three classes of domain:
let mealId = 0;
let deliveryId = 0;
let customerId = 0;

// classes of domain:
class Meal {
  constructor (title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  deliveries () {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    });
  }

  customers () {
    // returns all unique customers a customer has ordered

    // invoke Customer deliveries() ==> have all deliveries
    let allDeliveries = this.deliveries();
    // deliveries.map ==> return delivery.meal() ==> have all the customers
    let allCustomers = allDeliveries.map(delivery => delivery.customer());
    // customers are unique

    // let deepCopy = allMeals.map(meal => Object.assign({}, meal) )

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    };

    return allCustomers.filter(onlyUnique);
  };

  static byPrice () {
    // orders all meal instances by their price in descending order
    let sortedMeals = store.meals.sort((a, b) => {
      return b.price - a.price;
    });
    return sortedMeals;
  }
}

class Delivery {
  constructor (mealId, customerId) {
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.customerId = customerId;
    store.deliveries.push(this);
  }

  meal () {
    // returns the meal instance associated with a particular delivery
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    });
  }

  customer () {
    // returns the customer instance associated with a particular delivery
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    });
  }
}

class Customer {
  constructor (name) {
    this.id = ++customerId;
    this.name = name;
    store.customers.push(this);
  }

  deliveries () {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    });
  }

  meals () {
    // returns all unique meals a customer has ordered

    // invoke Customer deliveries() ==> have all deliveries
    let allDeliveries = this.deliveries();
    // deliveries.map ==> return delivery.meal() ==> have all the meals
    let allMeals = allDeliveries.map(delivery => delivery.meal());
    // meals are unique

    // let deepCopy = allMeals.map(meal => Object.assign({}, meal) )

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    };

    return allMeals.filter(onlyUnique);
  };

  totalSpent () {
    return this.meals().reduce(
      (accumulator, currentMeal) => {
      return accumulator + currentMeal.price;
    }, 0);
  }
}
//
// let meal = new Meal("test title", 23);
// let meal2 = new Meal("title2", 24);
// let meal3 = new Meal("title3", 3);
// let meal4 = new Meal("title4", 5);
// let meal5 = new Meal("title5", 20);
// let customer = new Customer("test name");
// let delivery = new Delivery(1, 1);
// let delivery2 = new Delivery(2, 1);
// let delivery3 = new Delivery(3, 1);
// let delivery4 = new Delivery(4, 1);
// let delivery5 = new Delivery(5, 1);
//
// customer.meals();
// // console.log("return of meal.deliveries() is:", meal.deliveries());
// // Meal.byPrice();
