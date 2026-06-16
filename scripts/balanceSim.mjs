#!/usr/bin/env node
/**
 * balanceSim.mjs – Balance simulation runner (§17 忠実シミュ)
 *
 * This script spawns vite-node to execute the TypeScript faithful simulation
 * that drives the real resolveTurn engine. For CI correctness, the canonical
 * assertions live in src/domain/balanceSim.test.ts (vitest).
 *
 * Run with:  node scripts/balanceSim.mjs
 * Or:        yarn test (runs balanceSim.test.ts as part of vitest suite)
 */

import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// Run the faithful sim via vite-node (TypeScript with @/ alias support)
const scriptPath = resolve(__dirname, 'balanceSimFaithful.ts');

console.log('='.repeat(70));
console.log('Balance Simulation – sekaiju-like-game (§17 忠実シミュ)');
console.log('='.repeat(70));
console.log('');
console.log('Running faithful simulation via vite-node...');
console.log('(Uses real resolveTurn engine from src/domain/battle.ts)');
console.log('');

try {
  execSync(`node_modules/.bin/vite-node ${scriptPath}`, {
    cwd: root,
    stdio: 'inherit',
  });
} catch {
  console.error('Simulation failed. Run `yarn test` to see detailed assertions.');
  process.exit(1);
}
