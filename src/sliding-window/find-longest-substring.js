import pressEnterToStart from '../lib/wait-for-start';

function findLongestSubstring(str) {
	let start = 0;
	const seenChars = {};
	let answer = 0;

	for (let end = 0; end < str.length; end++) {
		const c = str[end];
		if (seenChars[c] !== undefined && seenChars[c] >= start) {
			answer = findLongest(answer, start, end);
			start = seenChars[c] + 1;
		}
		seenChars[c] = end;
	}

	return findLongest(answer, start, str.length);
}

function findLongest(currentLongest, start, end) {
	return Math.max(currentLongest, end - start);
}

pressEnterToStart(() => {
	const inputs = [
		'abcdbea',
	];
	for (const input of inputs) {
		const answer = findLongestSubstring(input);
		console.log(`${input}: ${answer}`);
	}
	console.log('Done!');
});
