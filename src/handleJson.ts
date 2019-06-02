import { TextNote, ListNote, Notes } from './interfaces';

const { readFileSync, writeFileSync } = require('jsonfile');
const { existsSync, mkdirSync } = require('fs');
const inquirer = require('inquirer');
const os = require('os');

const prompt = inquirer.createPromptModule();
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

module.exports = {
  readNotes: () => {
    return readFileSync(file());
  },
  writeNote: (note: TextNote | ListNote) => {
    const notes: Notes = readFileSync(file());
    // confirm replace note
    if (notes[note.title]) {
      return prompt({
        type: 'confirm',
        name: 'confirm',
        message: `Note named: '${note}' exists, overwrite?`,
      }).then(({ confirm }: { confirm: Boolean }) => {
        if (confirm) {
          const updatedNotes = { ...notes, [note.title]: { ...note } };
          return writeFileSync(file(), updatedNotes);
        }
        return null;
      });
    }
    const updatedNotes = { ...notes, [note.title]: { ...note } };
    return writeFileSync(file(), updatedNotes);
  },
  overwriteNote: (note: TextNote | ListNote) => {
    const notes: Notes = readFileSync(file());
    // confirm replace note
    const updatedNotes = { ...notes, [note.title]: { ...note } };
    return writeFileSync(file(), updatedNotes);
  },
  deleteNote: (note: string) => {
    const notes: Notes = readFileSync(file());
    delete notes[note];
    writeFileSync(file(), notes);
  },
  clearAll: () => {
    return prompt({
      type: 'confirm',
      name: 'confirm',
      default: false,
      message: `Are you sure you want to Delete all notes?`,
    }).then(({ confirm }: { confirm: Boolean }) => {
      if (confirm) {
        return writeFileSync(file(), {});
      }
      return null;
    });
  },
};
