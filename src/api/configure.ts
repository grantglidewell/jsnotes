import { Notes } from '../interfaces';

import { api } from './api';
import { createItem } from './index';
import { config, writeNote } from '../disk';

import { writeFileSync } from 'fs';
import * as inquirer from 'inquirer';

const { createPromptModule } = inquirer;
const prompt = createPromptModule();

import * as os from 'os';

export default async (notes: Notes) => {
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
  // find the inbox project ID
  const inboxProject = await api<[{ name: string; id: string }]>({
    token: token || userToken,
    url: `https://beta.todoist.com/API/v8/projects`,
    method: 'GET',
  }).then(projects => projects.find(project => project.name === 'Inbox'));
  // store the token and project id in the config
  if (inboxProject && inboxProject.id) {
    writeFileSync(
      `${os.homedir()}/jsnotes/config.json`,
      JSON.stringify({ token: token || userToken, projectId: inboxProject.id })
    );
  } else {
    console.error(
      'There was a problem finding the Inbox of your todoist account'
    );
    return null;
  }
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
  // add existing notes to that project
  if (Object.keys(notes).length) {
    Object.entries(notes).map(async ([_key, note]) => {
      const { id } = await createItem(note);
      writeNote({ ...note, id }, true);
    });
  }
};
