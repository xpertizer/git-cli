#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import { program } from 'commander';
import fetchUser from './commands/fetchuser';
import listUser from './commands/listuser';

clear();
console.log(
  chalk.greenBright(figlet.textSync('git-cli', { horizontalLayout: 'full' })),
);

program
  .version('0.0.1')
  .description('Cli app to fetch e query programming languages and locations')
  .parse(process.argv);

program
  .command('fetchUser <user>')
  .description('Fetch data from a git user to database')
  .action(fetchUser);

program
  .command('listUser <location>')
  .description('List all users in a specifica location')
  .action(listUser);

program.parse();
