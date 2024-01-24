import { createContext } from "react";
import { Customer } from "../types/Customer";

type CustomersContextProps = {
  customers?: Customer[] | null;
  setCustomers: (customers: Customer[] | null) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const CustomersContext = createContext<CustomersContextProps>({
  customers: null,
  setCustomers: () => {},
  loading: false,
  setLoading: () => {},
});

export default CustomersContext;
