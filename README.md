# JS Notes

[![Maintainability](https://api.codeclimate.com/v1/badges/78bbc89f4c9258f7ac12/maintainability)](https://codeclimate.com/github/grantglidewell/jsnotes/maintainability)
![NPM](https://img.shields.io/npm/l/jsnotes.svg)

a command line note taking application

![Demo](https://github.com/grantglidewell/jsnotes/blob/master/render1562255165813.gif?raw=true)

## Installation

`yarn global add jsnotes`

or

`npm i -g jsnotes`

## Use


```
jsn // menu

|  list   │          'jsn -l or l to list out notes'          │
│  edit   │      'jsn -e or e to list out notes to edit'      │
│   new   │ 'jsn -n or n to create a new note (with prompts)' │
│  quick  │    'jsn -q or q used create a quick text note'    │
│ delete  │        'jsn -d to select a note to delete'        │
│  clear  │           '--clear to delete all notes'           │
│ config  │       '--config to set up the Todoist API'        │
│ version │          '--version to get the version'           |
```

### Todoist configuration

If you wish to link your notes to your Todoist account you will need to create an API key for use in the configuration process. You will need to create an application in your Todoist account's app management console.

once you have your API key you can run `jsn --config` or select 'Configure Todoist API' from the `jsn` menu.

Once configured, your key will be stored and a 'JSNotes' project will be created in Todoist for you. Your notes will use the Todoist API as it's source of truth for all future notes.
