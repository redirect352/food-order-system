/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-page-custom-font */
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import React from 'react';
import { ColorSchemeScript } from '@mantine/core';
import { Roboto } from 'next/font/google';
import { Notifications } from '@mantine/notifications';
import { RootProvider } from '@/components/providers';

export const metadata = {
  title: 'Система заказа',
  description: 'Система автоматизированного заказа товаров государственного предприятия "Минсктранс"',
};
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  fallback: ['Open Sans'],
});
const IS_DEV = process.env.NODE_ENV === 'development';

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        {IS_DEV && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet" />
            <style
              dangerouslySetInnerHTML={{
                    __html: ' :root { --font-sans: \'Roboto\', sans-serif; } ',
                }}
            />
          </>
        )}
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className={IS_DEV ? '' : roboto.className}>
          <RootProvider>
            <Notifications />
            {children}
          </RootProvider>
      </body>
    </html>
  );
}
