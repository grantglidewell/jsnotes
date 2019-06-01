/* eslint-disable consistent-return */
const inquirer = require('inquirer');
const yargs = require('yargs');

const { readNotes } = require('./handleJson');
const execNote = require('./execNote');
const initialPrompt = inquirer.createPromptModule();

module.exports = async () => {
  const notes = readNotes();
  const { _ } = yargs.argv;
  let { q, n, l, d, h, e, clear } = yargs.argv;
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
    await initialPrompt({
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
    }).then(({ selection }) => {
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
    });
  } else {
    return execNote({ q, n, l, e, d, h, clear, _ }, notes);
  }
};
