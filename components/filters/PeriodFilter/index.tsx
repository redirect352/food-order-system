'use client';

import { Popover, Button, CloseButton } from "@mantine/core";
import { DatePicker, DatePickerProps } from "@mantine/dates";
import { useEffect, useState } from "react";
import { IconX } from "@tabler/icons-react";
import { useDebouncedSearchParamState } from "@/shared/hooks";
import classes from './styles.module.scss';
import { formatDate, periodToString, stringToPeriod } from "@/shared/helpers";

interface PeriodFilterProps extends DatePickerProps<'range'> {
  searchParam?:string;
}

const PeriodFilter = ({ searchParam='period',  ...props}: PeriodFilterProps) => {
  const [searchString, setSearchString, debouncedValue]= useDebouncedSearchParamState(searchParam,300);
  const [value, setValue] = useState<[Date | null, Date | null]>(stringToPeriod(searchString));
  useEffect(()=>{
    const valuePeriod = periodToString(value);
    if(valuePeriod === searchString) return;
    setSearchString(valuePeriod);
  },[value])
  return (
    <Popover position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button 
          className={classes.popoverButton}
          variant='outline'
          rightSection={
            <IconX 
              className=""
              size={20} 
              onClick={e => { e.stopPropagation();setValue([null, null]);}}
            />
          }
        >
          Период:{' '}
          { !value[0] && !value[1] && '<не установлен>'}
          {  value[0] && !value[1] && `${formatDate(value[0], 'issued')} – ∞`}
          {  value[0] && value[1] && `${formatDate(value[0], 'issued')} – ${formatDate(value[1], 'issued')}`}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <DatePicker 
          {...props}
          type='range'
          allowSingleDateInRange
          value={value}
          onChange={setValue} 
        />
      </Popover.Dropdown>
    </Popover>
    
  );
};

export default PeriodFilter;