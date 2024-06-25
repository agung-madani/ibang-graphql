import { connection } from './connection.js';

const getCustomerTable = () => connection.table('customers');

export async function getCustomer(id) {
  return await getCustomerTable().first().where({ id });
}

export async function getCustomerByEmail(email) {
  return await getCustomerTable().first().where({ email });
}