import { SortOrderFilterBar, OfficeFilter, SearchInput, AdminUserList } from "@/components";
import classes from './styles.module.scss';

const Users = () => {
  return (
    <div className={classes.pageContainer}>
      <SortOrderFilterBar>
        <OfficeFilter searchParam={"office"} />
      </SortOrderFilterBar>
      <SearchInput 
        placeholder="Введите строку для поиска"
        className={classes.searchInput}  
      />
      <AdminUserList />
    </div>
  )
};

export default Users;
