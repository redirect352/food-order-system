import moment from "moment";
import { OfficeDto } from "../../types";
import { EmployeeInfoDto } from "../../types/employee/employee-info.dto";

export function formatFullName(employee?: EmployeeInfoDto){
  if(!employee) return '';
  return `${employee.surname} ${employee.name} ${employee.patronymic}`
}

export function formatOffice(office?: OfficeDto){
  if(!office) return '';
  const { name, address} = office;
  if(address) return `${name} (${address})`;
  return name
}

export function formatDate (date: Date,variant: 'default' | 'with-sec' | 'issued' = 'default'){
  switch(variant){
    case 'default': return moment(date).format('YYYY-MM-DD HH:mm')
    case 'with-sec': return moment(date).format('YYYY-MM-DD HH:mm:ss')
    case 'issued': return moment(date).format('DD.MM.YYYY')
  }
}