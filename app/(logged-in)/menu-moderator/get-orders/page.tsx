import ExportOrdersForm from "../../../../components/forms/ExportOrdersForm/ExportOrdersForm";
import classes from './styles.module.scss';
const GetOrdersPage = () => {
  return (<>
    <ExportOrdersForm className={classes.form} />
  </>);
};

export default GetOrdersPage;