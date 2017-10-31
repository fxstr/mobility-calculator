import test from 'tape';
import getHighAndLowHours from './getHighAndLowHours';

test('returns correct values', (t) => {
	const testData = [
		[10, 0, 2, 5, 125, 0]
		, [6, 0, 1, 0, 0, 60]
		, [6, 0, 2, 0, 60, 60]
		, [6, 0, 24, 0, 16*60, 8*60]
		, [23, 59, 0, 2, 0, 2]
		, [22, 59, 0, 2, 1, 1]
	];
	testData.forEach((datum) => {
		t.deepEquals(getHighAndLowHours({ hours: datum[0], minutes: datum[1] }, { hours: datum[2], minutes: datum[3] }), 
			{ high: datum[4], low: datum[5] });
	});
	t.end();
});