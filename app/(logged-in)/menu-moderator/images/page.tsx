import { ImageList, SearchInput } from "@/components"

const ImagesPage = () => {
  return (
    <>
      <SearchInput 
        placeholder="Введите подсказки изображения"
      />
      <ImageList />
    </>
  );
};

export default ImagesPage;