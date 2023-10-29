import pressEnterToStart from '../lib/wait-for-start';

function move(nums: number[], currentPosition: number) {
	const size = nums.length;
	const currentValue = nums[currentPosition];
	let nextPosition = (currentPosition + currentValue) % size;
	if (nextPosition < 0) {
		nextPosition += size;
	}
	return nextPosition;
}

function isNotCycle(nums: number[], previousIsForward: boolean, currentPosition: number) {
	const currentIsForward = isForward(nums, currentPosition);
	if (previousIsForward !== currentIsForward
		|| Math.abs(nums[currentPosition] % nums.length) // To detect loops of single element
	) {
		return true;
	}
	return false;
}

const isForward = (nums: number[], i: number) => nums[i] > 0;

function circularArrayLoop(nums: number[]) {
	for (let i: number = 0; i < nums.length; i++) {
		let slow: number = i;
		let fast: number = i;
		const forward = isForward(nums, i);

		while (true) {
			slow = move(nums, slow);
			if (isNotCycle(nums, forward, slow)) {
				break;
			}

			fast = move(nums, fast);
			if (isNotCycle(nums, forward, fast)) {
				break;
			}

			fast = move(nums, fast);
			if (isNotCycle(nums, forward, fast)) {
				break;
			}

			if (slow === fast) {
				return true;
			}
		}
	}
	return false;
}

pressEnterToStart(() => {
	const inputs = [
		[ -2, -3, -9 ],
		[ -5, -4, -3, -2, -1 ],
		[ -1, -2, -3, -4, -5 ],
		[ 2, 1, -1, -2 ],
		[ -1, -2, -3, -4, -5, 6 ],
		[ 1, 2, -3, 3, 4, 7, 1 ],
		[ 2, 2, 2, 7, 2, -1, 2, -1, -1 ],
		[ 2, 1, -2, 3 ],
		[ 2, -1, 1, 4, 3, -2, -4, -1, -5, -3, 7, 6, 2, -8, 1, 4, 9, -7, -6, -2 ],
	];
	for (const input of inputs) {
		console.log(`[${input}]: ${circularArrayLoop(input)}`);
	}
});
