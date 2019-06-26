import { Config } from '../interfaces';

import { api } from './api';
import { createItem } from './index';
import { readNotes } from '../handleJson';

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import * as inquirer from 'inquirer';

const { createPromptModule } = inquirer;
const prompt = createPromptModule();

import * as os from 'os';

export const config = (): Config => {
  const config = `${os.homedir()}/jsnotes/config.json`;
  if (!existsSync(config)) {
    if (!existsSync(`${os.homedir()}/jsnotes`)) {
      mkdirSync(`${os.homedir()}/jsnotes`);
    }
    writeFileSync(config, JSON.stringify({ token: '', projectId: '' }));
  }
  const resolvedConfig = JSON.parse(readFileSync(config).toString());
  if (!resolvedConfig.token || !resolvedConfig.projectId) {
    console.log(
      `You have not completed the configuration for Todoist API connection`
    );
  }
  return resolvedConfig;
};

export default async () => {
  const { projectId, token } = config();
  if (projectId && token) {
    console.log('you currently have a configuration');
    console.log('running this again will overwrite this configuration');
    const { confirm } = await prompt([
      {
        type: 'confirm',
        name: 'confirm',
        default: false,
        message: 'continue and overwrite config?',
      },
    ]);
    if (!confirm) {
      return null;
    }
  }
  const { userToken } = await prompt([
    {
      type: 'input',
      name: 'userToken',
      message:
        'Add your Token from Todoist \n you can create one in your Todoist account under Settings > Integrations \n API Token:',
    },
  ]);
  // use the token to create a JSNotes project
  const { id } = await api({
    token: token || userToken,
    url: `https://beta.todoist.com/API/v8/projects`,
    method: 'POST',
    payload: { name: 'JSNotes' },
  });
  // store the token and project id in the config
  writeFileSync(
    `${os.homedir()}/jsnotes/config.json`,
    JSON.stringify({ token: token || userToken, projectId: id })
  );
  console.log('Configuration complete.');
  const { confirm } = await prompt([
    {
      type: 'confirm',
      name: 'confirm',
      default: false,
      message: 'Would you like to send your existing notes to Todoist?',
    },
  ]);
  if (!confirm) {
    return null;
  }
  // add existing TEXT notes to that project
  const notes = readNotes();
  if (Object.keys(notes).find(note => notes[note].type === 'text')) {
    Object.entries(notes).map(async ([_key, note]) => {
      if (note.type === 'text') {
        await createItem(note)
          .then(res => {
            //update note with the appropriate id
          })
          .catch(er => er);
      }
    });
  }
};
