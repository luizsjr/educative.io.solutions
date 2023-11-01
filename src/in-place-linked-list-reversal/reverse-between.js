import LinkedList from '../lib/linked-list';
import LinkedListNode from '../lib/linked-list-node';
import pressEnterToStart from '../lib/wait-for-start';

function reverseBetween(head, left, right) {
	const dummy = new LinkedListNode(0);
	dummy.next = head;
	let startMinusOne = dummy;
	let start = head;

	// find left
	for (let i = 1; i < left && start != null; i++) {
		startMinusOne = start;
		start = start.next;
	}

	// reverse until right
	let previous = null;
	let next = null;
	let current = start;
	for (let i = left; i <= right; i++) {
		next = current.next;
		current.next = previous;
		previous = current;
		current = next;
	}

	// reconnect reversed nodes
	startMinusOne.next = previous;
	start.next = current;

	return dummy.next;
}

pressEnterToStart(() => {
	const inputs = [
		[ [ 1, 2, 3, 4, 5, 4, 3, 2, 1 ], 1, 9 ],
	];
	for (const input of inputs) {
		const list = new LinkedList();
		list.createLinkedList(input[0]);
		list.head = reverseBetween(list.head, input[1], input[2]);
		console.log(`[${input[0]}], ${input[1]}, ${input[2]}: [${list.toArray()}]`);
	}
	console.log('Done!');
});
