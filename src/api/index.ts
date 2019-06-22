import { Config } from '../interfaces';

import { api } from './api';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

import * as os from 'os';

const config = (): Config => {
  const home = `${os.homedir()}/jsnotes/config.json`;
  if (!existsSync(home)) {
    if (!existsSync(`${os.homedir()}/jsnotes`)) {
      mkdirSync(`${os.homedir()}/jsnotes`);
    }
    writeFileSync(home, JSON.stringify({ token, projectId }));
  }
  return JSON.parse(readFileSync(home).toString());
};

const { token, projectId } = config();

export const fetchItems = () => {
  api(``, token);
};

export const createItem = () => {
  api(``, token, projectId);
};

export const updateItem = () => {
  api(``, token, projectId);
};

export const deleteItem = () => {
  api(``, token, projectId);
};
