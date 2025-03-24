import { Table, TableProps } from "@mantine/core";
import classes from './styles.module.scss';
import React from "react";

interface SampleTableProps<Item> extends TableProps {
  headerContent: React.ReactNode,
  items: Item[],
  makeRow: (i: Item) => React.ReactNode
}

export function SampleTable<T>({headerContent, items, makeRow,...props}: SampleTableProps<T>){
  return (
      <Table 
        striped 
        highlightOnHover 
        withTableBorder 
        withColumnBorders 
        className={classes.table} 
        {...props}
      > 
        <Table.Thead className={classes.header}>
          {headerContent}
        </Table.Thead>
        <Table.Tbody>
          { items.map(makeRow) }
        </Table.Tbody>
      </Table>
    );
};

export default SampleTable;