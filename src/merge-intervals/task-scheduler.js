import pressEnterToStart from '../lib/wait-for-start';

function leastTime(tasks, n) {
	const tasksFrequency = {};
	for (const task of tasks) {
		tasksFrequency[task] = (tasksFrequency[task] ?? 0) + 1;
	}

	const sortedFrequency = Array.from(Object.entries(tasksFrequency))
		.sort((a, b) => a[1] - b[1]);

	const maxFrequency = sortedFrequency.pop()[1];
	let idleTime = (maxFrequency - 1) * n;
	while (sortedFrequency.length > 0 && idleTime > 0) {
		const currentFrequency = sortedFrequency.pop()[1];
		idleTime -= Math.min(maxFrequency - 1, currentFrequency);
	}
	return tasks.length + idleTime;
}

pressEnterToStart(() => {
	const inputs = [
		// [ [ 'A', 'A', 'A', 'B', 'B', 'C', 'C' ], 2 ],
		[ [ 'A', 'A', 'A', 'B', 'B', 'C', 'C' ], 1 ],
	];
	for (const input of inputs) {
		const answer = leastTime(input[0], input[1]);
		console.log(`[${input[0]}], n = ${input[1]}: ${answer}`);
	}
	console.log('Done!');
});
