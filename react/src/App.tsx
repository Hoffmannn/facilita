import { Container } from "@mantine/core";
import "./App.css";
import CustomersTable from "./components/CustomersTable";
import CustomersTableHeader from "./components/CustomersTableHeader";
import CustomerDrawer from "./components/CustomerDrawer";
import { useDisclosure } from "@mantine/hooks";

function App() {
  const [opened, { open, close }] = useDisclosure(false); // Drawer props
  return (
    <>
      <Container>
        <CustomersTableHeader openDrawer={open} />
        <CustomersTable />
        <CustomerDrawer opened={opened} close={close} />
      </Container>
    </>
  );
}

export default App;
