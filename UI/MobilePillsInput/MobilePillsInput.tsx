'use client';

import { Pill, PillsInput, PillsInputProps } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import InputModal from './InputModal';

interface MobilePillsInputProps extends PillsInputProps {
  data: string[],
  values: string[],
  setValues: Dispatch<SetStateAction<string[]>>,
  modalTitle?: string
}

const MobilePillsInput: FunctionComponent<MobilePillsInputProps> =
  ({ data, values, setValues, modalTitle, ...pillsInputProps }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const handleValueRemove = (val: string) =>
      setValues((current) => current.filter((v) => v !== val));
  return (
    <>
      <PillsInput {...pillsInputProps} onClick={open}>
        <Pill.Group>
          {
            values.map((value) =>
              <Pill key={value} withRemoveButton onRemove={() => handleValueRemove(value)}>
                {value}
              </Pill>
            )
          }
          {
            values.length < data.length &&
            <Pill>
              ...
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
