import { TextNote } from '../interfaces';

import { api } from './api';
import { config } from './configure';

const { token, projectId } = config();

export const fetchItems = () => {
  api({
    url: `https://beta.todoist.com/API/v8/projects/${projectId}`,
    method: 'GET',
    token,
  });
};

export const createItem = (note: TextNote) => {
  api({
    url: `https://beta.todoist.com/API/v8/tasks`,
    method: 'POST',
    token,
    payload: { content: note.body.message, project_id: projectId },
  });
};

export const updateItem = (note: TextNote) => {
  api({
    url: `https://beta.todoist.com/API/v8/tasks/${note.id}`,
    method: 'POST',
    token,
    payload: { content: note.body.message },
  });
};

export const deleteItem = (note: TextNote) => {
  api({
    url: `https://beta.todoist.com/API/v8/tasks/${note.id}`,
    method: 'DELETE',
    token,
  });
};
