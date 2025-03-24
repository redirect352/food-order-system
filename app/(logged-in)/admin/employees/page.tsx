import { SortOrderFilterBar , SearchInput, EmployeeList, OfficeFilter, EmployeeStatusFilter } from "@/components";
import classes from './styles.module.scss';

const Employees = () => {
  return (
    <div className={classes.pageContainer}>
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
        className={classes.searchInput}  
      />
      <EmployeeList />
    </div>
  )
};

export default Employees;
