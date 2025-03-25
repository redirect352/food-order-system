'use client';

import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CreateEmployeeModal from "../../modals/CreateEmployeeModal";
import { IconPlus } from "@tabler/icons-react";

interface CreateEmployeeButtonProps {
  
}

const CreateEmployeeButton = (props: CreateEmployeeButtonProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  
  return (
    <>
      <Button onClick={open} rightSection={<IconPlus/>} variant='outline'>
        Добавить сотрудника
      </Button>
      <CreateEmployeeModal
        opened={opened}
        onClose={close}
      />
    </>
  );
};

export default CreateEmployeeButton;