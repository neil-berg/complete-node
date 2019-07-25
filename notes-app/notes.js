const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
  } else {
    console.log('Note title taken!');
  }
};

const removeNote = title => {
  const notes = loadNotes();
  const notesToSave = notes.filter(note => note.title !== title);
  notes.length !== notesToSave.length
    ? console.log(chalk.green.inverse('Note removed'))
    : console.log(chalk.red.inverse('No note found!'));
  saveNotes(notesToSave);
};

const saveNotes = notes => {
  const data = JSON.stringify(notes);
  fs.writeFileSync('notes.json', data);
};

const loadNotes = () => {
  try {
    const buffer = fs.readFileSync('notes.json');
    const str = buffer.toString();
    return JSON.parse(str);
  } catch (e) {
    return [];
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.cyan('Your notes'));
  notes.forEach(note =>
    console.log(`Title: ${note.title} \n Body:${note.body}`)
  );
};

const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);
  if (!note) {
    console.error(chalk.red('No note found'));
  } else {
    console.log(`${chalk.cyan(note.title)} \n ${chalk.yellow(note.body)}`);
  }
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote
};
