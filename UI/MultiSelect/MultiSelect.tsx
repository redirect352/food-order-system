'use client';

import { FunctionComponent, useState } from 'react';
import {
  MultiSelect as MantineMultiSelect,
  MultiSelectProps as MantineMultiSelectProps,
  useMantineTheme,
} from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import classes from './styles.module.scss';

interface SelectProps extends MantineMultiSelectProps {

}

const MultiSelect: FunctionComponent<SelectProps> = (props) => {
  const theme = useMantineTheme();
  const [isOpened, setIsOpened] = useState(false);
  return (
    <MantineMultiSelect
      {...props}
      classNames={{
        input: classes.selectInput,
        option: classes.selectOption,
        section: classes.selectSection,
        pill: classes.pill,
      }}
      onDropdownOpen={() => setIsOpened(true)}
      onDropdownClose={() => setIsOpened(false)}
      comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
      rightSection={
        isOpened ?
        <IconChevronUp size={16} color={theme.colors.primary[5]} />
        :
        <IconChevronDown size={16} color={theme.colors.grey[5]} />
      }
      />
   );
};

export { MultiSelect };
