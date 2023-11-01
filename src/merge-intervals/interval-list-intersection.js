import pressEnterToStart from '../lib/wait-for-start';

function intervalsIntersection2(intervalListA, intervalListB) {
	let pA = 0;
	let pB = 0;
	const result = [];
	let intersection = [];
	while (pA < intervalListA.length && pB < intervalListB.length) {
		const aStart = intervalListA[pA][0];
		const aEnd = intervalListA[pA][1];
		const bStart = intervalListB[pB][0];
		const bEnd = intervalListB[pB][1];

		if (aStart >= bStart && aStart <= bEnd) {
			intersection[0] = aStart;
		} else if (bStart >= aStart && bStart <= aEnd) {
			intersection[0] = bStart;
		}

		if (aEnd >= bStart && aEnd <= bEnd) {
			intersection[1] = aEnd;
			result.push(intersection);
			intersection = [];
			pA++;
		} else if (bEnd >= aStart && bEnd <= aEnd) {
			intersection[1] = bEnd;
			result.push(intersection);
			intersection = [];
			pB++;
		} else if (aStart >= bEnd) {
			pB++;
		} else if (bStart >= aEnd) {
			pA++;
		}
	}
	return result;
}

function intervalsIntersection(intervalListA, intervalListB) {
	let pA = 0;
	let pB = 0;
	const result = [];

	while (pA < intervalListA.length && pB < intervalListB.length) {
		const aStart = intervalListA[pA][0];
		const aEnd = intervalListA[pA][1];
		const bStart = intervalListB[pB][0];
		const bEnd = intervalListB[pB][1];

		const intersection = [];
		intersection[0] = Math.max(aStart, bStart);
		intersection[1] = Math.min(aEnd, bEnd);

		if (intersection[0] <= intersection[1]) {
			result.push(intersection);
		}

		if (aEnd < bEnd) {
			pA++;
		} else {
			pB++;
		}
	}
	return result;
}

pressEnterToStart(() => {
	const inputs = [
		// [
		// 	[ [ 1, 4 ], [ 5, 6 ], [ 7, 8 ], [ 9, 15 ] ],
		// 	[ [ 2, 4 ], [ 5, 7 ], [ 9, 15 ] ],
		// ],
		[
			[ [ 1, 4 ], [ 5, 6 ], [ 7, 8 ], [ 9, 15 ] ],
			[ [ 2, 4 ], [ 5, 7 ], [ 9, 15 ] ],
		],
	];
	for (const input of inputs) {
		const answer = intervalsIntersection(input[0], input[1]);
		console.log(`[${input[0]}] , [${input[1]}]: [${answer}]`);
	}
	console.log('Done!');
});
