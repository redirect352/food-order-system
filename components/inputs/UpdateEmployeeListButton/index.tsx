'use client';

import { ActionIcon, Button, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconUserUp } from "@tabler/icons-react";
import UpdateBranchOfficeEmployeesModal from "@/components/modals/UpdateBranchOfficeEmployeesModal";

interface UpdateEmployeeListButtonProps {
  
}

const UpdateEmployeeListButton = (props: UpdateEmployeeListButtonProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Tooltip label={'Загрузить список сотрудников филиала'}>
        <ActionIcon onClick={open} variant="outline" size={32}>
          <IconUserUp />
        </ActionIcon>
      </Tooltip>
      <UpdateBranchOfficeEmployeesModal 
        opened={opened}
        onClose={close}
      />
    </>
  );
};

export default UpdateEmployeeListButton;