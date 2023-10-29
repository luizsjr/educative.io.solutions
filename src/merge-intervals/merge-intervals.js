import pressEnterToStart from '../lib/wait-for-start';

function mergeIntervals(intervals) {
	const result = [ intervals[0] ];
	if (intervals.length >= 2) {
		for (let i = 1; i < intervals.length; i++) {
			const intervalStart = intervals[i][0];
			const intervalEnd = intervals[i][1];
			const lastResultIndex = result.length - 1;
			const lastResultEnd = result[lastResultIndex][1];

			if (intervalStart <= lastResultEnd) {
				// merge
				result[lastResultIndex][1] = Math.max(lastResultEnd, intervalEnd);
			} else {
				result.push([ intervalStart, intervalEnd ]);
			}
		}
	}
	return result;
}

pressEnterToStart(() => {
	const inputs = [
		[ [ 1, 5 ], [ 3, 7 ], [ 4, 8 ] ],
		[ [ 1, 5 ], [ 4, 6 ], [ 6, 8 ], [ 11, 15 ] ],
		[ [ 1, 9 ], [ 3, 8 ], [ 4, 4 ] ],
	];
	for (const input of inputs) {
		const answer = mergeIntervals(input);
		console.log(`${input}: ${answer}`);
	}
	console.log('Done!');
});
