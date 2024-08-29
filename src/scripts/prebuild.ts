/* eslint-disable no-console */
import fs from 'fs';
import path, { resolve } from 'path';

import dotenv from 'dotenv';

function loadEnvFile() {
  let envFilePath = '.env.local'; // Default to .env.local for development

  // Check if the environment is production
  if (process.env.NODE_ENV === 'production') {
    envFilePath = '.env.production.local'; // Use .env.production.local for production
  }

  // Load environment variables from the determined file path
  dotenv.config({ path: resolve(__dirname, '..', '..', envFilePath) });
}

// Call the function to load the environment file
loadEnvFile();

export const runAsync = async () => {
  const processArgs = process.argv.slice(2);
  const args: { scaffold?: boolean } = {};
  if (processArgs.includes('--scaffold')) {
    args.scaffold = true;
  }

  const files = fs
    .readdirSync(path.join(__dirname, 'pre-build'))
    .filter((file) => file.endsWith('.ts'))
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
