'use client';

import { Flex } from '@mantine/core';
import { IconLogout2 } from '@tabler/icons-react';
import SidebarOption from './SidebarOption';
import { useAppSelector, useLogout } from '@/shared/hooks';
import { roleOptions, commonOptions } from './options';
import { selectUserInterface } from '../../lib/features/user/userSlice';

export default function Sidebar() {
  const { logout } = useLogout();
  const userInterface = useAppSelector(selectUserInterface);
  return (
    <Flex
      direction="column"
      gap={8}
      w="100%"
      >
        {
        roleOptions.map(({ href, label, leftSection }, ind) => userInterface && href.includes(userInterface) ?
        (<SidebarOption leftSection={leftSection} href={href} key={ind}>
          {label}
        </SidebarOption>) : null)
        }
        {
          commonOptions.map(
            ({ href, label, leftSection }) => 
            (
              <SidebarOption leftSection={leftSection} href={href} key={href}>
                {label}
              </SidebarOption>
            ) 
          )
        }
      <SidebarOption
        href="/"
        leftSection={<IconLogout2 size={20} />}
        onClick={logout}
        replace
      >
        Выйти
      </SidebarOption>
    </Flex>
  );
}
