import { ComboboxData } from "@mantine/core";

type officeTypes = 
'canteen' | 'branch' | 'special';
export default officeTypes;
export const officeTypeOptions: ComboboxData = [
  {label: 'Столовая', 'value': 'canteen'},
  {label: 'Филиал', 'value': 'branch'},
  {label: 'Специальный', 'value': 'special'},
]

export const typesLabels = {
  'canteen':'Столовая',
  'branch':'Филиал',
  'special':'Специальный'
}