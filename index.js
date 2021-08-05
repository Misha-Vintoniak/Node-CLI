const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { program } = require('commander');

const contacts = require('./db/contacts.json');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require('./contacts');

const arr = hideBin(process.argv);
const { argv } = yargs(arr);

program
  .option('-a, --action <type>', 'action type')
  .option('-i, --id <type>', 'contact id')
  .option('-n, --name <type>', 'contact name')
  .option('-e, --email <type>', 'contact email')
  .option('-p, --phone <type>', 'contact phone');
program.parse(process.argv);
const option = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      console.table(await listContacts());
      break;

    case 'get':
      const getContact = id => {
        getContactById(id);
      };
      await getContact(id);
      break;

    case 'add':
      await addContact(name, email, phone);
      console.table(await listContacts());
      break;

    case 'remove':
      await removeContact(id);
      console.table(await listContacts());
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
