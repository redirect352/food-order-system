'use client';

import { Affix, AffixBaseProps, BoxProps, Button, Transition, TransitionProps } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';
import React, { FunctionComponent } from 'react';

interface MobileScrollToAffixProps {
  buttonLabel: string,
  scrollDirection: 'top' | 'bottom',
  position?: AffixBaseProps['position'],
  zIndex?: number,
  hiddenFrom?: BoxProps['hiddenFrom'],
  transitionType?: TransitionProps['transition'],
  transitionDuration?: TransitionProps['duration'],
}

const MobileScrollToAffix: FunctionComponent<MobileScrollToAffixProps> = ({
  scrollDirection,
  buttonLabel,
  position,
  zIndex = 95,
  hiddenFrom = 'sm',
  transitionType = 'slide-left',
  transitionDuration = 300,
}) => {
  const [scroll, scrollTo] = useWindowScroll();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(scrollDirection === 'top' ? scroll.y > 0 : scroll.y < (document.body.scrollHeight - window.screen.height - 400)), [scroll]);
  const buttonIcon = scrollDirection === 'top' ? <IconArrowUp size={14} /> : <IconArrowDown size={14} />;
  return (
    <Affix
      position={position}
      hiddenFrom={hiddenFrom}
      zIndex={zIndex}
    >
      <Transition transition={transitionType} duration={transitionDuration} mounted={mounted}>
      {
        (transitionStyles) => (
        <Button
          onClick={() => scrollTo({ y: scrollDirection === 'top' ? 0 : document.body.clientHeight })}
          rightSection={buttonIcon}
          style={{ ...transitionStyles }}
          size="md"
        >
          {buttonLabel}
        </Button>)
        }
      </Transition>
    </Affix>
  );
};

export default MobileScrollToAffix;
