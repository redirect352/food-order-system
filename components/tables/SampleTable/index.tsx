import { Button, Table, TableProps } from "@mantine/core";
import classes from './styles.module.scss';
import React from "react";

interface SampleTableProps<Item> extends TableProps {
  headerContent: React.ReactNode,
  items: Item[],
  makeRow: (i: Item) => React.ReactNode,
  extraRows?: React.ReactNode
}

export function SampleTable<T>({headerContent, items, makeRow, extraRows, ...props}: SampleTableProps<T>){
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
          {extraRows}
        </Table.Tbody>
      </Table>
    );
};

export default SampleTable;