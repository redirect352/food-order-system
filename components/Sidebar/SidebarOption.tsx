'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import classes from './Sidebar.module.scss';

export default function SidebarOption({ children, href } :
  React.PropsWithChildren<{ href: string }>) {
const path = usePathname();
const isChoosen = path.includes(href);
return (
      <Link
        href={href}
        className={isChoosen ? [classes.option, classes.optionActive].join(' ') : classes.option}
        >
        {children}
      </Link>
);
}
