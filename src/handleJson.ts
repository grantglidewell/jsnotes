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
      message: `Note named: '${note.title}' exists, overwrite?`,
    });
    if (confirm) {
      const updatedNotes = { ...notes, [note.title]: { ...note } };
      writeFileSync(file(), JSON.stringify(updatedNotes));
      return console.log(`Updated note: ${note.title}`);
    }
    return console.log(`nothing updated`);
  } else {
    const updatedNotes = { ...notes, [note.title]: { ...note } };
    writeFileSync(file(), JSON.stringify(updatedNotes));
    return console.log(`Updated note: ${note.title}`);
  }
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
    return writeFileSync(file(), '');
  }
  return null;
};
