import pressEnterToStart from '../lib/wait-for-start';

function longestRepeatingCharacterReplacement2(s, k) {
	const stringLength = s.length;
	let lengthOfMaxSubstring = 0;
	let start = 0;
	const charFreq = new Map();
	let mostFreqChar = 0;

	for (let end = 0; end < stringLength; ++end) {
		if (!charFreq.has(s[end])) {
			charFreq.set(s[end], 1);
		} else {
			charFreq.set(s[end], charFreq.get(s[end]) + 1);
		}

		mostFreqChar = Math.max(mostFreqChar, charFreq.get(s[end]));

		if (end - start + 1 - mostFreqChar > k) {
			charFreq.set(s[start], charFreq.get(s[start]) - 1);
			start += 1;
		}

		lengthOfMaxSubstring = Math.max(end - start + 1, lengthOfMaxSubstring);
	}

	return lengthOfMaxSubstring;
}

function longestRepeatingCharacterReplacement(s, k) {
	let answer = 0;
	let mostFrequentChar = 0;
	const charFrequency = {};

	let start = 0;
	for (let end = 0; end < s.length; end++) {
		const currentChar = s[end];
		const currentCharFrequency = (charFrequency[currentChar] ?? 0) + 1;

		charFrequency[currentChar] = currentCharFrequency;
		mostFrequentChar = Math.max(mostFrequentChar, currentCharFrequency);

		let currentWindowSize = end - start + 1;
		if (currentWindowSize - mostFrequentChar > k) {
			charFrequency[s[start]] -= 1;
			start += 1;
			currentWindowSize -= 1;
		}

		answer = Math.max(answer, currentWindowSize);
	}
	return answer;
}

pressEnterToStart(() => {
	const inputs = [
		[ 'aaacbbbaabab', 1 ],
	];
	for (const input of inputs) {
		const answer = longestRepeatingCharacterReplacement(input[0], input[1]);
		console.log(`${input[0]}, ${input[1]}: ${answer}`);
	}
	console.log('Done!');
});
