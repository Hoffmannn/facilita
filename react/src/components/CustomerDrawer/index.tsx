/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Drawer,
  Group,
  Input,
  InputWrapper,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IMaskInput } from "react-imask";
import { addCustomer } from "../../api/customers";
import { CustomerToAdd } from "../../types/Customer";
import { useContext } from "react";
import CustomersContext from "../../context/CustomersContext";

const CustomerDrawer = ({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) => {
  const { customers, setCustomers } = useContext(CustomersContext);
  const form = useForm({
    initialValues: {
      name: "",
      phone: "",
      email: "",
    },

    validate: {
      name: (value) => (value.trim().length > 0 ? null : "Nome é obrigatório"),
      phone: (value) => (value.length >= 11 ? null : "Telefone inválido"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
    },
  });

  const handleRegisterCustomer = (customer: CustomerToAdd) => {
    addCustomer(customer).then((res) => {
      setCustomers([...(customers || []), res]);
      close();
    });
  };

  const titleComponent = <Title order={2}>Adicionar Cliente</Title>;

  return (
    <Drawer
      position="right"
      opened={opened}
      onClose={close}
      title={titleComponent}
    >
      <form
        onSubmit={form.onSubmit((values) => handleRegisterCustomer(values))}
      >
        <TextInput
          withAsterisk
          label="Nome"
          placeholder="Nome do cliente"
          {...form.getInputProps("name")}
        />

        <InputWrapper label="Telefone" required>
          <Input
            component={IMaskInput}
            mask="(00) 00000-0000"
            placeholder="Telefone do cliente"
            {...form.getInputProps("phone")}
          />
        </InputWrapper>

        <TextInput
          withAsterisk
          label="Email"
          placeholder="cliente@email.com"
          {...form.getInputProps("email")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Adicionar</Button>
        </Group>
      </form>
    </Drawer>
  );
};

export default CustomerDrawer;
