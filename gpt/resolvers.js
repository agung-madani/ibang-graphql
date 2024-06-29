import {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar
} from "./db/cars.js";
import {
  getCarSupplierCompanyInfo,
  createSupplier,
  updateSupplier
} from "./db/carSupplierCompany.js";
import {
  getCompany,
  getCompanies, 
  createCompany,
  updateCompany,
  deleteCompany
} from "./db/companies.js";
import {
  getCustomer,
  getCustomers, 
  createCustomer,
  updateCustomer,
  deleteCustomer
} from "./db/customers.js";

export const resolvers = {
  Query: {
    cars: () => getCars(),
    car: (_, { id }) => getCar(id),
    carSupplierCompanyInfo: (_, { car_id }) => getCarSupplierCompanyInfo(car_id),
    companies: () => getCompanies(), 
    company: (_, { id }) => getCompany(id), 
    customers: () => getCustomers(), 
    customer: (_, { id }) => getCustomer(id), 
  },
  Mutation: {
    createCar: (_, { input }) => createCar(input),
    updateCar: (_, { id, input }) => updateCar(id, input),
    deleteCar: (_, { id }) => deleteCar(id),
    createSupplier: (_, { input }) => createSupplier(input),
    updateSupplier: (_, { id, input }) => updateSupplier(id, input),
    createCompany: (_, { input }) => createCompany(input),
    updateCompany: (_, { id, input }) => updateCompany(id, input),
    deleteCompany: (_, { id }) => deleteCompany(id),
    createCustomer: (_, { input }) => createCustomer(input),
    updateCustomer: async (_, { id, input }) => {
      const updatedCustomer = await updateCustomer(id, input);
      if (!updatedCustomer) {
        throw new Error(`Failed to update customer with ID ${id}`);
      }
      return updatedCustomer;
    },
    deleteCustomer: async (_, { id }) => {
      const deletedCustomer = await deleteCustomer(id);
      if (!deletedCustomer) {
        throw new Error(`Failed to delete customer with ID ${id}`);
      }
      return deletedCustomer;
    },
  },
  Car: {
    company: (car) => getCompany(car.companyId),
    createdAt: (car) => toIsoDate(car.createdAt),
    supplier: (car) => getCarSupplierCompanyInfo(car.id),
    customer: (car) => getCustomer(car.customerId),
  },
  CarSupplierCompanyInfo: {
    car: (car_supplier_company) => getCar(car_supplier_company.car_id.toString()),
  },
};

function toIsoDate(value) {
  return value.slice(0, "yyyy-mm-dd".length);
}
