let store = {customers:[],meals:[],employers:[],deliveries:[]};
let customerId = 0;
let mealId = 0;
let employerId = 0;
let deliveryId = 0;

class Customer{
  constructor(name,employer={}){
    // console.log(arguments)
    this.name = name;
    this.id = ++customerId;
    store.customers.push(this);
    this.employerId = employer.id;
  }

meals(){
    return this.deliveries().map(delivery=>delivery.meal());
  }

deliveries(){
  return store.deliveries.filter(delivery=>{
      return delivery.customerId === this.id;
    });
  }
totalSpent(){
   let prices = this.meals().map(meal=>meal.price);
   return prices.reduce((agg,price)=>agg+price);
  }
}

class Meal{
  constructor(title,price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery=>{
      return delivery.mealId == this.id;
    });
  }

  customers(){
    return this.deliveries().map(delivery=>delivery.customer());
  }

  static byPrice(){
    return store.meals.sort((a,b)=>b.price-a.price);
  }
}

class Delivery{
  constructor(meal={},customer={}){/////////////////////////////////////////////
    this.mealId = meal.id;
    this.customerId = customer.id;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }

  meal(){
    return store.meals.find(meal=>{
      return meal.id === this.mealId;
    });
  }

  customer(){
    return store.customers.find(customer=>{
      return customer.id === this.customerId;
    });
  }
}

class Employer{
  constructor(name){
    // console.log(arguments)
    this.name=name;
    this.id = ++employerId;
    store.employers.push(this);
  }

  employees(){
    return store.customers.filter(customer=>{
      return customer.employerId === this.id;
    });
  }

  deliveries(){
    let arrays =this.employees().map(employee=>employee.deliveries());
      return arrays.reduce((agg,delivery)=>{
        return agg.concat(delivery);
      });
  }

  meals(){
    let meals = this.deliveries().map(delivery=>delivery.meal());
    return [...new Set(meals)];
  }

  mealTotals(){
    let obj = {};

    this.meals().map(meal=>meal.id).forEach((id)=>{
      obj[id]=this.deliveries().filter(d=>d.mealId===parseInt(id)).length;
      ///triple equals does not work...STRING!
    });

    return obj;
  }
}
