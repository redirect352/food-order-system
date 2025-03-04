'use client';
import { Input, SegmentedControl, Stack, Text } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { changeUserInterface, selectUserInterface, selectUserRole } from "@/lib/features/user/userSlice";
import { interfaces } from "./interfaces";
import { allowedInterfaces } from "@/shared/settings";

interface InterfaceControlProps {
  
}

const InterfaceControl = (props: InterfaceControlProps) => {
  const role = useAppSelector(selectUserRole);
  const userInterface = useAppSelector(selectUserInterface);
  const dispatch = useAppDispatch();
  const changeInterface = (value: string) => dispatch(changeUserInterface(value));
  const data = interfaces.map((item) => 
    ({
      ...item,
      disabled: !allowedInterfaces[role as keyof typeof allowedInterfaces].includes(item.value)
    })
  );
  if(role === 'client') return (<></>);
  return (
    <Stack gap={0}>
      <Text size="sm" fw={500}>
        Интерфейс
      </Text>
      <SegmentedControl
        color="red"
        data={data}
        value={userInterface ?? undefined}
        onChange={(value) => changeInterface(value)}
      />
    </Stack>
  );
};

export default InterfaceControl;