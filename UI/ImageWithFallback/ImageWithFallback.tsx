'use client';

import Image, { ImageProps } from 'next/image';
import React, { useState } from 'react';
import { Box } from '@mantine/core';
import NoImage from './NoImage';

export default function ImageWithFallback(props : ImageProps) {
  const [errored, setErrored] = useState(false);
  const variant = (+(props.height ?? 101)) > 100 ? 'md' : 'sm';
  const boxWidth = props.fill ? '100%' : props.width;
  const boxHeight = props.fill ? '100%' : props.height;
  return (
    <>
      {!props.src || props.src === '' || errored ?
        <Box
          px={0}
          m={0}
          w={boxWidth}
          h={boxHeight}
          style={{ flexShrink: 0 }}
          bg="var(--mantine-color-body)"
          className={props.className}
        >
          <NoImage variant={variant} />
        </Box>
        :
        <Image {...props} onError={() => setErrored(true)} />
      }
    </>
  );
}
