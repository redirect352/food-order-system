'use client';
import { Input, SegmentedControl } from "@mantine/core";
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
    <>
      <Input.Wrapper label="Тип интерфейса:"/>
      <SegmentedControl
        color="red"
        data={data}
        value={userInterface ?? undefined}
        onChange={(value) => changeInterface(value)}
      />
    </>
  );
};

export default InterfaceControl;