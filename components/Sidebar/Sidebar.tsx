import { Flex } from '@mantine/core';
import SidebarOption from './SidebarOption';

export default function Sidebar() {
return (
  <Flex
    direction="column"
    gap={16}
    w="100%"
    >
    <SidebarOption href="/menu">
      Меню
    </SidebarOption>
    <SidebarOption href="/prepackMenu">
      Заказ полуфабрикатов
    </SidebarOption>
    <SidebarOption href="/activeOrders">
      Активные заказы
    </SidebarOption>
    <SidebarOption href="/ordersHistory">
      История заказов
    </SidebarOption>
  </Flex>
  );
}
