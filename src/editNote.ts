import { TextNote, ListNote } from './interfaces';

const inquirer = require('inquirer');

const { overwriteNote } = require('./handleJson');

const editPrompt = inquirer.createPromptModule();

module.exports = async (note: TextNote | ListNote) => {
  if (note.type === 'text') {
    const newNote: TextNote = await editPrompt({
      type: 'question',
      name: 'message',
      default: note.body.message,
      message: note.title,
    }).then(({ message }) => {
      return {
        title: note.title,
        type: 'text',
        body: {
          message,
        },
      };
    });
    overwriteNote(newNote);
    return console.log(`Updated note: ${note.title}`);
  }
  if (note.type === 'checklist') {
    const newNote: ListNote = await editPrompt({
      type: 'checkbox',
      name: 'completed',
      choices: note.body.items.map(item => {
        return { name: item, checked: note.body.completed.includes(item) };
      }),
      message: note.title,
    }).then(({ completed }) => {
      return {
        title: note.title,
        type: 'checklist',
        body: {
          items: note.body.items,
          completed,
        },
      };
    });
    overwriteNote(newNote);
    return console.log(`Updated note: ${note.title}`);
  }
};
