import pressEnterToStart from './lib/wait-for-start';

enum Mapping {
	A = 1,
	C,
	G,
	T,
	length = T,
}

function findRepeatedSequences(s: string, k: number) {
	const answer: Set<string> = new Set();

	if (k > s.length) {
		return answer;
	}

	let hashValue = startingHash(s, k);
	const seenSequences = new Set<number>([ hashValue ]);

	for (let left = 0, right = k; right < s.length; left++, right++) {
		const removeValue = getMappedValue(s, left);
		const addValue = getMappedValue(s, right);
		hashValue = nextRollingHash(hashValue, k, removeValue, addValue);
		if (seenSequences.has(hashValue)) {
			answer.add(s.substring(left + 1, right + 1));
		}
		seenSequences.add(hashValue);
	}
	return answer;
}

function nextRollingHash(previousHash: number, hashLength: number, removeValue: Mapping, addValue: Mapping) {
	const leaving = Mapping.length ** (hashLength - 1) * removeValue;
	return Mapping.length * (previousHash - leaving) + addValue;
}

function startingHash(sequence: string, sequenceLength: number) {
	let hash = 0;
	for (let position = 0, powerValue = sequenceLength - 1; position < sequenceLength; position++, powerValue--) {
		const addValue = getMappedValue(sequence, position);
		hash += Mapping.length ** powerValue * addValue;
	}
	return hash;
}

function getMappedValue(sequence: string, position: number) {
	const value = sequence.charAt(position) as keyof typeof Mapping;
	return Mapping[value];
}

pressEnterToStart(() => {
	const inputs = [
		[ 'TTTTTGGGTTTTCCA', 10 ],
	];
	for (const input of inputs) {
		const answer = findRepeatedSequences(input[0] as string, input[1] as number);
		console.log(`[${input}]: ${answer.size} ${Array.from(answer)}`);
	}
});
