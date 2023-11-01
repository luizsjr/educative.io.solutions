import LinkedList from '../lib/linked-list';
import pressEnterToStart from '../lib/wait-for-start';

function swapNodes(head, k) {
	// find the k-th from the start
	let kthFromStart = head;
	for (let i = 1; i < k && kthFromStart !== null; i++) {
		kthFromStart = kthFromStart.next;
	}

	// validate input
	if (kthFromStart !== null) {
		// find the k-th from the end
		let kthFromEnd = head;
		let walker = kthFromStart;
		while (walker !== null && walker.next !== null) {
			walker = walker.next;
			kthFromEnd = kthFromEnd.next;
		}

		// swap values
		const tempData = kthFromStart.data;
		kthFromStart.data = kthFromEnd.data;
		kthFromEnd.data = tempData;
	}

	return head;
}

pressEnterToStart(() => {
	const inputs = [
		[ [ 1, 2, 3, 4, 5, 6 ], 6 ],
	];
	for (const input of inputs) {
		const list = new LinkedList();
		list.createLinkedList(input[0]);
		const inputList = list.toArray();
		list.head = swapNodes(list.head, input[1]);
		console.log(`[${inputList}], k=${input[1]}: [${list.toArray()}]`);
	}
	console.log('Done!');
});
