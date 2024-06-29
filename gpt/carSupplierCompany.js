import { generateId } from "../ids.js";
import { carSupplierCompanyConnection as connection } from "./connection.js";

export async function getCarSupplierCompanyInfo(car_id) {
  console.log("car_id:  ", car_id);
  return await connection
    .table("car_supplier_company")
    .where({ car_id })
    .first();
}

export async function createSupplier({
  car_id,
  availability,
  quantity,
}) {
  const id = generateId();
  const newSupplier = { id, car_id, availability, quantity };
  await connection.table("car_supplier_company").insert(newSupplier);
  return newSupplier;
}

export async function updateSupplier(id, updates) {
  try {
    const existingSupplier = await connection.table("car_supplier_company").where({ id }).first();
    if (!existingSupplier) {
      throw new Error(`Supplier with ID ${id} not found`);
    }

    await connection.table("car_supplier_company").where({ id }).update(updates);
    return await connection.table("car_supplier_company").where({ id }).first();
  } catch (error) {
    console.error("Error updating supplier:", error);
    throw error;
  }
}