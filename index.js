#!/usr/bin/env node

import { program } from 'commander';
import pc from 'picocolors';
import depcheck from 'depcheck';
import inquirer from 'inquirer';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

program
  .version('1.0.0')
  .description('Hunt down and execute unused dependencies bloated in your package.json.')
  .parse(process.argv);

const banner = `
    ██████╗ ███████╗██████╗     ██████╗ ███████╗███████╗██████╗ ███████╗██████╗ 
    ██╔══██╗██╔════╝██╔══██╗    ██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔══██╗
    ██║  ██║█████╗  ██████╔╝    ██████╔╝█████╗  █████╗  ██████╔╝█████╗  ██████╔╝
    ██║  ██║██╔══╝  ██╔═══╝     ██╔══██╗██╔══╝  ██╔══╝  ██╔═══╝ ██╔══╝  ██╔══██╗
    ██████╔╝███████╗██║         ██║  ██║███████╗███████╗██║     ███████╗██║  ██║
    ╚═════╝ ╚══════╝╚═╝         ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝
`;

console.log(pc.red(banner));
console.log(pc.gray('    Execute the dead weight in your node_modules.'));
console.log(pc.cyan('    Architected by @lakshanmuruganandam\n'));

if (!fs.existsSync(path.join(process.cwd(), 'package.json'))) {
  console.log(pc.red('❌ No package.json found in the current directory.'));
  process.exit(1);
}

console.log(pc.yellow('🔍 Scanning for dead dependencies...\\n'));

const options = {};

depcheck(process.cwd(), options, async (unused) => {
  const deadDeps = [...unused.dependencies, ...unused.devDependencies];

  if (deadDeps.length === 0) {
    console.log(pc.green('✨ Your project is perfectly lean. No dead dependencies found.'));
    process.exit(0);
  }

  console.log(pc.white(`💀 Found ${pc.bold(pc.red(deadDeps.length))} dead dependencies hogging space:`));
  deadDeps.forEach(dep => console.log(pc.gray(`   - ${dep}`)));
  console.log('');

  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: pc.red('Do you want to execute (uninstall) all of these dead dependencies right now?'),
      default: false
    }
  ]);

  if (confirm) {
    console.log(pc.yellow('\\nExecuting dependencies...'));
    try {
      execSync(\`npm uninstall \${deadDeps.join(' ')}\`, { stdio: 'inherit' });
      console.log(pc.green('\\n✅ Carnage complete. Dead dependencies have been purged.'));
    } catch (e) {
      console.log(pc.red('\\n❌ Failed to uninstall some dependencies. Do it manually.'));
    }
  } else {
    console.log(pc.gray('\\nCoward. The dead weight remains.'));
  }
});
