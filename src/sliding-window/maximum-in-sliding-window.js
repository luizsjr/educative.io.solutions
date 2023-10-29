import pressEnterToStart from '../lib/wait-for-start';
import Deque from '../lib/deque';

function findMaxSlidingWindow(nums, w) {
	const answer = [];

	// initialize first window
	const currentWindow = new Deque();
	for (let tail = 0; tail < w; tail++) {
		handleBack(currentWindow, nums, tail);
	}
	setMax(currentWindow, nums, answer);

	// slide window
	for (let head = 1, tail = w; tail < nums.length; head++, tail++) {
		handleBack(currentWindow, nums, tail);
		handleHead(currentWindow, head);
		setMax(currentWindow, nums, answer);
	}

	return answer;
}

function handleBack(currentWindow, nums, tail) {
	while (!currentWindow.isEmpty()
        && nums[currentWindow.peekBack()] < nums[tail]
	) {
		currentWindow.pop();
	}
	currentWindow.push(tail);
}

function handleHead(currentWindow, head) {
	if (head > currentWindow.peekFront()) {
		currentWindow.shift();
	}
}

function setMax(currentWindow, nums, answer) {
	answer.push(nums[currentWindow.peekFront()]);
}

pressEnterToStart(() => {
	const inputs = [
		[ [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ], 3 ],
	];
	for (const input of inputs) {
		const answer = findMaxSlidingWindow(input[0], input[1]);
		console.log(`[${input[0]}], ${input[1]}: ${answer}`);
	}
	console.log('Done!');
});
