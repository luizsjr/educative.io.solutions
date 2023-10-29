import pressEnterToStart from '../lib/wait-for-start';
import IntervalMinHeap from '../lib/interval-min-heap';

function findSets(intervals) {
	const heap = new IntervalMinHeap();

	intervals.sort((a, b) => a[0] - b[0]);
	console.log(intervals);

	for (const interval of intervals) {
		if (heap.size() > 0 && interval[0] >= heap.peek()) {
			heap.extractMin();
		}
		heap.insert(interval[1]);
	}

	return heap.size();
}

pressEnterToStart(() => {
	const inputs = [
		[ [ 2, 8 ], [ 3, 4 ], [ 3, 9 ], [ 5, 11 ], [ 8, 20 ], [ 11, 15 ] ],
		[ [ 1, 2 ], [ 4, 6 ], [ 3, 4 ], [ 7, 8 ] ],
	];
	for (const input of inputs) {
		const answer = findSets(input);
		console.log(`[${input}]: ${answer}`);
	}
	console.log('Done!');
});
