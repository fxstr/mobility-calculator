import test from 'tape';
import MobilityCalculatorApp from './mobilityCalculatorApp';


function setupData() {
	const app = new MobilityCalculatorApp();
	const data = [
		// Birgit
		['Economy', '8:00', '11:30', 207, 127.37, 163.30]
		, ['Budget', '8:00', '10:00', 139, 87.75, 96.45]
		// Biker
		, ['Micro', '14:30', '5:30', 168, 93.12, 122.95]
		, ['Combi', '18:00', 2, 28, 26.56, 28.4]
		// Sebastian Aug
		, ['Combi', '12:30', 290, 1923, 1425.88, 2408.4]
		// Sebastian Sept
		, ['Emotion', '14.30', 1, 3, 6.44,  6.85]
		// Albrecht
		, ['Budget', '14:00', 21, 256, 131.8, 182.8]
	];
	app.rides.removeRide(app.rides[0]);
	data.forEach((rideData) => {
		app.rides.addRide();
		const ride = app.rides.rides[app.rides.rides.length - 1];
		ride.changeCategory(app.categories.getByName(rideData[0]));
		ride.validateStartTime(rideData[1]);
		ride.validateDuration(rideData[2]);
		ride.validateDistance(rideData[3]);
	});
	return {
		app
		, data
	};
}


test('calculations are correct', (t) => {
	const { app, data } = setupData();
	let oldCost = 0, newCost = 0;
	app.rides.rides.forEach((ride, index) => {
		// Sometimes, we have 0.99999-results
		t.equals(ride.oldCost.toFixed(2), data[index][4].toFixed(2));
		t.equals(ride.newCost.toFixed(2), data[index][5].toFixed(2));
		t.deepEquals(ride.newToOldDifference, {
			relative: (ride.newCost / ride.oldCost) - 1
			, absolute: ride.newCost - ride.oldCost
		});
		oldCost += ride.oldCost;
		newCost += ride.newCost;
	});
	t.equals(app.rides.total.oldCost, oldCost);
	t.equals(app.rides.total.newCost, newCost);
	t.equals(app.rides.total.absolute, newCost - oldCost);
	t.equals(app.rides.total.relative, (newCost / oldCost) - 1);

	t.end();
});

test('discount', (t) => {
	const { app, data } = setupData();
	const originalCost = app.rides.total.oldCost;
	app.rides.setDiscount(5);
	t.equals(app.rides.total.oldCost, originalCost * 0.95);
	app.rides.setDiscount(20);
	t.equals(app.rides.total.oldCost, originalCost * 0.8);
	app.rides.setDiscount(-5);
	t.equals(app.rides.total.oldCost, originalCost);
	app.rides.setDiscount(105);
	t.equals(app.rides.total.oldCost, originalCost);
	t.end();

});