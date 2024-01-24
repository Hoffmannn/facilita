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
