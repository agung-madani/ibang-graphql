import { getCars, getCar, createCar, updateCar, deleteCar } from "./db/cars.js";
import { getCarSupplierCompanyInfo } from "./db/carSupplierCompany.js";
import { getCompany } from "./db/companies.js";

export const resolvers = {
  Query: {
    cars: () => getCars(),
    car: (_, { id }) => getCar(id),
    carSupplierCompanyInfo: (_, { car_id }) =>
      getCarSupplierCompanyInfo(car_id),
  },
  Mutation: {
    createCar: (_, { input }) => createCar(input),
    updateCar: (_, { id, input }) => updateCar(id, input),
    deleteCar: (_, { id }) => deleteCar(id),
  },
  Car: {
    company: (car) => getCompany(car.companyId),
    createdAt: (car) => toIsoDate(car.createdAt),
  },
  CarSupplierCompanyInfo: {
    car: (car_supplier_company) =>
      getCar(car_supplier_company.car_id.toString()),
  },
};

function toIsoDate(value) {
  return value.slice(0, "yyyy-mm-dd".length);
}
