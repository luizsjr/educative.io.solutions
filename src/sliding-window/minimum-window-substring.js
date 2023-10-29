import pressEnterToStart from '../lib/wait-for-start';

function minWindow(s, t) {
	let answer;
	let answerLength = Infinity;

	const missingCharsCounter = {};
	const missingChars = new Set();

	// initialize  variables
	for (let i = 0; i < t.length; i++) {
		const c = t[i];
		missingCharsCounter[c] = (missingCharsCounter[c] ?? 0) + 1;
		missingChars.add(c);
	}

	let start = 0;
	for (let end = 0; end < s.length; end++) {
		let startChar = s[start];
		const endChar = s[end];

		// slide start if we already found a window
		if (answerLength !== Infinity) {
			start += 1;
			startChar = s[start];
			if (missingCharsCounter[startChar] !== undefined) {
				missingCharsCounter[startChar] += 1;
				if (missingCharsCounter[startChar] > 0) {
					missingChars.add(startChar);
				}
			}
		}

		// end char is not relevant
		if (missingCharsCounter[endChar] === undefined) {
			continue;
		}

		// update char counter with endChar
		missingCharsCounter[endChar] -= 1;
		if (missingCharsCounter[endChar] === 0) {
			missingChars.delete(endChar);
		}

		// found possible answer
		if (missingChars.size === 0) {
			// remove unecessary chars from the start
			while (missingCharsCounter[startChar] === undefined || missingCharsCounter[startChar] < 0) {
				if (missingCharsCounter[startChar] !== undefined) {
					missingCharsCounter[startChar] += 1;
				}
				start += 1;
				startChar = s[start];
			}

			// found smaller answer
			if (end - start + 1 < answerLength) {
				answer = s.substring(start, end + 1);
				answerLength = answer.length;
			}
		}
	}

	return answer;
}

pressEnterToStart(() => {
	const inputs = [
		[ 'ABDFGDCKAB', 'ABCD' ],
	];
	for (const input of inputs) {
		const answer = minWindow(input[0], input[1]);
		console.log(`${input[0]}, ${input[1]}: ${answer}`);
	}
	console.log('Done!');
});
