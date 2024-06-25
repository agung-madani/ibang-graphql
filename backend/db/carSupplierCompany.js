import { carSupplierCompanyConnection as connection } from "./connection.js";

export async function getCarSupplierCompanyInfo(car_id) {
  console.log("car_id:  ", car_id);
  return await connection
    .table("car_supplier_company")
    .where({ car_id })
    .first();
}
