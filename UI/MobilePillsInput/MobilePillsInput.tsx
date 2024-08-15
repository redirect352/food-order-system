'use client';

import { ActionIcon, ComboboxItem, Pill, PillsInput, PillsInputProps } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { IconTrash } from '@tabler/icons-react';
import InputModal from './InputModal';

interface MobilePillsInputProps extends PillsInputProps {
  data: ComboboxItem[],
  values?: string[],
  setValues: Dispatch<SetStateAction<string[] | undefined>>,
  modalTitle?: string
}

const MobilePillsInput: FunctionComponent<MobilePillsInputProps> =
  ({ data, values, setValues, modalTitle, ...pillsInputProps }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const handleValueRemove = (val: string) =>
       setValues((current) => current?.filter((v) => v !== val));
  return (
    <>
      <PillsInput {...pillsInputProps} onClick={open}>
        <Pill.Group>
          {
            values?.map((value) =>
              <Pill key={value} withRemoveButton onRemove={() => handleValueRemove(value)}>
                {data.find((item) => item.value === value)?.label}
              </Pill>
            )
          }
          {
            (!values || values.length === 0) &&
            <Pill>
              ...
            </Pill>
          }
          {
            (values && values.length > 0) &&
            <Pill onClick={(e) => { e.stopPropagation(); setValues([]); }}>
              <ActionIcon size={24} variant="transparent">
               <IconTrash stroke={1.5} size={24} />
              </ActionIcon>
            </Pill>
          }
        </Pill.Group>
      </PillsInput>
      <InputModal
        title={modalTitle}
        opened={opened}
        onClose={close}
        options={data}
        values={values}
        acceptChanges={setValues}
      />
    </>
  );
};

export default MobilePillsInput;
