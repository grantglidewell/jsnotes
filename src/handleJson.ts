import { TextNote, ListNote, Notes } from './interfaces';

import { readFileSync, writeFileSync } from 'jsonfile';
import { createPromptModule } from 'inquirer';
import { existsSync, mkdirSync } from 'fs';
import * as os from 'os';

const prompt = createPromptModule();

const file = () => {
  const home = `${os.homedir()}/jsnotes/data.json`;
  if (!existsSync(home)) {
    if (!existsSync(`${os.homedir()}/jsnotes`)) {
      mkdirSync(`${os.homedir()}/jsnotes`);
    }
    writeFileSync(home, {});
  }
  return home;
};

export const readNotes = () => {
  return readFileSync(file());
};

export const writeNote = async (note: TextNote | ListNote) => {
  const notes: Notes = readFileSync(file());
  // confirm replace note
  if (notes[note.title]) {
    const { confirm } = await prompt({
      type: 'confirm',
      name: 'confirm',
      message: `Note named: '${note}' exists, overwrite?`,
    });
    if (confirm) {
      const updatedNotes = { ...notes, [note.title]: { ...note } };
      return writeFileSync(file(), updatedNotes);
    }
    return null;
  }
  const updatedNotes = { ...notes, [note.title]: { ...note } };
  return writeFileSync(file(), updatedNotes);
};

export const overwriteNote = (note: TextNote | ListNote) => {
  const notes: Notes = readFileSync(file());
  // confirm replace note
  const updatedNotes = { ...notes, [note.title]: { ...note } };
  return writeFileSync(file(), updatedNotes);
};

export const deleteNote = (note: string) => {
  const notes: Notes = readFileSync(file());
  delete notes[note];
  writeFileSync(file(), notes);
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
    return writeFileSync(file(), {});
  }
  return null;
};
