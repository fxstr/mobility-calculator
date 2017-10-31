function getNewTopConfig() {
	return {
		pricePerHourHigh: 4
		, pricePerHourLow: 4
		, pricePerKmFew: .95
		, pricePerKmMany: .95
	};
}

function getOldMinivan() {
 	return {
		pricePerHourHigh: 4.4
		, pricePerHourLow: .8
		, pricePerKmFew: .94
		, pricePerKmMany: .47
	};
}

function getOldEmotion() {
	return {
		pricePerHourHigh: 3.8
		, pricePerHourLow: .8
		, pricePerKmFew: .88
		, pricePerKmMany: .44
	};
}

export default function getPricingConfig() {
	return [{
		name: 'Budget'
		, oldPricing: {
			pricePerHourHigh: 2.8
			, pricePerHourLow: .8
			, pricePerKmFew: .5
			, pricePerKmMany: .25
		}
		, newPricing: {
			pricePerHourHigh: 2
			, pricePerHourLow: 2
			, pricePerKmFew: .55
			, pricePerKmMany: .55
		}
	}, {
		name: 'Micro'
		, oldPricing: {
			pricePerHourHigh: 2.8
			, pricePerHourLow: .8
			, pricePerKmFew: .58
			, pricePerKmMany: .29
		}
		, newPricing: {
			pricePerHourHigh: 2.5
			, pricePerHourLow: 2.5
			, pricePerKmFew: .65
			, pricePerKmMany: .65
		}
	}, {
		name: 'Economy'
		, oldPricing: {
			pricePerHourHigh: 2.8
			, pricePerHourLow: .8
			, pricePerKmFew: .62
			, pricePerKmMany: .31
		}
		, newPricing: {
			pricePerHourHigh: 2.5
			, pricePerHourLow: 2.5
			, pricePerKmFew: .65
			, pricePerKmMany: .65
		}
	}, {
		name: 'Combi'
		, oldPricing: {
			pricePerHourHigh: 3.2
			, pricePerHourLow: .8
			, pricePerKmFew: .72
			, pricePerKmMany: .36
		}
		, newPricing: {
			pricePerHourHigh: 3
			, pricePerHourLow: 3
			, pricePerKmFew: .8
			, pricePerKmMany: .8
		}
	}, {
		name: 'Electro'
		, oldPricing: {
			pricePerHourHigh: 2.8
			, pricePerHourLow: .8
			, pricePerKmFew: .62
			, pricePerKmMany: .31
		}
		, newPricing: {
			pricePerHourHigh: 2.5
			, pricePerHourLow: 2.5
			, pricePerKmFew: .65
			, pricePerKmMany: .65
		}
	}, {
		name: 'Cabrio'
		, oldPricing: getOldEmotion()
		, newPricing: getNewTopConfig()
	}, {
		name: 'Emotion'
		, oldPricing: getOldEmotion()
		, newPricing: getNewTopConfig()
	}, {
		name: 'Minivan'
		, oldPricing: getOldMinivan()
		, newPricing: getNewTopConfig()
	}, {
		name: 'Transport'
		, oldPricing: getOldMinivan()
		, newPricing: getNewTopConfig()
	}];
}