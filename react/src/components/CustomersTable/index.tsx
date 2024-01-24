import { Table } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { getAllCustomers } from "../../api/customers";
import CustomersContext from "../../context/CustomersContext";

const CustomersTable: React.FC = () => {
  const { customers, setCustomers } = useContext(CustomersContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (customers === null && !isLoading) {
      setIsLoading(true);
      getAllCustomers().then((response) => {
        setCustomers(response);
        setIsLoading(false);
      });
    }
  }, [customers, isLoading, setCustomers]);

  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Nome</Table.Th>
          <Table.Th>Telefone</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Ações</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {customers?.map((customer) => (
          <Table.Tr key={customer.id}>
            <Table.Td>{customer.name}</Table.Td>
            <Table.Td>{customer.phone}</Table.Td>
            <Table.Td>{customer.email}</Table.Td>
            <Table.Td>Editar / Deletar</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default CustomersTable;
