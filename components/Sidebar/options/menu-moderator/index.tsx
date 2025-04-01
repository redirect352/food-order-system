import { IconPaperBag, IconPhotoPlus, IconTable, IconTablePlus, IconTransferIn, IconUserCircle } from "@tabler/icons-react";
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
    label: 'Выгрузка заказов',
    leftSection: (<IconTransferIn size={20} />),
  },
  {
    href: '/menu-moderator/orders?order=desc&sort=id',
    label: 'Список заказов',
    leftSection: (<IconPaperBag size={20} />),
  },
  {
    href: '/menu-moderator/menu-list',
    label: 'Загруженные меню',
    leftSection: (<IconTable size={20} />),
  },
];
export default menuModeratorOptions;