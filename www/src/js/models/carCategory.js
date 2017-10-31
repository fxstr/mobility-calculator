export default class CarCategory {

	/**
	* Prices are objects with
	* - pricePerHourHigh
	* - pricePerHourLow
	* - pricePerKmFew
	* - pricePerKmMany
	*/
	constructor(name, oldPricing, newPricing) {
		this.name = name;
		this.oldPricing = oldPricing;
		this.newPricing = newPricing;
	}

}