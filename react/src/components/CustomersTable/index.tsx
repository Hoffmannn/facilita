import { Table, TextInput } from "@mantine/core";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { getAllCustomers, removeCustomer } from "../../api/customers";
import CustomersContext from "../../context/CustomersContext";
import { IconSearch, IconTrash } from "@tabler/icons-react";
import { Customer } from "../../types/Customer";

const RowItem = ({ customer }: { customer: Customer }) => {
  const { customers, setCustomers } = useContext(CustomersContext);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    if (!isDeleting) {
      setIsDeleting(true);
    } else {
      if (!customers) return;
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
  const [hasLoaded, setHasLoaded] = useState(false);

  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return search === ""
      ? customers
      : customers?.filter((customer) => {
          return (
            customer.name.toLowerCase().includes(search.toLowerCase()) ||
            customer.phone.toLowerCase().includes(search.toLowerCase()) ||
            customer.email.toLowerCase().includes(search.toLowerCase())
          );
        });
  }, [customers, search]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (!hasLoaded) {
      setHasLoaded(true);
      getAllCustomers().then((response) => {
        setCustomers(response);
      });
    }
  }, [customers, hasLoaded, setCustomers]);

  return (
    <>
      <TextInput
        placeholder="Procure por qualquer campo"
        mb="md"
        leftSection={<IconSearch />}
        value={search}
        onChange={handleSearchChange}
      />
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
          {filteredData?.map((customer) => (
            <RowItem key={customer.id} customer={customer} />
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
};

export default CustomersTable;
