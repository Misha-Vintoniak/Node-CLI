fs = require('fs').promises;
const shortId = require('shortid');

const contactsPath = require('./contactsPath');
const update = require('./update');

const { errorMonitor } = require('events');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  const newContact = { name, email, phone, id: shortId.generate(3) };
  try {
    const contacts = await listContacts();
    const newContacts = [...contacts, newContact];

    return await update(newContacts);
  } catch (error) {
    error.message = 'Something went wrong, please try again ...';
  }
}

async function getContactById(id) {
  try {
    const contacts = await listContacts();
    const findContact = contacts.find(item => item.id === +id);
    if (!findContact) {
      throw new Error('Id incorrect');
    }
    console.table(findContact);
    // return findContact(id);
  } catch (error) {
    throw error;
  }
}

async function removeContact(id) {
  try {
    const contacts = await listContacts();
    const filterContact = contacts.filter(item => item.id !== +id);
    return await update(filterContact);
  } catch (error) {
    error.message = 'Something went wrong, please try again ...';
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
