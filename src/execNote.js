/* eslint-disable consistent-return */
const inquirer = require('inquirer');

const prompt = inquirer.createPromptModule();
const { writeNote, deleteNote, clearAll } = require('./json');
const printNote = require('./printNote');

// TODO: remove body and title flags in favor of quick
// Create a note schema {title, type, payload: {message, items, completed}}
// printNote needs to be updated to print the list, showing what is checked off

module.exports = ({ t, n, l, b, d, h, clear, _ }, notes) => {
  if (h) {
    return console.table({
      list: '-l or l to list out notes',
      new: '-n or n to create a new note (with prompts)',
      title: '-t used with -n to create the note title',
      body: '-b used with -n to create the note body',
      delete: '-d to select a note to delete',
      clear: '--clear to delete all notes',
    });
  }

  if (n) {
    if (b && t) {
      writeNote({ title: t, body: b });
      return console.log(`Note created with title: ${t}`);
    }
    prompt([
      { type: 'question', name: 'title', message: 'Title:' },
      // type of note, checklist or text
      { type: 'question', name: 'body', message: 'Note:' },
    ]).then(({ body, title }) => {
      writeNote({ title, body });
      return console.log(`Note created with title: ${title}`);
    });
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
