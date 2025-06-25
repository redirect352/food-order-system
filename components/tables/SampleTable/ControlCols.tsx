import { Table, ActionIcon } from "@mantine/core";
import { IconDeviceFloppy, IconTrash } from "@tabler/icons-react";
import { form } from "framer-motion/dist/client";
import commonClasses from '../styles.module.scss';

interface ControlColsProps {
  onDelete?: (e:any) => void
  onUpdate?:(e:any) => void,
  disabled?: {update?: boolean, delete?: boolean} 
}

const ControlCols = ({onDelete, onUpdate, disabled}: ControlColsProps) => {

  return (
    <>
      {
      onUpdate &&
      <Table.Td>
        <ActionIcon
          className={commonClasses.saveBtn}
          size={24}
          variant='transparent'
          disabled={disabled?.update}
          onClick={onUpdate}
        >
          <IconDeviceFloppy size={24} />
        </ActionIcon>
      </Table.Td>
      }
      {
      onDelete &&
      <Table.Td>
        <ActionIcon
          size={24}
          variant='transparent'
          disabled={disabled?.delete}
          onClick={onDelete}
        >
          <IconTrash size={24} />
        </ActionIcon>
      </Table.Td>
      }
    </> 
  );
};

export default ControlCols;