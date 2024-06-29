import { connection } from './connection.js';
import { generateId } from '../ids.js';

const getCustomerTable = () => connection.table('customer');

export async function getCustomer(id) {
  return await getCustomerTable().first().where({ id });
}

export async function getCustomerByEmail(email) {
  return await getCustomerTable().first().where({ email });
}

export async function createCustomer({ name, email, phone }) {
  const id = generateId();
  const newCustomer = { id, name, email, phone };
  await getCustomerTable().insert(newCustomer);
  return newCustomer;
}

export async function getCustomers() {
  try {
    return await getCustomerTable().select();
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
}

export async function updateCustomer(id, updates) {
  const customer = await getCustomer(id);
  if (!customer) {
    throw new Error(`Customer with ID ${id} not found`);
  }
  await getCustomerTable().where({ id }).update(updates);
  return await getCustomer(id);
}

export async function deleteCustomer(id) {
  const customer = await getCustomer(id);
  if (!customer) {
    throw new Error(`Customer with ID ${id} not found`);
  }
  await getCustomerTable().where({ id }).del();
  return customer;
}
