import { IconUserCircle } from "@tabler/icons-react";
import { SidebarOptionDefinition } from "../../options";

const  commonOptions: SidebarOptionDefinition[] = [
  {
    href: '/profile',
    label: 'Мой профиль',
    leftSection: (<IconUserCircle size={20} />),
  },
];
export default commonOptions;