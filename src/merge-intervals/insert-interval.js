import pressEnterToStart from '../lib/wait-for-start';

function insertInterval(existingIntervals, newInterval) {
	if (!newInterval) {
		return existingIntervals;
	}

	if (!existingIntervals || existingIntervals.length === 0) {
		return [ newInterval ];
	}

	const result = [];
	// find newInterval insertion point
	let current = 0;
	while (current < existingIntervals.length && existingIntervals[current][0] < newInterval[0]) {
		result.push(existingIntervals[current]);
		current++;
	}

	// insert newIntervalconst
	let currentResultTail = result.length - 1;
	if (currentResultTail < 0 || result[currentResultTail][1] < newInterval[0]) {
		result.push(newInterval);
	} else {
		result[currentResultTail] = [
			result[currentResultTail][0],
			Math.max(result[currentResultTail][1], newInterval[1]),
		];
	}

	// merge rest of the intervals
	for (let i = current; i < existingIntervals.length; i++) {
		currentResultTail = result.length - 1;
		if (existingIntervals[i][0] > result[currentResultTail][1]) {
			// Add
			result.push(existingIntervals[i]);
		} else {
			result[currentResultTail][1] = Math.max(result[currentResultTail][1], existingIntervals[i][1]);
			result[currentResultTail] = [
				result[currentResultTail][0],
				Math.max(result[currentResultTail][1], newInterval[1]),
			];
		}
	}
	return result;
}

pressEnterToStart(() => {
	const inputs = [
		// [ [ [ 1, 2 ], [ 3, 4 ], [ 5, 8 ], [ 9, 15 ] ], [ 2, 5 ] ],
		// [ [ [ 1, 6 ], [ 8, 9 ], [ 10, 15 ], [ 16, 18 ] ], [ 9, 10 ] ],
		[ [ [ 1, 2 ], [ 3, 4 ], [ 5, 8 ], [ 9, 15 ] ], [ 2, 5 ] ],
	];
	for (const input of inputs) {
		const answer = insertInterval(input[0], input[1]);
		console.log(`${input[0]} , ${input[1]}: ${answer}`);
	}
	console.log('Done!');
});
