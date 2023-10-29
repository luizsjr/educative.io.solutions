import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export default async function pressEnterToStart(callback: Function) {
	const rl = readline.createInterface({ input, output });
	await rl.question('Press [Enter] to start...');
	return callback();
}
