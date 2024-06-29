mutation {
  createCar(input: {
    model: "New Model",
    year: 2023,
    price: 40000,
    description: "A brand new model",
    companyId: "3",
    createdAt: "1999-06-25T10:00:00Z"
  }) {
    id
    model
    year
    price
    description
    company {
      id
      name
    }
    createdAt
  }
}



mutation {
  updateCar(id: "P2JqV7eErWQc", input: {
    model: "Updated Model",
    year: 2025,
    price: 35000,
    description: "An updated description",
    companyId: "2",
    createdAt: "2020-06-25T12:00:00Z"
  }) {
    id
    model
    year
    price
    description
    company {
      id
      name
    }
    createdAt
  }
}

#car plus supplier
query {
      cars {
        id
        model
        year
        price
        description
        createdAt
        company {
          id
          name
          description
        }
        supplier {
          availability
          quantity
        }
      }
    }

#Supplier
query {
  carSupplierCompanyInfo(car_id:5) {
    id
    car {
      id
      model
      year
      price
      description
      createdAt
      company {
        id
        name
        description
      }
    }
    availability
    quantity
  }
}

mutation {
  createSupplier(input: {
    car_id: "WaQWjzqMFVC7",
    availability: true,
    quantity: 3
  }) {
    id
    car_id
    availability
    quantity
  }
}

-----
#Company
mutation {
  createCompany (input: {
    name: "Peugeot",
    description: "Fancy French Cars!",
  }) {
    id
    name
    description
  }
}

mutation {
  updateCompany(id: "lcc08ZlBfHle", input: {
    name: "Updated Yamaha",
    description: "Updated Semakin di depan!"
  }) {
    id
    name
    description
  }
}

mutation {
  deleteCompany(id: "Gh0UZWreQkKy") {
    id
    name
    description
  }
}


#customer
mutation {
  createCustomer(input: {
    name: "John Wibisono",
    email: "john.ws@hstrier.com",
    phone: 123123
  }) {
    id
    name
    email
    phone
  }
}

mutation {
  updateCustomer(id: "8AL0WgkGxwm3", input: {
    name: "Jane Wibisono",
    email: "jane.ws@hstrier.com",
    phone: "qwerty"
  }) {
    id
    name
    email
  }
}

mutation {
  deleteCustomer(id: "8AL0WgkGxwm3") {
    id
    name
    email
  }
}




