export default function getHighAndLowHours(start, duration) {
	const now = new Date(2000, 0, 1, start.hours, start.minutes, 0, 0);
	const durationInMinutes = duration.hours * 60 + duration.minutes;
	const result = {
		low: 0
		, high: 0
	};
	// Brute-force da shit
	for(let i = 0; i < durationInMinutes; i++) {
		now.setMinutes(now.getMinutes() + 1);
		//console.log(now.getHours(), now.getMinutes());
		if (
			now.getHours() < 7 
			|| (now.getHours() === 7 && now.getMinutes() === 0) 
			|| (now.getHours() === 23 && now.getMinutes() !== 0)
		) {
			result.low++;
			//console.log('was low');
		}
		else {
			result.high++;
			//console.log('was high');
		}
	}
	return result;
}