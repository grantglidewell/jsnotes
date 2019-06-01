/* eslint-disable consistent-return */
const inquirer = require('inquirer');
const yargs = require('yargs');

const prompt = inquirer.createPromptModule();
const { readNotes } = require('./json');
const execNote = require('./execNote');

module.exports = async () => {
  /* 
  // Arguments
  // -l - list notes
  // -n - new note
  // b - body
  // t - title
  // d - delete
  // clear -- clear all notes
  // local -- create note in local mode // not implemented
  */
  const notes = readNotes();
  const { _ } = yargs.argv;
  let { q, n, l, d, h, clear } = yargs.argv;
  if (_.includes('l')) {
    l = true;
  }
  if (_.includes('n')) {
    n = true;
  }
  if (_.includes('q')) {
    q = true;
  }
  const noArgs = !l && !n && !d && !q && !clear;

  if (noArgs) {
    await prompt({
      type: 'list',
      name: 'selection',
      message: 'What would you like to do?',
      choices: [
        'Create New Note',
        'List Notes',
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
      if (selection === 'Delete Notes') {
        d = true;
      }
      if (selection === 'Clear Notes') {
        clear = true;
      }
      if (selection === 'Help') {
        h = true;
      }
      return execNote({ q, n, l, d, h, clear, _ }, notes);
    });
  } else {
    return execNote({ q, n, l, d, h, clear, _ }, notes);
  }
};

// todo: localized modes? mark paths, do not create local files
