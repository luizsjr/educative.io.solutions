import pressEnterToStart from '../lib/wait-for-start';

function maxProfit(prices) {
	let profit = 0;

	if (prices.length < 2) {
		return profit;
	}

	let buy = 0;
	for (let sell = 1; sell < prices.length; sell++) {
		if (prices[sell] < prices[buy]) {
			buy = sell;
		} else {
			profit = Math.max(profit, prices[sell] - prices[buy]);
		}
	}

	return profit;
}

pressEnterToStart(() => {
	const inputs = [
		[ 1, 2, 4, 2, 5, 7, 2, 4, 9, 0, 9 ],
	];
	for (const input of inputs) {
		const answer = maxProfit(input);
		console.log(`${input}: ${answer}`);
	}
	console.log('Done!');
});
