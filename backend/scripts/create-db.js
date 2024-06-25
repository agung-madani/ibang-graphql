import { connection } from "../db/connection.js";

const { schema } = connection;

await schema.dropTableIfExists("car");
await schema.dropTableIfExists("company");
await schema.dropTableIfExists("customer");

await schema.createTable("company", (table) => {
  table.text("id").notNullable().primary();
  table.text("name").notNullable();
  table.text("description");
});

await schema.createTable("car", (table) => {
  table.text("id").notNullable().primary();
  table.text("companyId").notNullable().references("id").inTable("company");
  table.text("model").notNullable();
  table.integer("year").notNullable();
  table.float("price").notNullable();
  table.text("description");
  table.text("createdAt").notNullable();
});

await schema.createTable("customer", (table) => {
  table.text("id").notNullable().primary();
  table.text("name").notNullable();
  table.text("email").notNullable().unique();
  table.text("phone");
});

await connection.table("company").insert([
  {
    id: "1",
    name: "Toyota",
    description: "Japanese multinational automotive manufacturer.",
  },
  {
    id: "2",
    name: "Tesla",
    description: "American electric vehicle and clean energy company.",
  },
  {
    id: "3",
    name: "BMW",
    description: "German multinational company which produces luxury vehicles.",
  },
  {
    id: "4",
    name: "Honda",
    description:
      "Japanese public multinational conglomerate manufacturer of automobiles.",
  },
  {
    id: "5",
    name: "Ford",
    description: "American multinational automaker.",
  },
]);

await connection.table("car").insert([
  {
    id: "1",
    companyId: "1",
    model: "Camry",
    year: 2022,
    price: 25000,
    description: "A reliable and efficient sedan.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    companyId: "2",
    model: "Model S",
    year: 2023,
    price: 79999,
    description: "A high-performance electric sedan.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    companyId: "3",
    model: "X5",
    year: 2021,
    price: 60000,
    description: "A luxury mid-size SUV.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    companyId: "4",
    model: "Civic",
    year: 2020,
    price: 20000,
    description: "A compact car known for its fuel efficiency.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    companyId: "5",
    model: "Mustang",
    year: 2022,
    price: 55000,
    description: "An iconic American muscle car.",
    createdAt: new Date().toISOString(),
  },
]);

await connection.table("customer").insert([
  {
    id: "1",
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "janesmith@example.com",
    phone: "234-567-8901",
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alicejohnson@example.com",
    phone: "345-678-9012",
  },
  {
    id: "4",
    name: "Bob Brown",
    email: "bobbrown@example.com",
    phone: "456-789-0123",
  },
  {
    id: "5",
    name: "Charlie Darwin",
    email: "charliedawin@example.com",
    phone: "567-890-1234",
  },
]);

process.exit();
