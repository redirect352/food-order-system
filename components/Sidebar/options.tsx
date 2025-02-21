import { IconBasket, IconHistory, IconImageInPicture, IconNotes, IconPhotoPlus, IconTable, IconTablePlus, IconTransferIn, IconTruckDelivery, IconUserCircle } from '@tabler/icons-react';
import { ReactNode } from 'react';
import CartIndicator from './CartIndicator';

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
  // {
  //   href: '/client/prepack-menu',
  //   label: ' Заказ полуфабрикатов',
  //   leftSection: (<IconFridge size={20} />),
  // },
  {
    href: '/client/cart',
    label: (<CartIndicator>Корзина</CartIndicator>),
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
  {
    href: '/menu-moderator/upload-menu',
    label: 'Добавить меню',
    leftSection: (<IconTablePlus size={20} />),
  },
  {
    href: '/menu-moderator/upload-image',
    label: 'Добавить картинку блюда',
    leftSection: (<IconPhotoPlus size={20} />),
  },
  {
    href: '/menu-moderator/get-orders',
    label: 'Заказы пользователей',
    leftSection: (<IconTransferIn size={20} />),
  },
  {
    href: '/menu-moderator/menu-list',
    label: 'Загруженные меню',
    leftSection: (<IconTable size={20} />),
  },
];
