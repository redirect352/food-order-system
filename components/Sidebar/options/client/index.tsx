import { IconBasket, IconHistory, IconNotes, IconTruckDelivery, IconUserCircle } from "@tabler/icons-react";
import { SidebarOptionDefinition } from "../../options";
import CartIndicator from "../../CartIndicator";

const  clientOptions: SidebarOptionDefinition[] = [
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
];
export default clientOptions;