import debug from 'debug';
const log = debug('mobility:CarCategories');

export default class CarCategories {
	constructor() {
		this.categories = [];
	}
	addCategory(category) {
		log('Add %o', category);
		this.categories.push(category);
	}
	getByName(name) {
		return this.categories.find((cat) => cat.name === name);
	}
}