import axios from "axios";
import { Customer, CustomerToAdd } from "../types/Customer";

export const getAllCustomers = async () => {
  const response = await axios.get("http://localhost:3000/customers");
  return response.data;
};

export const addCustomer = async (customer: CustomerToAdd) => {
  const response = await axios.post(
    "http://localhost:3000/customers",
    customer
  );
  return response.data as Customer;
};

export const removeCustomer = async (id: number) => {
  const response = await axios.delete(`http://localhost:3000/customers/${id}`);
  return response.data;
};

export const calculateRoute = async () => {
  const response = await axios.get("http://localhost:3000/calculateRoute");
  return response.data;
};
