import { Button, Flex, Title } from "@mantine/core";
import { useContext, useState } from "react";
import CustomerRouteModal from "../CustomerRouteModal";
import CustomersContext from "../../context/CustomersContext";

function CustomersTableHeader({ openDrawer }: { openDrawer: () => void }) {
  const [routeModalOpen, setRouteModalOpen] = useState(false);
  const { customers } = useContext(CustomersContext);
  const handleOpenModal = () => {
    setRouteModalOpen(true);
  };
  const handleCloseModal = () => {
    setRouteModalOpen(false);
  };
  return (
    <>
      <Flex dir="row" align="center" justify="space-between">
        <Title py="lg">Clientes</Title>
        <Flex dir="row" gap={20}>
          <Button onClick={handleOpenModal} disabled={customers?.length === 0}>
            Rota
          </Button>
          <Button onClick={openDrawer}>Adicionar cliente</Button>
        </Flex>
      </Flex>

      <CustomerRouteModal
        routeModalOpen={routeModalOpen}
        handleCloseModal={handleCloseModal}
      ></CustomerRouteModal>
    </>
  );
}

export default CustomersTableHeader;
