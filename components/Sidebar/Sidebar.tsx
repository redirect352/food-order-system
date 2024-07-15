import { Flex } from '@mantine/core';
import { IconBasket, IconFridge, IconHistory, IconNotes, IconTruckDelivery } from '@tabler/icons-react';
import SidebarOption from './SidebarOption';
import CartIndicator from './CartIndicator';

export default function Sidebar() {
return (
  <Flex
    direction="column"
    gap={8}
    w="100%"
    >
    <SidebarOption href="/menu" leftSection={<IconNotes size={20} />}>
      Меню
    </SidebarOption>
    <SidebarOption href="/prepackMenu" leftSection={<IconFridge size={20} />}>
      Заказ полуфабрикатов
    </SidebarOption>
    <SidebarOption href="/cart" leftSection={<IconBasket size={20} />}>
      <CartIndicator>
        Корзина
      </CartIndicator>
    </SidebarOption>
    <SidebarOption href="/activeOrders" leftSection={<IconTruckDelivery size={20} />}>
      Активные заказы
    </SidebarOption>
    <SidebarOption href="/ordersHistory" leftSection={<IconHistory size={20} />}>
      История заказов
    </SidebarOption>
  </Flex>
  );
}
