'use client';

import { useDeleteImagesMutation, useDeleteImagesTagsMutation, useGetImageListQuery } from "@/lib/api/moderatorApi";
import ImageCard from "../../cards/ImageCard";
import { Flex,  LoadingOverlay,  Skeleton,  } from "@mantine/core";
import classes from './styles.module.scss';
import { Pagination } from "@/UI";
import { useSearchParamValues } from "@/shared/hooks";
import { useEffect, useState } from "react";
import DropdownMenu from "./DropdownMenu";
import ImageEditCard from "../../cards/ImageEditCard";
import { ImageFullInfoDto } from "@/shared/types";
import { NotificationService } from "@/shared/services";
import searchEmpty from '@/public/search_state.gif';
import NoContentPage from "../../NoContentPage/NoContentPage";

interface ImageListProps {
  
}

const ImageList = (props: ImageListProps) => {
  const [page,s, sortOrder, orderBy, office] = useSearchParamValues(['page','s','order','sort', 'office']);
  const { data, isLoading, isFetching } = useGetImageListQuery({
    page: +(page ?? 1), 
    pageSize: 20,
    s,
    orderBy,
    sortOrder,
    canteenId: office? +office: undefined,
  });
  const images = data?.data;
  const [picked, setPicked] = useState<number[]>([]);
  const togglePicked = (id: number) => {
    if(picked.includes(id)) setPicked(picked.filter((pickedId) => pickedId !== id ))
    else setPicked([...picked, id])
  }
  const [{opened, coordinates}, toggleOpened] = useState({opened: false, coordinates: {x:0, y:0}});
  useEffect(()=>setPicked([]),[s, orderBy, sortOrder, office])
  const [{editModalOpened, img}, setEditModalState] = useState({
    editModalOpened: false, 
    img: null as ImageFullInfoDto | null
  });
  const [deleteImages, deleteImagesResult]= useDeleteImagesMutation();
  const [deleteImagesTags, deleteImagesTagsResult]= useDeleteImagesTagsMutation();
  const closeEditModal = () => setEditModalState({editModalOpened: false, img: null});
  const openEditModal = (img: ImageFullInfoDto) => setEditModalState({editModalOpened: true, img });
  const openEdit = () =>{
    if(picked.length === 0) NotificationService.showForbiddenNotification({message:'Не выбрано ни одного изображения'})
    if(images)
      openEditModal(images.find((image) => image.id === picked[0])!)
  }
  const deleteItems = () =>{
    const ids = picked;
    deleteImages({body:{ids}})
    .then(res => {
      if(res.error){
        NotificationService.showErrorNotification({
          title: 'Ошибка удаление выбранных картинок',
          message:(res.error as any)?.message
        })
      }else{
         NotificationService.showSuccessNotification({
          title: `Удалено ${res.data?.count}`,
          message:''
        })
        setPicked([]);
      }
    })
  };
  const deleteTags= () =>{
    const ids = picked;
    deleteImagesTags({body:{ids}})
    .then(res => {
      if(res.error){
        NotificationService.showErrorNotification({
          title: 'Ошибка удаление выбранных тегов',
          message:(res.error as any)?.message
        })
      }else{
         NotificationService.showSuccessNotification({
          title: `Теги выбранных картинок очищены`,
          message:''
        })
        setPicked([]);
      }
    })
  };

  if(isFetching || data?.data.length===0){
      return (
        <div className={classes.loadingBox}>
          {
            isFetching ?
            <LoadingOverlay visible />
            :
            <NoContentPage
              label="Отсутствуют изображения по заданному запросу :("
              img={searchEmpty}
              size='sm'
            />
          }
        </div>
      )
    }
  return (
    <>
      <Flex 
        className={classes.imageListBox}
        onContextMenu={e => {e.preventDefault(); toggleOpened({opened:!opened, coordinates: {x: e.pageX, y:e.pageY}})}}
      >
        <Flex className={classes.imageList}>
          <LoadingOverlay visible={deleteImagesResult.isLoading} />
          {isLoading && <Skeleton mih={1000} miw={1400}/>}
          {
            images && images.map((img)=>(
              <ImageCard 
                key={img.id} 
                image={img} 
                togglePicked={()=>togglePicked(img.id)} picked={picked.includes(img.id)}
                onDoubleClick={() => openEditModal(img)}
              />
            )) 
          }
        </Flex>
        { data &&
          <Flex className={classes.paginationBox}>
            <Pagination total={data?.totalPages} />
          </Flex>
        }
        <DropdownMenu 
          opened={opened} 
          onChange={(opened) => toggleOpened({opened, coordinates})} 
          offset={{'mainAxis':coordinates.y - 35, 'crossAxis':coordinates.x - screen.width/2 + 95}}
          width={180}
          actions={{
            selectAll: ()=> setPicked(images?.map(({id})=>id) ?? []),
            deselectAll: () => setPicked([]),
            edit: openEdit,
            deleteItems,
            deleteTags,
          }}
        />
      </Flex>
      { img &&
        <ImageEditCard
          opened={editModalOpened}
          onClose={closeEditModal}
          imageData={
            img
          }
        />
      }
    </>
  );
};

export default ImageList;