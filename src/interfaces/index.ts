export interface TextNote {
  title: string;
  body: { message: string };
  type: 'text';
  id?: string;
}

export interface ListNote {
  title: string;
  body: { items: Array<string>; completed: Array<string> };
  type: 'checklist';
}

export interface Notes {
  [key: string]: ListNote | TextNote;
}

export interface AppFlags {
  q: boolean;
  n: boolean;
  l: boolean;
  d: boolean;
  h: boolean;
  e: boolean;
  clear: boolean;
  config: boolean;
  _: Array<string>;
  hasAPIToken: Boolean;
}

export interface Config {
  token: string;
  projectId: string;
}

export interface ApiInterface {
  url: string;
  token: string;
  method: 'GET' | 'POST' | 'DELETE';
  payload?: { project_id?: string; content?: string; name?: string };
}
