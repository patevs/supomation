import test from 'ava';
import supomationCore from '.';

test('title', t => {
	t.throws(() => {
		supomationCore(123);
	}, {
		instanceOf: TypeError,
		message: 'Expected a string, got number'
	});

	t.is(supomationCore('unicorns'), 'unicorns & rainbows');
});
