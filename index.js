// global datastore
let store = { meals: [], customers: [], deliveries: [] };

let customerId = 0;
class Customer{
	constructor(name){
		this.id = ++customerId;
		this.name = name;
		store.customers.push(this);
	}
	deliveries(){
		return store.deliveries.filter(
			d=>d.customerId === this.id);
	}
	meals(){ //returns unique meals
		let meals = this.deliveries().map(d=>d.meal());
		let unique = [];
		meals.forEach(m=>{
			if(!unique.includes(m)) unique.push(m);
		});
		return unique;
	}
	totalSpent(){
		let customerMeals = this.deliveries().map(d=>d.meal());
		return customerMeals.reduce((acc, meal) => acc + meal.price, 0);
	}
}

let mealId = 0;
class Meal{
	constructor(title, price){
		this.id = ++mealId;
		this.title = title;		
		this.price = price;		
		store.meals.push(this);
	}
	deliveries(){
		return store.deliveries.filter(
			d=>d.mealId === this.id);
	}
	customers(){
		let customers = this.deliveries().map(d=>d.customer());
		let unique = [];
		customers.forEach(c=>{
			if(!unique.includes(c)) unique.push(c);
		});
		return unique;
	}
	static byPrice(){
		let meals = store.meals;
		//sort most expensive to least
		return meals.sort((m1, m2)=> m2.price - m1.price);
	}
}

let deliveryId = 0;
class Delivery{
	constructor(mealId, customerId){
		this.id = ++deliveryId;
		this.mealId = mealId;			
		this.customerId = customerId;	
		store.deliveries.push(this);
	}
	meal(){
		return store.meals.find(meal=>meal.id === this.mealId);
	}
	customer(){
		return store.customers.find(c=>c.id === this.customerId);
	}

}