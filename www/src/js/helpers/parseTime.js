export default function parseTime(value, timeOfDay) {

	let match, hours, minutes;

	// x.x
	if (!timeOfDay) {
		match = /^(\d+)(?:\.(\d))$/g.exec(value);
		if (match) {
			hours = parseInt(match[1], 10);
			minutes = match[2] ? parseInt(match[2]) / 10 * 60 : 0;
		}
	}

	// x:xx or x.xx
	if (!match) {
		match = /^(\d+)(?:[\:\.](\d{2}))?$/g.exec(value);
		if (match) {
			hours = parseInt(match[1], 10);
			minutes = parseInt(match[2]) || 0;
		}
	}
	if (hours === undefined || minutes === undefined) throw new Error(`parseTime: Invalid date format`);

	if (hours < 0) throw new Error(`parseTime: Pass positive hour`);
	if (minutes < 0 || minutes > 59) throw new Error(`parseTime: Minutes must be between 0 and 59`);

	if (timeOfDay) {
		if (hours > 23) throw new Error(`parseTime: Hour may not be larger than 23 for times of day`);
	}

	return { hours, minutes };
}