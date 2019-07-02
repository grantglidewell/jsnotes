export interface TextNote {
  title: string;
  body: { message: string };
  id?: string | number;
}

export interface Notes {
  [key: string]: TextNote;
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
