const boxen = require('boxen');

module.exports = note => {
  console.log(
    boxen(note.title, {
      margin: { top: 1 },
      padding: { left: 1, right: 1, bottom: 0, top: 0 },
      borderStyle: 'round',
      borderColor: 'cyan',
      dimBorder: true,
    }),
    boxen(note.body, {
      margin: { top: 1, bottom: 1 },
      padding: 1,
      marginTop: 0,
      borderStyle: 'double',
      borderColor: 'cyan',
    })
  );
};
