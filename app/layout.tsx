import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { resolver, theme } from '../theme';
import ResponsiveSizes from './ResponsiveSizes';

export const metadata = {
  title: 'Система заказа',
  description: 'Система автоматизированного заказа товаров государственного предприятия "Минсктранс"',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
      <MantineProvider theme={theme} cssVariablesResolver={resolver}>
        <ResponsiveSizes>
          {children}
        </ResponsiveSizes>
      </MantineProvider>
      </body>
    </html>
  );
}
