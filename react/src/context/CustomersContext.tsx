import { createContext } from "react";
import { Customer } from "../types/Customer";

type CustomersContextProps = {
  customers?: Customer[];
  setCustomers: (customers: Customer[]) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const CustomersContext = createContext<CustomersContextProps>({
  setCustomers: () => {},
  loading: false,
  setLoading: () => {},
});

export default CustomersContext;
