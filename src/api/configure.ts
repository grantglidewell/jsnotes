import { Config } from '../interfaces';

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
  // use the token to create a JsNotes project

  // store the token and project id in the config
};
