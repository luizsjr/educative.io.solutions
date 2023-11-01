import LinkedList from '../lib/linked-list';
import LinkedListNode from '../lib/linked-list-node';
import pressEnterToStart from '../lib/wait-for-start';

function swapPairs(head) {
	const dummy = new LinkedListNode(0);
	dummy.next = head;
	let left = dummy;
	let right = dummy;

	while (left.next && left.next.next) {
		right = right.next;

		const [ invHead, nextHead ] = revertWithNext(left.next);

		right.next = nextHead;
		left.next = invHead;
		left = right;
	}
	return dummy.next;
}

function revertWithNext(head) {
	let curr = head;
	let prev = null;
	let next = null;
	for (let i = 0; i < 2; i++) {
		next = curr.next;
		curr.next = prev;
		prev = curr;
		curr = next;
	}
	return [ prev, next ];
}

pressEnterToStart(() => {
	const inputs = [
		[ [ 1, 2 ] ],
		[ [ 1, 2, 3, 4 ] ],
		[ [ 1, 2, 3, 4, 5, 6 ] ],
		[ [ 1 ] ],
		[ [ 1, 2, 3 ] ],
		[ [ 1, 2, 3, 4, 5 ] ],
	];
	for (const input of inputs) {
		const list = new LinkedList();
		list.createLinkedList(input[0]);
		const inputList = list.toArray();
		list.head = swapPairs(list.head);
		console.log(`[${inputList}]: [${list.toArray()}]`);
	}
	console.log('Done!');
});
