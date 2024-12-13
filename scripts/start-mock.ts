import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function runCommand(command: string): Promise<void> {
  try {
    const { stdout, stderr } = await execAsync(command);
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error);
    process.exit(1);
  }
}

async function main() {
  console.log('🔍 Generating API types...');
  await runCommand('npm run generate:api');

  console.log('✨ Checking TypeScript types...');
  await runCommand('npm run test:types');

  console.log('🚀 Starting mock server...');
  await runCommand('prism mock openapi.combined.yaml -d');
}

main().catch((error) => {
  console.error('Failed to start mock server:', error);
  process.exit(1);
}); 