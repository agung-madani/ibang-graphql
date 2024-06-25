import axios from 'axios';

export async function fetchCars() {
  const response = await axios.get('http://localhost:9000/api/cars');
  return response.data;
}

export async function fetchCar(carId) {
  const response = await axios.get(`http://localhost:9000/api/cars/${carId}`);
  return response.data;
}

export async function createCar(car) {
  const response = await axios.post('http://localhost:9000/api/cars', car);
  return response.data;
}

export async function fetchDealer(dealerId) {
  const response = await axios.get(`http://localhost:9000/api/dealers/${dealerId}`);
  return response.data;
}
