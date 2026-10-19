import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\x1b[36m%s\x1b[0m', '═══════════════════════════════════════════════════════════');
console.log('\x1b[1m\x1b[35m%s\x1b[0m', '  🚀 Starting TechEasy Web Solutions (React + Express)     ');
console.log('\x1b[36m%s\x1b[0m', '═══════════════════════════════════════════════════════════');

const isWin = process.platform === 'win32';
const npmCmd = isWin ? 'npm.cmd' : 'npm';
const npxCmd = isWin ? 'npx.cmd' : 'npx';

// Start Express Server
const serverProcess = spawn(
  'node',
  ['server.js'],
  {
    cwd: path.join(__dirname, 'server'),
    stdio: 'pipe',
    shell: true,
  }
);

// Start Vite React Client
const clientProcess = spawn(
  npmCmd,
  ['run', 'dev'],
  {
    cwd: path.join(__dirname, 'client'),
    stdio: 'pipe',
    shell: true,
  }
);

const logPrefix = (prefix, color, data) => {
  const lines = data.toString().split('\n');
  lines.forEach((line) => {
    if (line.trim()) {
      console.log(`${color}${prefix}\x1b[0m ${line}`);
    }
  });
};

serverProcess.stdout.on('data', (data) => logPrefix('[SERVER:5000]', '\x1b[32m', data));
serverProcess.stderr.on('data', (data) => logPrefix('[SERVER:ERR]', '\x1b[31m', data));

clientProcess.stdout.on('data', (data) => logPrefix('[CLIENT:5173]', '\x1b[34m', data));
clientProcess.stderr.on('data', (data) => logPrefix('[CLIENT:ERR]', '\x1b[33m', data));

const cleanup = () => {
  console.log('\nShutting down TechEasy servers...');
  serverProcess.kill();
  clientProcess.kill();
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
