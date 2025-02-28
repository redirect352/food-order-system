import { ReactNode } from 'react';
import menuModeratorOptions from './menu-moderator';
import clientOptions from './client';
import commonOptions from './common';
import adminOptions from './admin';
export type SidebarOptionDefinition = {
  label: ReactNode,
  href: string,
  leftSection?: ReactNode,
};
const roleOptions: SidebarOptionDefinition[] = [
  ...clientOptions,
  ...menuModeratorOptions,
  ...adminOptions
];
export { roleOptions, commonOptions };