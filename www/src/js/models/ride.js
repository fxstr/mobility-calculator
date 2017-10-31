import { observable, action, computed } from 'mobx';
import parseTime from '../helpers/parseTime';
import debug from 'debug';
import getHighAndLowHours from '../helpers/getHighAndLowHours';
const log = debug('mobility:Ride');

export default class Ride {

	@observable category = {};
	@observable startTime = {
		value: undefined
		, error: undefined
	}
	@observable duration = {
		value: undefined
		, error: undefined
	}
	@observable distance = {
		value: undefined
		, error: undefined
	}

	/**
	* ID's needed for iterating (React key)
	*/ 
	constructor(id, categories) {
		this.id = id;
		this._categories = categories;
		this.category = categories.categories[0];
		log('Init ride,, categories are %o, category is %o', this._categories, this.category);
	}

	@action changeCategory(category) {
		this.category = category;
		log('Changed category to %o', category);
	}

	@computed get highAndLowMinutes() {
		if (!this.duration.value || !this.startTime.value) return undefined;
		return getHighAndLowHours(this.startTime.value, this.duration.value);
	}

	@computed get newCost() {
		if (!this.highAndLowMinutes || !this.distance.value) return undefined;
		let cost = this.category.newPricing.pricePerHourLow / 60 * (this.highAndLowMinutes.low + this.highAndLowMinutes.high);
		cost += this.category.newPricing.pricePerKmFew * this.distance.value;
		return cost;
	}

	@computed get newToOldDifference() {
		if (!this.oldCost || !this.newCost) return undefined;
		return {
			absolute: this.newCost - this.oldCost
			, relative: (this.newCost / this.oldCost) - 1
		};
	}

	@computed get oldCost() {
		log('Get oldCost, minutes are %o, distance %d', this.highAndLowMinutes, this.distance.value);
		if (!this.highAndLowMinutes || !this.distance.value) return undefined;
		const distance = {
			above100: this.distance.value > 100 ? this.distance.value - 100 : 0
			, below100: this.distance.value > 100 ? 100 : this.distance.value
		};
		let cost = this.category.oldPricing.pricePerHourLow / 60 * this.highAndLowMinutes.low;
		cost += this.category.oldPricing.pricePerHourHigh / 60 * this.highAndLowMinutes.high;
		cost += distance.below100 * this.category.oldPricing.pricePerKmFew;
		cost += distance.above100 * this.category.oldPricing.pricePerKmMany;
		log('oldCost is %d', cost);
		return cost;
	}

	@action validateStartTime(value) {
		this.startTime.value = undefined;
		this.startTime.error = undefined;
		let parsed;
		try {
			parsed = parseTime(value, true);
			log('Start time is %o', parsed);
			this.startTime.value = parsed;
		}
		catch(err) {
			this.startTime.error = err;
		}
	}

	@action validateDuration(value) {
		this.duration.value = undefined;
		this.duration.error = undefined;
		let parsed;
		try {
			parsed = parseTime(value);
			log('Duration is %o', parsed);
			this.duration.value = parsed;
		}
		catch(err) {
			this.duration.error = err;
		}
	}

	@action validateDistance(value) {
		this.distance.error = undefined;
		this.distance.value = undefined;
		const parsed = parseInt(value, 10);
		if (!value || isNaN(parsed) || parsed < 0) {
			this.distance.error = new Error(`Ride: Invalid distance`);
		}
		this.distance.value = parsed;
		log('Distance is %d, error %o', parsed, this.distance.error);
	}

};


