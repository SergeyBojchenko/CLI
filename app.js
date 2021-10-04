const fs = require('fs/promises');
const contactsOperation = require('./contacts');


const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
          const contacts = await contactsOperation.listContacts();
          console.table(contacts);
      break;

    case 'get':
          try {
              const contactId = await contactsOperation.getContactById(id);
              if (!contactId) {
                  throw new Error(`Контакт с id=${id} не найден`);
              }
              console.log(contactId);
          }
          catch (error) {
              console.log(error.message);
          };
      break;

    case 'add':
          try {
              const add = await contactsOperation.addContact({
                  name,
                  email,
                  phone
              });
              console.log(add);
          }
          catch (error) {
              console.log(error.message);
          }
      break;
    
    case 'update':
          updateById = await contactsOperation.updateContact(id, { ...oneContact, data });
          if (!updateById) {
              throw new Error(`Контакт с id=${id} не найден`);
              }
          console.log(updateById);
      break;
      
    case 'remove':
          const remove = await contactsOperation.removeContact(id);
          if (!remove) {
              throw new Error(`Контакт с id=${id} не найден`);
              }
          console.log("Удаление прошло успешно");
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);