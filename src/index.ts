#!/usr/bin/env node
/* eslint-disable consistent-return */
import * as inquirer from 'inquirer';

import { readNotes } from './handleJson';
import execNote from './execNote';

const { createPromptModule } = inquirer;
const initialPrompt = createPromptModule();

var argv = require('minimist')(process.argv.slice(2));

(async () => {
  const notes = readNotes();
  const { _ } = argv;
  let { q, n, l, d, h, e, clear } = argv;
  if (_.includes('l')) {
    l = true;
  }
  if (_.includes('n')) {
    n = true;
  }
  if (_.includes('q')) {
    q = true;
  }
  if (_.includes('e')) {
    e = true;
  }
  const noArgs = !l && !n && !d && !q && !e && !clear;

  if (noArgs) {
    const { selection } = await initialPrompt({
      type: 'list',
      name: 'selection',
      message: 'What would you like to do?',
      choices: [
        'Create New Note',
        'List Notes',
        'Edit Notes',
        'Delete Notes',
        'Clear Notes',
        'Help',
      ],
    });
    // set flags and continue execution
    if (selection === 'Create New Note') {
      n = true;
    }
    if (selection === 'List Notes') {
      l = true;
    }
    if (selection === 'Edit Notes') {
      e = true;
    }
    if (selection === 'Delete Notes') {
      d = true;
    }
    if (selection === 'Clear Notes') {
      clear = true;
    }
    if (selection === 'Help') {
      h = true;
    }
    return execNote({ q, n, l, e, d, h, clear, _ }, notes);
  } else {
    return execNote({ q, n, l, e, d, h, clear, _ }, notes);
  }
})();
