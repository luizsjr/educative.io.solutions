import pressEnterToStart from '../lib/wait-for-start';
import IntervalMinHeap from '../lib/interval-min-heap';

function employeeFreeTime2(schedules) {
	const heap = new IntervalMinHeap();
	for (let e = 0; e < schedules.length; e++) {
		const schedule = schedules[e];
		for (let i = 0; i < schedule.length; i++) {
			const interval = schedule[i];
			heap.insert(interval);
		}
	}

	const orderedIntervals = [];
	while (heap.size()) {
		const interval = heap.extractMin();
		mergeInterval(orderedIntervals, interval);
	}

	const result = [];
	let previous = orderedIntervals.length > 0 ? orderedIntervals[0] : undefined;
	for (let i = 1; i < orderedIntervals.length; i++) {
		const current = orderedIntervals[i];
		result.push([ previous[1], current[0] ]);
		previous = current;
	}
	return result;
}

function employeeFreeTime(schedule) {
	const heap = new IntervalMinHeap();

	for (let i = 0; i < schedule.length; i++) {
		const interval = schedule[i][0];
		heap.insert([ interval[0], i, 0 ]);
	}

	const result = [];
	const [ _firstIntervalStart, firstIntervalEmployeeIdx, firstIntervalIdx ] = heap.peek();
	let previous = schedule[firstIntervalEmployeeIdx][firstIntervalIdx][0];

	while (heap.size() > 0) {
		const [ _, i, j ] = heap.extractMin();
		const interval = schedule[i][j];

		if (interval[0] > previous) {
			const freeInterval = [ previous, interval[0] ];
			result.push(freeInterval);
		}

		previous = Math.max(previous, interval[1]);

		if (j + 1 < schedule[i].length) {
			const nextInterval = schedule[i][j + 1];
			heap.insert([ nextInterval[0], i, j + 1 ]);
		}
	}
	return result;
}

function mergeInterval(intervals, newInterval) {
	const tail = intervals.length - 1;
	if (tail < 0 || intervals[tail][1] < newInterval[0]) {
		intervals.push(newInterval);
	} else {
		intervals[tail][1] = Math.max(intervals[tail][1], newInterval[1]);
	}
}

pressEnterToStart(() => {
	const inputs = [
		// [
		// 	[ [ 1, 2 ], [ 5, 6 ] ],
		// 	[ [ 1, 3 ] ],
		// 	[ [ 4, 10 ] ],
		// ],
		[ [ [ 1, 3 ], [ 6, 7 ] ], [ [ 2, 4 ] ], [ [ 2, 5 ], [ 9, 12 ] ] ],
	];
	for (const input of inputs) {
		const answer = employeeFreeTime(input);
		console.log(`[${input}]: [${answer}]`);
	}
	console.log('Done!');
});
