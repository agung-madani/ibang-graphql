import knex from "knex";

export const connection = knex({
  client: "better-sqlite3",
  connection: {
    filename: "./data/car_dealership.sqlite3",
  },
  useNullAsDefault: true,
});

export const carSupplierCompanyConnection = knex({
  client: "better-sqlite3",
  connection: {
    filename: "./data/car_supplier_company.sqlite3",
  },
  useNullAsDefault: true,
});
