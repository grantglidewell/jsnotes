# JS Notes

a command line note taking application

### Installation

`yarn global add jsnotes`
or
`npm i -g jsnotes`

### Use

```
jsn // menu
jsn -n // create a new note
jsn -l // list notes
jsn -h // help menu
```

### Todoist configuration

If you wish to link your notes to your Todoist account you will need to create an API key for use in the configuration process. You will need to create an application in your Todoist account's app management console.

once you have your API key you can run `jsn --config` or select 'Configure Todoist API' from the `jsn` menu.

Once configured, your key will be stored and a 'JSNotes' project will be created in Todoist for you. Your notes will use the Todoist API as it's source of truth for all future notes.
