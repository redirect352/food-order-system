/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-page-custom-font */
import '@mantine/core/styles.layer.css';
import '@mantine/notifications/styles.layer.css';
import '@mantine/dates/styles.layer.css';
import '@mantine/carousel/styles.layer.css';
import '@mantine/dropzone/styles.layer.css';
import React from 'react';
import { ColorSchemeScript } from '@mantine/core';
import { Roboto } from 'next/font/google';
import { Notifications } from '@mantine/notifications';
import { RootProvider } from '@/components/providers';
import favicon from './favicon.ico';
import { icons } from '@tabler/icons-react';

export const metadata = {
  title: 'Заказ питания Минсктранс',
  description: 'Система автоматизированного заказа питания для сотрудников государственного предприятия "Минсктранс"'
};
// const roboto = Roboto({
//   weight: ['300', '400', '500', '700'],
//   subsets: ['latin', 'cyrillic'],
//   fallback: ['Open Sans'],
// });
const IS_DEV = process.env.NODE_ENV === 'development' || true;

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="ru" suppressHydrationWarning>
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
        {/* <link rel="shortcut icon" href="/favicon.ico" sizes="any" /> */}
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      {/* <body className={IS_DEV ? '' : roboto.className}> */}
      <body>
          <RootProvider>
            <Notifications />
            {children}
          </RootProvider>
      </body>
    </html>
  );
}
