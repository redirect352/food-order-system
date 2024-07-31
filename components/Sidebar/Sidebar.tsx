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
    <SidebarOption href="/active-orders" leftSection={<IconTruckDelivery size={20} />}>
      Активные заказы
    </SidebarOption>
    <SidebarOption href="/ordersHistory" leftSection={<IconHistory size={20} />}>
      История заказов
    </SidebarOption>
    <SidebarOption
      href="/profile"
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
