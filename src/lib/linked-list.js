import LinkedListNode from './linked-list-node';

export default class LinkedList {
	constructor() {
		this.head = null;
	}

	insertNodeAtHead(node) {
		if (this.head != null) {
			node.next = this.head;
		}
		this.head = node;
	}

	createLinkedList(list) {
		list.reverse().forEach(
			(element) => this.insertNodeAtHead(new LinkedListNode(element)),
		);
	}

	toArray() {
		const result = [];
		let element = this.head;
		while (element != null) {
			result.push(element.data);
			element = element.next;
		}
		return result;
	}
}
