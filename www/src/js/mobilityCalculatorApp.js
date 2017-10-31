import CarCategory from './models/carCategory';
import getPricingConfig from './config/getPricingConfig.js';
import CarCategories from './models/carCategories';
import Ride from './models/ride';
import Rides from './models/rides';

export default class MobilityCalculatorApp {

	constructor() {
		this.categories = new CarCategories();
		this._setupCategories();
		this.rides = new Rides(this.categories);
		this.rides.addRide();
	}

	_setupCategories() {
		getPricingConfig().forEach((config) => {
			const cat = new CarCategory(config.name, config.oldPricing, config.newPricing);
			this.categories.addCategory(cat);
		});
	}

}