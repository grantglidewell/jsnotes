import { TextNote } from './interfaces';
import * as inquirer from 'inquirer';

import { writeNote } from './disk';

const { createPromptModule } = inquirer;
const editPrompt = createPromptModule();

export default async (note: TextNote) => {
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
  return writeNote(newNote);
};
