'use client';

import { Button, CSSVariablesResolver, Input, MantineColorsTuple, colorsTuple, createTheme, rem } from '@mantine/core';

const greyScale: MantineColorsTuple = [
    '#FFFFFF',
    '#F5F5F6',
    '#EAEBED',
    '#D5D6DC',
    '#D5D6DC',
    '#ACADB9',
    '#7B7C88',
    '#7B7C88',
    '#7B7C88',
    '#000000',
];
const primaryColorDefinition: MantineColorsTuple =
[
    '#ffe9e9',
    '#ffd1d1',
    '#fba0a1',
    '#f76d6d',
    '#f34141',
    '#f22625',
    '#f21616',
    '#d8070b',
    '#c10008',
    '#a90003',
  ];
// [
//   '#ffeaec',
//   '#fdd4d6',
//   '#f4a7ac',
//   '#ec777e',
//   '#e64f57',
//   '#e3353f',
//   '#e22732',
//   '#c91a25',
//   '#b31220',
//   '#9e0419',
// ];
const blueScale: MantineColorsTuple = [
  '#e5f4ff',
  '#cde2ff',
  '#9bc2ff',
  '#64a0ff',
  '#3984fe',
  '#1d72fe',
  '#0969ff',
  '#0058e4',
  '#004ecc',
  '#0043b5',
];
export const theme = createTheme({
    fontFamily: 'Roboto, sans-serif',
    primaryColor: 'primary',
    white: '#FFFFFF',
    black: '#232134',
    colors: {
    blue: blueScale,
        grey: greyScale,
        primary: primaryColorDefinition,
        myYellow: colorsTuple(
            Array.from({ length: 10 }, () => '#FAB005')),
    },
    radius: {
        sm: rem(8),
        md: rem(8),
    },
    primaryShade: { light: 5, dark: 6 },
    headings: {
        fontWeight: '600',
        sizes: {
            h1: {
                fontWeight: '700',
                fontSize: rem(32),
                lineHeight: rem(44.8),

            },
            h3: {
                fontSize: rem(20),
                lineHeight: rem(24.2),

            },
            h4: {
                lineHeight: rem(22.4),
                fontSize: rem(16),
            },
        },
    },
    lineHeights: {
        sm: rem(20),
        md: rem(20),
    },
    components: {
        // Button: Button.extend({
        //     vars: (_, props) => {
        //         if (props.size === 'sm' || props.size === 'md') {
        //             return {
        //         root: {
        //                     '--button-height': 'fit-content',
        //                     '--button-padding-x': rem(20),
        //                     '--button-fz': rem(14),
        //                 },
        //             };
        //         }
        //         return { root: {} };
        //         },
        //     classNames: {
        //         root: classes['my-button-root'],
        //     },
        // }),
        // Input: Input.extend({
        //     vars: (_, props) => {
        //         if (props.size === 'sm' || props.size === 'md') {
        //             return {
        //                 wrapper: {
        //                     '--input-fz': rem(14),
        //                 },
        //             };
        //         }
        //         return { wrapper: {} };
        //         },
        // }),
    },
});

// eslint-disable-next-line @typescript-eslint/no-shadow
export const resolver: CSSVariablesResolver = (theme) => ({
    variables: {
        '--button-hover': theme.colors.primary[4],
        '--mantine-hover-color': theme.colors.primary[4],
        // '--star-active-color': theme.colors.yellow[6],
        // '--star-default-color': theme.colors.grey[4],
        '--text-color': theme.black,
        '--mantine-color-dimmed': theme.colors.grey[6],
        // '--pagination-control-radius': rem(4),
    },
    light: {
    },
    dark: {
    },
    });
