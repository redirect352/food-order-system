'use client';

import { TextInput, TextInputProps } from "@mantine/core";
import { useDebouncedSearchParamState, useSearchParamValue, useUpdatePageURL } from "@/shared/hooks";
import classes from './styles.module.scss';
import { IconSearch } from "@tabler/icons-react";

interface SearchInputProps extends TextInputProps {
  
}

const SearchInput = ({...textInputProps}: SearchInputProps) => {
  const [searchString, setSearchString] = useDebouncedSearchParamState('s',500, [['page','1']]);
  return (
    <TextInput 
      value={searchString}
      onChange={(e) => setSearchString(e.target.value)}
      classNames={{input:classes.input, section:classes.section}}
      rightSection={<IconSearch className={classes.icon}/>}
      rightSectionWidth={'4rem'}
      leftSection={<></>}
      leftSectionWidth={'2rem'}
      {...textInputProps}
      className={[textInputProps.className ?? '' ].join(' ')}
    />
  );
};

export default SearchInput;