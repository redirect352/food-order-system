'use client';

import { Group, Radio, RadioGroupProps } from "@mantine/core";
import { useDebouncedSearchParamState, useSearchParamState } from "@/shared/hooks";

interface EmployeeStatusFilterProps extends RadioGroupProps {
  
}

const EmployeeStatusFilter = (props: EmployeeStatusFilterProps) => {
  const [active, setActive] = useDebouncedSearchParamState('active', 300);
  return (
    <Radio.Group
      value={active}
      onChange={setActive}
      label="Сотрудники:"
      {...props}
    >
      <Group>
        <Radio value="true" label="Работающие" />
        <Radio value="false" label="Уволенные" />
        <Radio value="" label="Все" />
      </Group>
    </Radio.Group>
  );
};

export default EmployeeStatusFilter;