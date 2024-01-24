import { Table } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { getAllCustomers, removeCustomer } from "../../api/customers";
import CustomersContext from "../../context/CustomersContext";
import { IconTrash } from "@tabler/icons-react";
import { Customer } from "../../types/Customer";

const RowItem = ({ customer }: { customer: Customer }) => {
  const { customers, setCustomers } = useContext(CustomersContext);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    if (!isDeleting) {
      setIsDeleting(true);
    } else {
      if (!customers) return; // just to avoid typescript error
      removeCustomer(customer.id).then(() => {
        setCustomers(
          customers.filter((customerItem) => customerItem.id !== customer.id)
        );
      });
    }
  };

  return (
    <Table.Tr key={customer.id}>
      <Table.Td>{customer.name}</Table.Td>
      <Table.Td>{customer.phone}</Table.Td>
      <Table.Td>{customer.email}</Table.Td>
      <Table.Td align="center">
        <IconTrash
          cursor="pointer"
          onClick={handleDelete}
          color={isDeleting ? "red" : "gray"}
        />
      </Table.Td>
    </Table.Tr>
  );
};

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
          <Table.Th style={{ textAlign: "center" }}>Ações</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {customers?.map((customer) => (
          <RowItem key={customer.id} customer={customer} />
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default CustomersTable;
