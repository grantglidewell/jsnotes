import { TextNote, ListNote, Notes } from './interfaces';

import { createPromptModule } from 'inquirer';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import * as os from 'os';

const prompt = createPromptModule();

const file = (): string => {
  const home = `${os.homedir()}/jsnotes/data.json`;
  if (!existsSync(home)) {
    if (!existsSync(`${os.homedir()}/jsnotes`)) {
      mkdirSync(`${os.homedir()}/jsnotes`);
    }
    writeFileSync(home, '{}');
  }
  return home;
};

export const readNotes = (): Notes => {
  return JSON.parse(readFileSync(file()).toString());
};

export const writeNote = async (note: TextNote | ListNote) => {
  const notes: Notes = readNotes();
  // confirm replace note
  if (notes[note.title]) {
    const { confirm } = await prompt({
      type: 'confirm',
      name: 'confirm',
      message: `Note named: '${note}' exists, overwrite?`,
    });
    if (confirm) {
      const updatedNotes = { ...notes, [note.title]: { ...note } };
      return writeFileSync(file(), JSON.stringify(updatedNotes));
    }
    return null;
  }
  const updatedNotes = { ...notes, [note.title]: { ...note } };
  return writeFileSync(file(), JSON.stringify(updatedNotes));
};

export const deleteNote = (note: string) => {
  const notes: Notes = readNotes();
  delete notes[note];
  writeFileSync(file(), JSON.stringify(notes));
  return console.log(`Deleted ${note}`);
};

export const clearAll = async () => {
  const { confirm } = await prompt({
    type: 'confirm',
    name: 'confirm',
    default: false,
    message: `Are you sure you want to Delete all notes?`,
  });

  if (confirm) {
    return writeFileSync(file(), JSON.stringify({}));
  }
  return null;
};
