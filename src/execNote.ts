/* eslint-disable consistent-return */
import { TextNote, ListNote, Notes } from './interfaces';
import { AppFlags } from './interfaces';
import { createPromptModule } from 'inquirer';

import { writeNote, deleteNote, clearAll } from './handleJson';
import editNote from './editNote';
import printNote from './printNote';

const prompt = createPromptModule();

export default async (
  { q, n, l, d, h, e, clear, _ }: AppFlags,
  notes: Notes
) => {
  if (h) {
    return console.table({
      list: 'jsn -l or l to list out notes',
      edit: 'jsn -e or e to list out notes to edit',
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
      }).then(({ selected }: { selected: string }) => {
        return printNote(notes[selected]);
      });
    }
    return console.log("No notes :( --  use '-n' to create a new note");
  }
  if (e) {
    if (Object.keys(notes).length) {
      return prompt({
        type: 'list',
        name: 'selected',
        message: 'Notes:',
        choices: Object.keys(notes),
      }).then(({ selected }: { selected: string }) => {
        return editNote(notes[selected]);
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
    ]).then(({ selected, confirm }: { selected: string; confirm: Boolean }) =>
      confirm ? deleteNote(selected) : null
    );
  }
  if (clear) {
    return clearAll();
  }
};
