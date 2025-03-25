import { SortOrderFilterBar , SearchInput, EmployeeList, OfficeFilter, EmployeeStatusFilter, CreateEmployeeButton } from "@/components";
import classes from './styles.module.scss';
import commonClasses from '../styles.module.scss';

const Employees = () => {
  return (
    <div className={commonClasses.pageContainer}>
      <EmployeeStatusFilter children={undefined} className={classes.employeeFilter}/>
      <SortOrderFilterBar 
        sortFieldsOptionsDef={[
          {label:'id', 'value':'id'},
          {label:'Фамилия', 'value':'surname'},
          {label:'Табельный', 'value':'personnelNumber'},
        ]}
      >
        <OfficeFilter searchParam={"office"} arrayValue={false} />
      </SortOrderFilterBar>
      <SearchInput 
        placeholder="Введите строку для поиска"
        className={commonClasses.searchInput}  
      />
      <CreateEmployeeButton />
      <EmployeeList />
    </div>
  )
};

export default Employees;
