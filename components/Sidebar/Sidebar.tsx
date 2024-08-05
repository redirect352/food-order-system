'use client';

import { Flex } from '@mantine/core';
import { IconBasket, IconFridge, IconHistory, IconLogout2, IconNotes, IconTruckDelivery, IconUserCircle } from '@tabler/icons-react';
import SidebarOption from './SidebarOption';
import CartIndicator from './CartIndicator';
import { useLogout } from '@/shared/hooks';

export default function Sidebar() {
const { logout } = useLogout();
return (
  <Flex
    direction="column"
    gap={8}
    w="100%"
    >
    <SidebarOption href="/client/menu" leftSection={<IconNotes size={20} />}>
      Меню
    </SidebarOption>
    <SidebarOption href="/client/prepack-menu" leftSection={<IconFridge size={20} />}>
      Заказ полуфабрикатов
    </SidebarOption>
    <SidebarOption href="/client/cart" leftSection={<IconBasket size={20} />}>
      <CartIndicator>
        Корзина
      </CartIndicator>
    </SidebarOption>
    <SidebarOption href="/client/active-orders" leftSection={<IconTruckDelivery size={20} />}>
      Активные заказы
    </SidebarOption>
    <SidebarOption href="/client/orders-history" leftSection={<IconHistory size={20} />}>
      История заказов
    </SidebarOption>
    <SidebarOption
      href="/client/profile"
      leftSection={<IconUserCircle size={20} />}
    >
      Мой профиль
    </SidebarOption>
    <SidebarOption
      href="/login"
      leftSection={<IconLogout2 size={20} />}
      onClick={logout}
    >
      Выйти
    </SidebarOption>
  </Flex>
  );
}
