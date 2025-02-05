import classes from './styles.module.scss';

interface DeliveryDestinationInputProps {
  
}

const DeliveryDestinationInput = (props: DeliveryDestinationInputProps) => {
  return (
    <div className={classes.labelBox}>
      Место доставки: 
      <strong> Administration</strong>
    </div>
  );
};

export default DeliveryDestinationInput;