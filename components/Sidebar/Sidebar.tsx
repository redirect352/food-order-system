'use client';

import { Flex } from '@mantine/core';
import { IconLogout2 } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import SidebarOption from './SidebarOption';
import { useLogout } from '@/shared/hooks';
import { options } from './options';
import { getRole } from '../../shared/actions/cookie-actions';

export default function Sidebar() {
const { logout } = useLogout();
const [role, setRole] = useState<string | null>(null);
useEffect(() => {
  const changeRole = async () => {
    setRole((await getRole()).role);
  };
  changeRole();
}, []);
return (
  <Flex
    direction="column"
    gap={8}
    w="100%"
    >
      {
      options.map(({ href, label, leftSection }, ind) => role && href.includes(role) ?
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
