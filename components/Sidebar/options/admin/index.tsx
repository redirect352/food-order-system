import { IconHistory, IconUsers } from "@tabler/icons-react";
import { SidebarOptionDefinition } from "../../options";

const  adminOptions: SidebarOptionDefinition[] = [
  {
    href: '/admin/users',
    label: 'Пользователи',
    leftSection: (<IconUsers size={20} />),
  },
];
export default adminOptions;