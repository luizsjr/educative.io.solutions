import pressEnterToStart from '../lib/wait-for-start';

function minWindow(str1, str2) {
	if (str2.length > str1.length) {
		return '';
	}

	let answer = '';
	let answerSize = Infinity;
	let p2 = 0;
	for (let p1 = 0; p1 < str1.length; p1++) {
		if (str1.charAt(p1) === str2.charAt(p2)) {
			p2 += 1;
		}
		// found str2 in str1
		if (p2 === str2.length) {
			p2 = str2.length - 1;
			const end = p1;
			while (p1 >= 0) {
				if (str1.charAt(p1) === str2.charAt(p2)) {
					p2 -= 1;
				}
				// found smallest in the window
				if (p2 < 0) {
					const possibleAnswer = str1.substring(p1, end + 1);
					if (possibleAnswer.length < answerSize) {
						answer = possibleAnswer;
						answerSize = possibleAnswer.length;
					}
					p2 = 0;
					break;
				}
				p1 -= 1;
			}
		}
	}
	return answer;
}

pressEnterToStart(() => {
	const inputs = [
		[ 'azssstaszaztf', 'saz' ],
	];
	for (const input of inputs) {
		const answer = minWindow(input[0], input[1]);
		console.log(`${input[0]}, ${input[1]}: ${answer}`);
	}
	console.log('Done!');
});
