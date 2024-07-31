/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-page-custom-font */
import React from 'react';
import ResponsiveSizes from './ResponsiveSizes';

export default function LoggedLayout({ children }: { children: any }) {
  return (
    <ResponsiveSizes>
      {children}
    </ResponsiveSizes>
  );
}
