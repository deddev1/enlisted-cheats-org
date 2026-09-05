import { spawn } from 'node:child_process';
import { networkInterfaces } from 'node:os';

const PORT = 3000;

function getLanIp() {
	for (const entries of Object.values(networkInterfaces())) {
		for (const entry of entries ?? []) {
			if (entry.family === 'IPv4' && !entry.internal) {
				return entry.address;
			}
		}
	}
	return '0.0.0.0';
}

const ip = getLanIp();
console.log('');
console.log('  Enlisted Cheats dev server');
console.log('  --------------------');
console.log(`  Local:   http://localhost:${PORT}/`);
console.log(`  Network: http://${ip}:${PORT}/`);
console.log('');

const child = spawn('npx', ['astro', 'dev', '--host', '0.0.0.0', '--port', String(PORT)], {
	stdio: 'inherit',
	shell: true,
});

child.on('exit', (code) => process.exit(code ?? 0));
