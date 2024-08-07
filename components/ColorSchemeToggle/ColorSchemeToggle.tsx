'use client';

import { Button, Group, useMantineColorScheme } from '@mantine/core';
import { IconMoonStars, IconSun, IconSunMoon } from '@tabler/icons-react';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Group justify="center" mt="xl">
      <Button.Group>
        <Button size="compact-xs" variant="transparent" onClick={() => setColorScheme('light')}><IconSun /></Button>
        <Button size="compact-xs" variant="transparent" onClick={() => setColorScheme('dark')}><IconMoonStars /></Button>
        <Button size="compact-xs" variant="transparent" onClick={() => setColorScheme('auto')}><IconSunMoon /></Button>
      </Button.Group>
    </Group>
  );
}
