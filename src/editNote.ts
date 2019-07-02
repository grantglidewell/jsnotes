import { TextNote, ListNote } from './interfaces';
import * as inquirer from 'inquirer';

import { writeNote } from './disk';

const { createPromptModule } = inquirer;
const editPrompt = createPromptModule();

export default async (note: TextNote | ListNote) => {
  if (note.type === 'text') {
    const { message } = await editPrompt({
      type: 'input',
      name: 'message',
      default: note.body.message,
      message: note.title,
    });
    const newNote: TextNote = {
      title: note.title,
      type: 'text',
      body: {
        message,
      },
    };
    return writeNote(newNote);
  }
  if (note.type === 'checklist') {
    const { completed } = await editPrompt({
      type: 'checkbox',
      name: 'completed',
      choices: note.body.items.map(item => {
        return { name: item, checked: note.body.completed.includes(item) };
      }),
      message: note.title,
    });
    const newNote: ListNote = {
      title: note.title,
      type: 'checklist',
      body: {
        items: note.body.items,
        completed,
      },
    };
    return writeNote(newNote);
  }
};
