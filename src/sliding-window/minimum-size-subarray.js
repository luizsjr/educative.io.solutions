import pressEnterToStart from '../lib/wait-for-start';

function minSubArrayLen(target, nums) {
	let answer = Infinity;
	let windowSum = 0;

	let start = 0;
	for (let end = 0; end < nums.length; end++) {
		windowSum += nums[end];

		while (windowSum >= target) {
			answer = Math.min(answer, end - start + 1);
			windowSum -= nums[start];
			start += 1;
		}
	}
	return answer === Infinity ? 0 : answer;
}

pressEnterToStart(() => {
	const inputs = [
		[ 4, [ 1, 4, 4 ] ],
	];
	for (const input of inputs) {
		const answer = minSubArrayLen(input[0], input[1]);
		console.log(`${input[0]}, ${input[1]}: ${answer}`);
	}
	console.log('Done!');
});
