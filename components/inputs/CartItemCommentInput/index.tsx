import { __InputStylesNames, MantineComponent, TextInput, TextInputProps } from "@mantine/core";
import classes from './styles.module.scss';
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { changeDishComment, selectCartItem } from "@/lib/features/cart/cartSlice";
interface CartItemCommentInputProps extends TextInputProps {
  menuPositionId: number;
}

const CartItemCommentInput = ({menuPositionId, ...props}: CartItemCommentInputProps) => {
  const dispatch = useAppDispatch();
  const changeComment = (newComment: string) => dispatch(changeDishComment({
    menuPositionId, 
    newComment
  }));
  const item =  useAppSelector((state) => selectCartItem(state, menuPositionId));
  return (
    <TextInput
      disabled={!item}
      className={classes.additionalInfoInput} 
      classNames={{input:classes.dimmedInput}}
      size="xs" 
      variant='unstyled'  
      placeholder='Добавить примечание'
      defaultValue={item?.comment ?? ''}
      onBlur={(e)=>changeComment(e.target.value)}
      onClick={e => e.stopPropagation()}
      {...props}
    />
  );
};

export default CartItemCommentInput;