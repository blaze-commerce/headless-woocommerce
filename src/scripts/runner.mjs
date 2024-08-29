/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

import nextEnv from '@next/env';

nextEnv.loadEnvConfig(process.cwd());

export const runAsync = async () => {
  // print process.argv
  const processArgs = process.argv.slice(2);
  let args = {};
  if (processArgs.includes('--scaffold')) {
    args.scaffold = true;
  }

  const files = fs
    .readdirSync(path.join(__dirname, 'pre-build'))
    .filter((file) => file.endsWith('.mjs'))
    .sort();

  for (const file of files) {
    const { default: defaultFunc } = await import(`./pre-build/${file}`);
    try {
      console.log(`Running pre-build script '${file}'`);
      await defaultFunc({ env: process.env, args });
    } catch (e) {
      console.error(`SCRIPT RUNNER: failed to execute pre-build script '${file}'`);
      console.error(e);
    }
  }
};

// Self-invocation async function
(async () => {
  await runAsync();
})().catch((err) => {
  console.error(err);
  throw err;
});
