import { Button, Flex, Title } from "@mantine/core";

function CustomersTableHeader({ openDrawer }: { openDrawer: () => void }) {
  return (
    <Flex dir="row" align="center" justify="space-between">
      <Title py="lg">Clientes</Title>
      <Flex dir="row" gap={20}>
        <Button onClick={openDrawer}>Adicionar cliente</Button>
      </Flex>
    </Flex>
  );
}

export default CustomersTableHeader;
