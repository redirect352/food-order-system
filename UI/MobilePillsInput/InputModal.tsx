'use client';

import { Box, Checkbox, Flex, ModalProps, Stack, Text } from '@mantine/core';
import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from 'react';
import MobileModal from '../MobileModal/MobileModal';

interface InputModalProps extends ModalProps {
  options: string[],
  values: string[],
  acceptChanges: Dispatch<SetStateAction<string[]>>,
}

const InputModal: FunctionComponent<InputModalProps> =
  ({ options, values, acceptChanges, ...modalProps }) => {
  const [checked, changeChecked] = useState(values);
  useEffect(() => changeChecked(values), [values]);
  return (
    <MobileModal
      {...modalProps}
      zIndex="var(--second-modal-z-index)"
      acceptAction={() => acceptChanges(checked)}
      showAccept={checked.length > 0}
      cancelAction={() => changeChecked(values)}
    >
      <Checkbox.Group
        px="md"
        value={checked}
        onChange={changeChecked}
      >
          <Stack gap="xs">
          {
            options.map(value =>
              <Checkbox.Card radius="md" h={50} value={value} key={value}>
                <Flex wrap="nowrap" justify="flex-start" gap={25} px={12}>
                  <Checkbox.Indicator />
                  <Text>{value}</Text>
                </Flex>
              </Checkbox.Card>
            )
          }
          </Stack>
          <Box h={30}></Box>
      </Checkbox.Group>
    </MobileModal>
  );
};
export default InputModal;
