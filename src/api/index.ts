import { TextNote, Notes } from '../interfaces';

import axios from 'axios';

import { api } from './api';
import { config, writeNote, readNotes } from '../disk';

export const fetchItems = async (notes: Notes) => {
  const { token, projectId } = config();
  const apiNotes = await api<
    [
      {
        project_id: number | string;
        id: number | string;
        content: string;
        created: string;
        completed: boolean;
      }
    ]
  >({
    url: `https://beta.todoist.com/API/v8/tasks`,
    method: 'GET',
    token,
  });

  // only return notes that are active with the current project id
  const remoteNotes = apiNotes.filter(
    note => note.project_id === projectId && !note.completed
  );

  // remote is the source of truth and overrides changes
  remoteNotes.map(note => {
    const title =
      (Object.values(notes).find(local => local.id === note.id) &&
        Object.values(notes).find(local => local.id === note.id)!.title) ||
      `Todoist > ${new Date(note.created).toLocaleString()}`;

    if (notes[title]) {
      // remote and local note exist
      if (notes[title].body.message === note.content) {
        // content has not changed
        return null;
      }
    }
    writeNote(
      {
        id: note.id,
        body: { message: note.content },
        title,
      },
      true
    );
  });
  return readNotes();
};

export const createItem = async (note: TextNote) => {
  const { token, projectId } = config();
  const createdNote = await api<{ id: string }>({
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
    payload: { content: note.body.message },
  });
};

export const deleteItem = (note: TextNote) => {
  const { token } = config();
  return axios.delete(`https://beta.todoist.com/API/v8/tasks/${note.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
