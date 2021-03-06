const fs = require("fs/promises");
const { v4 } = require("uuid");
const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");


const addContact = async (data) => {
    const newContact = { ...data, id: v4() };
    const contacts = await listContacts();
    contacts.push(newContact);
    await updateContacts(contacts);
    return contacts;
};

module.exports = addContact;