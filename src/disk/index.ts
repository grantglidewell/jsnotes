import { TextNote, Notes, Config } from '../interfaces';

import { createPromptModule } from 'inquirer';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import * as os from 'os';
import { deleteItem } from '../api';

const prompt = createPromptModule();

export const file = (): string => {
  const home = `${os.homedir()}/jsnotes/data.json`;
  if (!existsSync(home)) {
    if (!existsSync(`${os.homedir()}/jsnotes`)) {
      mkdirSync(`${os.homedir()}/jsnotes`);
    }
    writeFileSync(home, '{}');
  }
  return home;
};

export const config = (): Config => {
  const config = `${os.homedir()}/jsnotes/config.json`;
  if (!existsSync(config)) {
    if (!existsSync(`${os.homedir()}/jsnotes`)) {
      mkdirSync(`${os.homedir()}/jsnotes`);
    }
    writeFileSync(config, JSON.stringify({ token: '', projectId: '' }));
  }
  return JSON.parse(readFileSync(config).toString());
};

export const readNotes = (): Notes => {
  return JSON.parse(readFileSync(file()).toString());
};

export const writeNote = async (note: TextNote, forceOverwrite?: Boolean) => {
  const notes: Notes = readNotes();
  // confirm replace note
  if (notes[note.title] && !forceOverwrite) {
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

export const deleteNote = async (note: TextNote, hasAPIToken: Boolean) => {
  const notes: Notes = readNotes();
  delete notes[note.title];
  if (hasAPIToken) {
    await deleteItem(note);
  }
  writeFileSync(file(), JSON.stringify(notes));
  return console.log(`Deleted ${note.title}`);
};

export const clearAll = async () => {
  const { confirm } = await prompt({
    type: 'confirm',
    name: 'confirm',
    default: false,
    message: `Are you sure you want to Delete all local notes?`,
  });

  if (confirm) {
    return writeFileSync(file(), '');
  }
  return null;
};
