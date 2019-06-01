import { TextNote, ListNote } from './interfaces';

const inquirer = require('inquirer');
const editPrompt = inquirer.createPromptModule();

module.exports = (note: TextNote | ListNote) => {
  if (note.type === 'text') {
    console.log(note);
  }
  if (note.type === 'checklist') {
    console.log(note);
  }
};
