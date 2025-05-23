'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { NavLink } from '@mantine/core';
import Link from 'next/link';
import classes from './Sidebar.module.scss';

export default function SidebarOption({ children, href, leftSection, onClick, replace } :
  React.PropsWithChildren<{
    href: string,
    leftSection?: React.ReactNode,
    onClick?: () => void,
    replace?: boolean
  }>) {
const path = usePathname();
const isChosen = path === href;
return (
  <NavLink
    onClick={onClick}
    href={href}
    component={Link}
    className={isChosen ? [classes.option, classes.optionActive].join(' ') : classes.option}
    label={children}
    fz="h2"
    styles={{ label: { fontSize: 'var(--mantine-font-size-md)' } }}
    leftSection={leftSection}
    replace={replace}
  />
);
}
