import LinkedList from '../lib/linked-list';
import LinkedListNode from '../lib/linked-list-node';
import pressEnterToStart from '../lib/wait-for-start';

function reverseKGroups(head, k) {
	const dummy = new LinkedListNode(0);
	dummy.next = head;
	let left = dummy;
	let right = dummy;

	while (left.next) {
		// Do we have enough nodes left to revert?
		let control = right;
		for (let i = 0; i < k && control; i++) {
			control = control.next;
		}
		if (!control) {
			break;
		}

		right = right.next;
		const [ invHead, nextHead ] = revertNodes(left.next, k);

		right.next = nextHead;
		left.next = invHead;
		left = right;
	}
	return dummy.next;
}

function revertNodes(head, k) {
	let curr = head;
	let prev = null;
	let next = null;
	for (let i = 0; i < k; i++) {
		next = curr.next;
		curr.next = prev;
		prev = curr;
		curr = next;
	}
	return [ prev, next ];
}

pressEnterToStart(() => {
	const inputs = [
		[ [ 1, 2, 3, 4, 5, 6 ], 2 ],
	];
	for (const input of inputs) {
		const list = new LinkedList();
		list.createLinkedList(input[0]);
		const inputList = list.toArray();
		list.head = reverseKGroups(list.head, input[1]);
		console.log(`[${inputList}], ${input[1]}: [${list.toArray()}]`);
	}
	console.log('Done!');
});
