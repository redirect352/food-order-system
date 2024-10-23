import { IconBasket, IconFridge, IconHistory, IconNotes, IconTruckDelivery, IconUserCircle } from '@tabler/icons-react';
import { ReactNode } from 'react';

export type SidebarOptionDefinition = {
  label: ReactNode,
  href: string,
  leftSection?: ReactNode,
};
export const options: SidebarOptionDefinition[] = [
  {
    href: '/client/menu',
    label: 'Меню',
    leftSection: (<IconNotes size={20} />),
  },
  {
    href: '/client/prepack-menu',
    label: ' Заказ полуфабрикатов',
    leftSection: (<IconFridge size={20} />),
  },
  {
    href: '/client/cart',
    label: 'Корзина',
    leftSection: (<IconBasket size={20} />),
  },
  {
    href: '/client/active-orders',
    label: 'Активные заказы',
    leftSection: (<IconTruckDelivery size={20} />),
  },
  {
    href: '/client/orders-history',
    label: 'История заказов',
    leftSection: (<IconHistory size={20} />),
  },
  {
    href: '/client/profile',
    label: 'Мой профиль',
    leftSection: (<IconUserCircle size={20} />),
  },
];
