// global datastore
let store = { meals: [], customers: [], deliveries: [] };
let customerId = 0
class Customer {
	constructor(name){
		this.name = name
		this.id = ++customerId
		store.customers.push(this)
	}

	deliveries(){
		return store.deliveries.filter(delivery => delivery.customerId === this.id)
	}

	meals(){
		let mealsOrdered = this.deliveries().map(delivery => delivery.mealId)
		return store.meals.filter(meal => mealsOrdered.includes(meal.id))
	}

	uniqueMealIds(meals){
		let seen = {}
		meals.forEach(function(meal){
			seen[meal.mealId] = meal.mealId
		})
		return Object.keys(seen)
	}

	totalSpent(){
		let sum = 0
		let price = this.meals().map(meal => meal.price)
		let sums = price.map(price => sum += price)
		return sums[sums.length-1]
	}
}

let mealId = 0 

class Meal{
	constructor(title, price){
		this.title = title
		this.price = price
		this.id = ++mealId
		store.meals.push(this)
	}

	deliveries(){
		return store.deliveries.filter(delivery => delivery.mealId === this.id)
	}

	customers(){
		let customers = this.deliveries().map(delivery => delivery.customer())
		let uniqueCustomers = [...new Set(customers)]
		return uniqueCustomers
	}

	uniqueCustomer(deliveries){
		let seen = {}
		deliveries.forEach(function(delivery){
			seen[delivery.customerId] = delivery.customerId
		})
		return Object.keys(seen)
	} 

	static byPrice(){
		return store.meals.sort((a,b)=> parseFloat(a.price) - parseFloat(b.price)).reverse()
	}
}

let deliveryId = 0 

class Delivery{
	constructor(meal, customer){
		this.id = ++deliveryId
		this.mealId = meal
		this.customerId = customer
		store.deliveries.push(this)
	}

	meal(){
		return store.meals.find(meal => meal.id === this.mealId)
	}

	customer(){
		return store.customers.find(customer => customer.id === this.customerId)
	}
}