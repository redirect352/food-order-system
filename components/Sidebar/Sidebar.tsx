'use client';

import { Flex } from '@mantine/core';
import { IconLogout2 } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import SidebarOption from './SidebarOption';
import { useLogout } from '@/shared/hooks';
import { options } from './options';

export default function Sidebar() {
  const { logout } = useLogout();
  const path = usePathname();
  const pathRole = path.split('/')[1];

return (
  <Flex
    direction="column"
    gap={8}
    w="100%"
    >
      {
      options.map(({ href, label, leftSection }, ind) => pathRole && href.includes(pathRole) ?
      (<SidebarOption leftSection={leftSection} href={href} key={ind}>
        {label}
       </SidebarOption>) : null)
      }
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
