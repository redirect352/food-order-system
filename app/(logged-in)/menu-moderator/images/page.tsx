import { ImageList, SearchInput } from "@/components"
import classes from './styles.module.scss';

const ImagesPage = () => {
  return (
    <>
      <SearchInput
        className={classes.search}
        placeholder="Введите подсказки изображения"
      />
      <ImageList />
    </>
  );
};

export default ImagesPage;