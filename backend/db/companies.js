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
