import AdminUserList from "@/components/lists/AdminUserList";
import SearchInput from "@/components/inputs/SearchInput";
import classes from './styles.module.scss';
import {AdminUsersFiltersBar} from "@/components";

const Users = () => {
  return (
    <div className={classes.pageContainer}>
      <AdminUsersFiltersBar />
      <SearchInput 
        placeholder="Введите строку для поиска"
        className={classes.searchInput}  
      />
      <AdminUserList />
    </div>
  )
};

export default Users;
