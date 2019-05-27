const jsonfile = require('jsonfile');
const inquirer = require('inquirer');

const prompt = inquirer.createPromptModule();
const file = `${__dirname}/data.json`;

module.exports = {
  readNotes: () => {
    return jsonfile.readFileSync(file);
  },
  writeNote: note => {
    const notes = jsonfile.readFileSync(file);
    // confirm replace note
    if (notes[note]) {
      return prompt({
        type: 'confirm',
        name: 'confirm',
        message: `Note named: '${note}' exists, overwrite?`,
      }).then(({ confirm }) => {
        if (confirm) {
          const updatedNotes = { ...notes, [note.title]: { ...note } };
          return jsonfile.writeFileSync(file, updatedNotes);
        }
        return null;
      });
    }
    const updatedNotes = { ...notes, [note.title]: { ...note } };
    return jsonfile.writeFileSync(file, updatedNotes);
  },
  deleteNote: note => {
    const notes = jsonfile.readFileSync(file);
    delete notes[note];
    jsonfile.writeFileSync(file, notes);
  },
  clearAll: () => {
    return prompt({
      type: 'confirm',
      name: 'confirm',
      default: false,
      message: `Are you sure you want to Delete all notes?`,
    }).then(({ confirm }) => {
      if (confirm) {
        return jsonfile.writeFileSync(file, {});
      }
      return null;
    });
  },
};
