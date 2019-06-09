import { TextNote, ListNote } from './interfaces';

const boxen = require('boxen');

export default (note: TextNote | ListNote) => {
  if (note.type === 'text') {
    console.log(
      boxen(note.title, {
        margin: { top: 1 },
        padding: { left: 1, right: 1, bottom: 0, top: 0 },
        borderStyle: 'round',
        borderColor: 'cyan',
        dimBorder: true,
      }),
      boxen(note.body.message, {
        margin: { top: 1, bottom: 1 },
        padding: 1,
        marginTop: 0,
        borderStyle: 'double',
        borderColor: 'cyan',
      })
    );
  }
  if (note.type === 'checklist') {
    const { completed, items } = note.body;
    console.log(
      boxen(note.title, {
        margin: { top: 1 },
        padding: { left: 1, right: 1, bottom: 0, top: 0 },
        borderStyle: 'round',
        borderColor: 'cyan',
        dimBorder: true,
      }),
      boxen(
        items
          .map(item => {
            return `${completed.includes(item) ? '[X]' : '[ ]'} ${item.trim()}`;
          })
          .join('\n'),
        {
          margin: { top: 1, bottom: 1 },
          padding: 1,
          marginTop: 0,
          borderStyle: 'double',
          borderColor: 'cyan',
        }
      )
    );
  }
};
