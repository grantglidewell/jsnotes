import { TextNote } from '../interfaces';

import { api } from './api';
import { config } from '../disk';

export const fetchItems = () => {
  const { token, projectId } = config();
  const apiNotes = api({
    url: `https://beta.todoist.com/API/v8/projects/${projectId}`,
    method: 'GET',
    token,
  });
  // update local notes with apiNotes
};

export const createItem = async (note: TextNote) => {
  const { token, projectId } = config();
  const createdNote = await api({
    url: `https://beta.todoist.com/API/v8/tasks`,
    method: 'POST',
    token,
    payload: { content: `${note.body.message}`, project_id: projectId },
  });
  return { id: createdNote.id };
};

export const updateItem = (note: TextNote) => {
  const { token } = config();
  return api({
    url: `https://beta.todoist.com/API/v8/tasks/${note.id}`,
    method: 'POST',
    token,
    payload: { content: `${note.body.message}` },
  });
};

export const deleteItem = (note: TextNote) => {
  const { token } = config();
  return api({
    url: `https://beta.todoist.com/API/v8/tasks/${note.id}`,
    method: 'DELETE',
    token,
  });
};
