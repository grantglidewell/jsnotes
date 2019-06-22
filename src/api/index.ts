import { TextNote } from '../interfaces';

import { api } from './api';
import { config } from './configure';

const { token, projectId } = config();

export const fetchItems = () => {
  api({ url: ``, token });
};

export const createItem = (note: TextNote) => {
  api({ url: ``, token, projectId, note });
};

export const updateItem = (note: TextNote) => {
  api({ url: ``, token, projectId, note });
};

export const deleteItem = (note: TextNote) => {
  api({ url: ``, token, projectId, note });
};
