/* eslint-disable consistent-return */
import { TextNote, ListNote } from './interfaces';

const inquirer = require('inquirer');

const { writeNote, deleteNote, clearAll } = require('./json');
const printNote = require('./printNote');

const prompt = inquirer.createPromptModule();

// TODO: remove body and title flags in favor of quick
// Create a note schema {title, type, payload: {message, items, completed}}
// printNote needs to be updated to print the list, showing what is checked off

module.exports = async ({ q, n, l, d, h, clear, _ }, notes) => {
  if (h) {
    return console.table({
      list: 'jsn -l or l to list out notes',
      new: 'jsn -n or n to create a new note (with prompts)',
      quick: 'jsn -q or q used create a quick text note',
      delete: 'jsn -d to select a note to delete',
      clear: '--clear to delete all notes',
      version: '--version to get the version',
    });
  }

  if (n) {
    // this should be async await due to branching logic
    const { type, title } = await prompt([
      { type: 'question', name: 'title', message: 'Title:' },
      {
        type: 'list',
        name: 'type',
        choices: ['text', 'checklist'],
        message: 'Type:',
      },
    ]);
    if (type === 'text') {
      const { body } = await prompt({
        type: 'question',
        name: 'body',
        message: 'Note:',
      });
      const textNote: TextNote = {
        title,
        body: { message: body },
        type: 'text',
      };
      writeNote(textNote);
      return console.log(`Note created with title: ${title}`);
    }
    if (type === 'checklist') {
      const { body } = await prompt({
        type: 'question',
        name: 'body',
        message: 'Items (separated by comma):',
      });
      const listNote: ListNote = {
        title,
        body: { items: body.split(','), completed: [] },
        type: 'checklist',
      };
      writeNote(listNote);
      return console.log(`Note created with title: ${title}`);
    }
  }
  if (q) {
    const body = _.join(' ').slice(1);
    const title = new Date().toLocaleString();
    writeNote({ title, body: { message: body }, type: 'text' });
    return console.log(`Note created with title: ${title}`);
  }
  if (l) {
    if (Object.keys(notes).length) {
      return prompt({
        type: 'list',
        name: 'selected',
        message: 'Notes:',
        choices: Object.keys(notes),
      }).then(({ selected }) => {
        return printNote(notes[selected]);
      });
    }
    return console.log("No notes :( --  use '-n' to create a new note");
  }
  if (d) {
    return prompt([
      {
        type: 'list',
        name: 'selected',
        choices: Object.keys(notes),
      },
      {
        type: 'confirm',
        name: 'confirm',
        default: true,
        message: 'are you sure you want to delete this note?',
      },
    ]).then(({ selected, confirm }) => (confirm ? deleteNote(selected) : null));
  }
  if (clear) {
    return clearAll();
  }
};