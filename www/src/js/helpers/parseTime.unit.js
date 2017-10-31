import test from 'tape';
import parseTime from './parseTime';

test('validates', (t) => {
	t.throws(() => parseTime('9:2'), /Invalid/);
	t.throws(() => parseTime('9:'), /Invalid/);
	t.throws(() => parseTime('9.142'), /Invalid/);
	t.throws(() => parseTime(':20'), /Invalid/);
	t.throws(() => parseTime('.20'), /Invalid/);
	t.throws(() => parseTime('-1'), /Invalid/);
	t.end();
});

test('x.xx or x:xx', (t) => {
	t.deepEquals(parseTime(9), { hours: 9, minutes: 0 });
	t.deepEquals(parseTime('9:20'), { hours: 9, minutes: 20 });
	t.deepEquals(parseTime('9:00'), { hours: 9, minutes: 0 });
	t.deepEquals(parseTime('24:00'), { hours: 24, minutes: 0 });
	t.deepEquals(parseTime('29:50'), { hours: 29, minutes: 50 });
	t.end();
});

test('x.x', (t) => {
	// Not if timeOfDay is true
	t.throws(() => parseTime('9.2', true));
	t.deepEquals(parseTime('9.2'), { hours: 9, minutes: 12 });
	t.end();
});

test('knows minute bounds', (t) => {
	t.throws(() => parseTime('1:60'), /Minutes/);
	t.throws(() => parseTime('1:-5'), /Invalid/);
	t.end();
});

test('knows hours', (t) => {
	t.throws(() => parseTime('-1:01', true), /Invalid/);
	t.throws(() => parseTime('24:01', true), /23/);
	t.throws(() => parseTime('24:00', true), /23/);
	t.end();
});