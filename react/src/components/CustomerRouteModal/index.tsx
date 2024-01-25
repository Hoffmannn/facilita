import { Box, Flex, List, Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import { calculateRoute } from "../../api/customers";
import CartesianPlane from "./CartesianPlane";

const CustomerRouteModal = ({
  routeModalOpen,
  handleCloseModal,
}: {
  routeModalOpen: boolean;
  handleCloseModal: () => void;
}) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    calculateRoute().then((res) => {
      setCustomers(res);
    });

    return () => {
      setCustomers([]);
    };
  }, [routeModalOpen]);

  return (
    <Modal
      opened={routeModalOpen}
      onClose={handleCloseModal}
      title="Rota"
      centered
      size="fit"
    >
      <Box style={{ padding: "5px" }}>
        <Flex align="center" justify="space-between" gap="xl">
          <List type="ordered">
            {customers.map((customer: { id: number; name: string }) => (
              <List.Item key={customer.id}>{customer.name}</List.Item>
            ))}
          </List>
          <Flex direction="column" justify="center" align="center">
            Mapa
            <CartesianPlane data={customers} />
          </Flex>
        </Flex>
      </Box>
    </Modal>
  );
};

export default CustomerRouteModal;
