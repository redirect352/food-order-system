'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { NavLink } from '@mantine/core';
import Link from 'next/link';
import classes from './Sidebar.module.scss';

export default function SidebarOption({ children, href, leftSection, onClick } :
  React.PropsWithChildren<{
    href: string,
    leftSection?: React.ReactNode,
    onClick?: () => void
  }>) {
const path = usePathname();
const isChoosen = path === href;
return (
  <NavLink
    onClick={onClick}
    href={href}
    component={Link}
    className={isChoosen ? [classes.option, classes.optionActive].join(' ') : classes.option}
    label={children}
    fz="h2"
    styles={{ label: { fontSize: 'var(--mantine-font-size-md)' } }}
    leftSection={leftSection}
  />
);
}
