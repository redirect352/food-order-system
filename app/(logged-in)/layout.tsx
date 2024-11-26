/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-page-custom-font */
import React, { Suspense } from 'react';
import ResponsiveSizes from './ResponsiveSizes';

export default function LoggedLayout({ children }: { children: any }) {
  return (
    <ResponsiveSizes>
      <Suspense>
        {children}
      </Suspense>
    </ResponsiveSizes>
  );
}
