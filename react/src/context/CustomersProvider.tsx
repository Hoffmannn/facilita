import { ReactNode, useState } from "react";
import CustomersContext from "./CustomersContext";
import { Customer } from "../types/Customer";

const CustomersProvider = ({ children }: { children: ReactNode }) => {
  const [customers, setCustomers] = useState<Customer[] | null>(null);
  const [loading, setLoading] = useState(false);
  return (
    <CustomersContext.Provider
      value={{ customers, loading, setCustomers, setLoading }}
    >
      {children}
    </CustomersContext.Provider>
  );
};

export default CustomersProvider;
