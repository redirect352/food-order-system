'use client';

import { useSearchParamState } from "../../../shared/hooks";
import OfficeSelect, { OfficeSelectProps } from "../../OfficeSelect/OfficeSelect";

interface OfficeFilterProps extends OfficeSelectProps {
  searchParam: string,
  arrayValue?: boolean
}

const OfficeFilter = ({ 
  searchParam,
  arrayValue = false,
  ...selectProps
}: OfficeFilterProps) => {
  const [value, setValue] = useSearchParamState(searchParam);
  return (
    <OfficeSelect
      label="Выберите филиал"
      {...selectProps}
      value={value}
      onChange={e => setValue(e as any)}
    />
  );
};

export default OfficeFilter;