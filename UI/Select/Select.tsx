'use client';

import { FunctionComponent, useState } from 'react';
import { Select as MantineSelect, SelectProps as MantineSelectProps, useMantineTheme } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import classes from './styles.module.scss';

interface SelectProps extends MantineSelectProps {

}

const Select: FunctionComponent<SelectProps> = (props) => {
  const theme = useMantineTheme();
  const [isOpened, setIsOpened] = useState(false);
  return (
    <MantineSelect
      {...props}
      withCheckIcon={false}
      classNames={{
        input: classes.selectInput,
        option: classes.selectOption,
        section: classes.selectSection,
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

export default Select;
