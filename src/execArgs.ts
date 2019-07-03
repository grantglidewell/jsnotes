/* eslint-disable consistent-return */
import { TextNote, Notes } from './interfaces';
import { AppFlags } from './interfaces';
import * as inquirer from 'inquirer';

import { createItem, fetchItems } from './api';
import { writeNote, deleteNote, clearAll } from './disk';
import editNote from './editNote';
import printNote from './printNote';
import configureAPI from './api/configure';

const { createPromptModule } = inquirer;
const prompt = createPromptModule();

export default async (
  { q, n, l, d, h, e, clear, config, _, hasAPIToken }: AppFlags,
  notes: Notes
) => {
  const selectNote = async (postExec: Function) => {
    let allNotes: Notes;
    if (hasAPIToken) {
      // check remote for updated notes
      allNotes = await fetchItems(notes);
    } else {
      allNotes = notes;
    }
    if (Object.keys(allNotes).length) {
      const { selected } = await prompt({
        type: 'list',
        name: 'selected',
        message: 'Notes:',
        choices: Object.keys(allNotes),
      });
      return postExec(allNotes[selected]);
    }
    return console.log("No notes :( --  use '-n' to create a new note");
  };
  if (h) {
    return console.table({
      list: 'jsn -l or l to list out notes',
      edit: 'jsn -e or e to list out notes to edit',
      new: 'jsn -n or n to create a new note (with prompts)',
      quick: 'jsn -q or q used create a quick text note',
      delete: 'jsn -d to select a note to delete',
      clear: '--clear to delete all notes',
      config: '--config to set up the Todoist API',
      version: '--version to get the version',
    });
  }

  if (n) {
    const { title } = await prompt([
      { type: 'input', name: 'title', message: 'Title:' },
    ]);
    const { body } = await prompt({
      type: 'input',
      name: 'body',
      message: 'Note:',
    });
    const textNote: TextNote = {
      title,
      body: { message: body },
    };
    if (hasAPIToken) {
      const { id } = await createItem(textNote);
      textNote.id = id;
    }
    writeNote(textNote);
    return console.log(`Note created with title: ${title}`);
  }
  if (q) {
    const body = _.join(' ').slice(1);
    const title = new Date().toLocaleString();
    const quickNote: TextNote = { title, body: { message: body } };
    if (hasAPIToken) {
      const { id } = await createItem(quickNote);
      quickNote.id = id;
    }
    writeNote(quickNote);
    return console.log(`Note created with title: ${title}`);
  }
  if (l) {
    selectNote(printNote);
  }
  if (e) {
    selectNote(editNote);
  }
  if (d) {
    const { selected, confirm } = await prompt([
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
    ]);
    return confirm ? deleteNote(notes[selected], hasAPIToken) : null;
  }
  if (clear) {
    return clearAll();
  }
  if (config) {
    return configureAPI(notes);
  }
};
