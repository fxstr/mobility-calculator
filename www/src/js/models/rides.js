import { observable, computed, action } from 'mobx';
import Ride from './ride';
import debug from 'debug';
const log = debug('mobility:Rides');

export default class Rides {

	@observable rides = [];
	@observable discount = {
		value: undefined
		, error: undefined
	};

	constructor(categories) {
		this._latestId = 0;
		this._categories = categories;
	}

	@action setDiscount(value) {
		this.discount.value = this.discount.error = undefined;
		// undefined -> 0
		if (!value) value = 0;
		const parsed = parseInt(value, 10);
		if (isNaN(parsed) || parsed < 0 || parsed > 100) {
			this.discount.error = new Error(`Rides: Invalid discount`);
		}
		else this.discount.value = parsed;
	}

	@action addRide() {
		const id = this._latestId++;
		log('Add ride with id %d, cats %o', id, this._categories);
		this.rides.push(new Ride(id, this._categories));
	}

	@action removeRide(ride) {
		this.rides.splice(this.rides.indexOf(ride), 1);
	}

	@computed get total() {
		const cost = this.rides.reduce((prev, ride) => {
			if (!ride.oldCost || !ride.newCost) return prev;
			let { oldCost, newCost } = prev;
			oldCost += ride.oldCost;
			newCost += ride.newCost;
			return { oldCost, newCost };
		}, { oldCost: 0, newCost: 0 });
		log('total is %o', cost);
		const discount = this.discount.value ? 1 - this.discount.value / 100 : 1;
		const oldCost = cost.oldCost * discount;
		const relative = cost.newCost && oldCost ? (cost.newCost / oldCost) - 1 : 0;
		return {
			oldCost: oldCost
			, newCost: cost.newCost
			, absolute: cost.newCost - oldCost
			, relative
		};
	}
}