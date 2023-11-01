import LinkedList from '../lib/linked-list';
import pressEnterToStart from '../lib/wait-for-start';

function reorderList(head) {
	if (!head || !head.next) {
		return head;
	}

	const halfHead = splitListInHalf(head);
	const reversedHead = reverseList(halfHead);
	mergeLists(head, reversedHead);

	return head;
}

function mergeLists(head1, head2) {
	let p1 = head1;
	let p2 = head2;
	let p1Next = null;
	let p2Next = null;

	while (p1 !== null) {
		p1Next = p1.next;
		p2Next = p2.next;
		p1.next = p2;
		p2.next = p1Next || p2Next;
		p1 = p1Next;
		p2 = p2Next;
	}
	return head1;
}

function reverseList(head) {
	if (!head || !head.next) {
		return head;
	}

	let previous = null;
	let current = head;
	let next = null;

	while (current !== null) {
		next = current.next;
		current.next = previous;
		previous = current;
		current = next;
	}

	return previous;
}

function splitListInHalf(head) {
	if (!head || !head.next) {
		return head;
	}

	let previousSlow = null;
	let slow = head;
	let fast = head;
	while (fast !== null && fast.next !== null) {
		previousSlow = slow;
		slow = slow.next;
		fast = fast.next?.next ?? null;
	}
	previousSlow.next = null;
	return slow;
}

pressEnterToStart(() => {
	const inputs = [
		[ [ 1, 2, 3, 4, 5 ] ],
		[ [ 1, 2, 3, 4 ] ],
	];
	for (const input of inputs) {
		const list = new LinkedList();
		list.createLinkedList(input[0]);
		const inputList = list.toArray();
		list.head = reorderList(list.head);
		console.log(`[${inputList}]: [${list.toArray()}]`);
	}
	console.log('Done!');
});
