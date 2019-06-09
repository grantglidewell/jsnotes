export interface TextNote {
  title: string;
  body: { message: string };
  type: 'text';
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
  _: Array<string>;
}
