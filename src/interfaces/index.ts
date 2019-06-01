export interface TextNote {
  title: string;
  body: { message: String };
  type: 'text';
}

export interface ListNote {
  title: string;
  body: { items: Array<String>; completed: Array<String> };
  type: 'checklist';
}
