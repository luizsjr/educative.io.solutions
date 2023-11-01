import LinkedList from '../lib/linked-list';
import pressEnterToStart from '../lib/wait-for-start';

function reverseEvenLengthGroups(head) {
	let size = 1;
	let p = head;

	while (p && p.next) {
		size += 1;
		const start = p.next;
		let end = start;
		let groupSize = 1;
		while (groupSize < size && end.next) {
			end = end.next;
			groupSize += 1;
		}
		if (groupSize % 2 === 0) {
			const next = reverseList(start, groupSize);
			p.next = end;
			start.next = next;
			end = start;
		}
		if (groupSize !== size) {
			break;
		}
		p = end;
	}
	return head;
}

function reverseList(start, n) {
	let prev = null;
	let curr = start;
	let next = null;

	for (let i = 0; i < n; i++) {
		next = curr.next;
		curr.next = prev;
		prev = curr;
		curr = next;
	}
	return next;
}

pressEnterToStart(() => {
	const inputs = [
		[ [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ] ],
		[ [ 1, 2, 3, 4, 5, 6, 7, 8 ] ],
		[ [ 1, 2, 3, 4, 5 ] ],
		[ [ 10, 1, 2, 3, 4, 5 ] ],
		[ [ 1, 2, 3, 4 ] ],
		[ [ 1, 2, 3 ] ],
	];
	for (const input of inputs) {
		const list = new LinkedList();
		list.createLinkedList(input[0]);
		const inputList = list.toArray();
		list.head = reverseEvenLengthGroups(list.head);
		console.log(`[${inputList}]: [${list.toArray()}]`);
	}
	console.log('Done!');
});
