import { IconPhotoPlus, IconTable, IconTablePlus, IconTransferIn, IconUserCircle } from "@tabler/icons-react";
import { SidebarOptionDefinition } from "../../options";

const  menuModeratorOptions: SidebarOptionDefinition[] = [
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
export default menuModeratorOptions;