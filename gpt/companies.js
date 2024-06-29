import { generateId } from "../ids.js";
import { connection } from "./connection.js";

export async function getCompany(id) {
  try {
    const company = await connection.table("company").where({ id }).first();
    return company;
  } catch (error) {
    console.error("Error fetching company:", error);
    throw error;
  }
}

export async function getCompanies() {
  try {
    return await connection.table("company").select();
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
}

export async function createCompany({
  name,
  description,
}) {
  const id = generateId();
  const newCompany = { id, name, description };
  await connection.table("company").insert(newCompany);
  return newCompany;
}

export async function updateCompany(id, updates) {
  try {
    const existingCompany = await getCompany(id);
    if (!existingCompany) {
      throw new Error(`Company with ID ${id} not found`);
    }
    
    await connection.table("company").where({ id }).update(updates);
    return await getCompany(id);
  } catch (error) {
    console.error("Error updating company:", error);
    throw error;
  }
}

export async function deleteCompany(id) {
  try {
    const companyToDelete = await getCompany(id);
    if (!companyToDelete) {
      throw new Error(`Company with ID ${id} not found`);
    }
    await connection.table("company").where({ id }).del();
    return companyToDelete;
  } catch (error) {
    console.error("Error deleting company:", error);
    throw error;
  }
}