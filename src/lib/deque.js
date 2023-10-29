// a node in a doubly linked list
class Node {
	constructor(value) {
		this.value = value;
		this.next = null;
		this.prev = null;
	}
}

export default class Deque {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	//  add value to the beginning of the list
	unshift(value) {
		const newNode = new Node(value);

		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			newNode.next = this.head;
			this.head.prev = newNode;
			this.head = newNode;
		}

		this.length++;
	}

	//  add value to the end of the list
	push(value) {
		const newNode = new Node(value);

		if (!this.tail) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			newNode.prev = this.tail;
			this.tail.next = newNode;
			this.tail = newNode;
		}

		this.length++;
	}

	//  remove value from the beginning of the list
	shift() {
		if (!this.head) {
			return null;
		}

		const removed = this.head;

		if (this.head === this.tail) {
			this.head = null;
			this.tail = null;
		} else {
			this.head = removed.next;
			this.head.prev = null;
		}

		this.length--;

		return removed.value;
	}

	//  remove value from the end of the list
	pop() {
		if (!this.tail) {
			return null;
		}

		const removed = this.tail;

		if (this.head === this.tail) {
			this.head = null;
			this.tail = null;
		} else {
			this.tail = removed.prev;
			this.tail.next = null;
		}

		this.length--;

		return removed.value;
	}

	// get the front value
	peekFront() {
		return this.head ? this.head.value : null;
	}

	// get the last value
	peekBack() {
		return this.tail ? this.tail.value : null;
	}

	// check if the deque is empty or not
	isEmpty() {
		return this.length === 0;
	}

	// helper function to convert the values into a string
	toString() {
		if (this.head === null) return '[]';

		let result = '[';
		let current = this.head;
		while (current.next !== null) {
			result += `${current.value},`;
			current = current.next;
		}
		result += `${current.value}]`;
		return result;
	}
}
