export default class IntervalMinHeap {
	constructor() {
		this.heap = [];
	}

	insert(data) {
		this.heap.push(data);
		this.#heapifyUp();
	}

	peek() {
		if (this.heap.length === 0) {
			return null;
		}
		return this.heap[0];
	}

	size() {
		return this.heap.length;
	}

	extractMin() {
		if (this.heap.length === 0) {
			return null;
		}

		if (this.heap.length === 1) {
			return this.heap.pop();
		}

		const min = this.heap[0];
		this.heap[0] = this.heap.pop();
		this.#heapifyDown();
		return min;
	}

	#parentIndex(index) {
		return Math.floor((index - 1) / 2);
	}

	#leftChildIndex(index) {
		return 2 * index + 1;
	}

	#rightChildIndex(index) {
		return 2 * index + 2;
	}

	#swap(index1, index2) {
		const temp = this.heap[index1];
		this.heap[index1] = this.heap[index2];
		this.heap[index2] = temp;
	}

	#heapifyUp() {
		let currentIndex = this.heap.length - 1;
		while (currentIndex > 0) {
			const parentIndex = this.#parentIndex(currentIndex);
			if (this.heap[parentIndex][0] > this.heap[currentIndex][0]) {
				this.#swap(parentIndex, currentIndex);
				currentIndex = parentIndex;
			} else {
				break;
			}
		}
	}

	#heapifyDown() {
		let currentIndex = 0;
		let leftIndex = this.#leftChildIndex(currentIndex);

		while (leftIndex < this.heap.length) {
			const rightIndex = this.#rightChildIndex(currentIndex);
			let smallestIndex = leftIndex;

			if (
				rightIndex < this.heap.length
				&& this.heap[rightIndex][0] < this.heap[leftIndex][0]
			) {
				smallestIndex = rightIndex;
			}

			if (this.heap[currentIndex][0] <= this.heap[smallestIndex][0]) {
				break;
			}

			this.#swap(currentIndex, smallestIndex);
			currentIndex = smallestIndex;
			leftIndex = this.#leftChildIndex(currentIndex);
		}
	}
}
