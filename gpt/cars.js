import { connection } from "./connection.js";
import { generateId } from "../ids.js";

export async function createCar({
  model,
  year,
  price,
  description,
  companyId,
  createdAt,
}) {
  const id = generateId();
  const newCar = { id, model, year, price, description, companyId, createdAt };
  await connection.table("car").insert(newCar);
  return newCar;
}

export async function updateCar(id, updates) {
  const { companyId, createdAt, ...restUpdates } = updates;

  if (companyId) {
    restUpdates.companyId = companyId;
  }
  if (createdAt) {
    restUpdates.createdAt = createdAt;
  }

  await connection.table("car").where({ id }).update(restUpdates);
  return await getCar(id);
}

export async function deleteCar(id) {
  const carToDelete = await getCar(id);
  if (!carToDelete) {
    throw new Error(`Car with ID ${id} not found`);
  }
  await connection.table("car").where({ id }).del();
  return carToDelete;
}

const getCarTable = () => connection.table("car");

export async function getCars() {
  return await connection.table("car").select();
}

export async function getCar(id) {
  const car = await getCarTable().where({ id }).first();
  return car;
}
