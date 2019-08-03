import { TextNote } from './interfaces';
import * as inquirer from 'inquirer';

import { writeNote } from './disk';
import { updateItem } from './api';

const { createPromptModule } = inquirer;
const editPrompt = createPromptModule();

export default async (note: TextNote, hasAPIToken: Boolean) => {
  const { message } = await editPrompt({
    type: 'input',
    name: 'message',
    default: note.body.message,
    message: note.title,
  });
  const newNote: TextNote = {
    title: note.title,
    body: {
      message,
    },
  };
  if (note.id) {
    newNote.id = note.id;
  }
  if (hasAPIToken && newNote.id) {
    await updateItem(newNote);
  }
  return writeNote(newNote, true);
};
