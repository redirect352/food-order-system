import { IconBuilding, IconMoodSearch, IconUserSearch } from "@tabler/icons-react";
import { SidebarOptionDefinition } from "../../options";

const  adminOptions: SidebarOptionDefinition[] = [
  {
    href: '/admin/users?order=desc&sort=id',
    label: 'Пользователи',
    leftSection: (<IconUserSearch size={20} />),
  },
  {
    href: '/admin/employees?order=desc&sort=id',
    label: 'Сотрудники',
    leftSection: (<IconMoodSearch size={20} />),
  },
  {
    href: '/admin/branches',
    label: 'Филиалы',
    leftSection: (<IconBuilding size={20} />),
  },
];
export default adminOptions;