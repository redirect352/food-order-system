'use client';

import { Button, Stack, StackProps, Title } from "@mantine/core";
import ImageDropzone from "../../../UI/ImageDropzone/ImageDropzone";
import ImageTagsInput from "./ImageTagsInput";
import { useField, useForm } from "@mantine/form";
import { FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { NotificationService } from "../../../shared/services";
import { useUploadImagesMutation } from "../../../lib/api/moderatorApi";

export type UploadImageFormProps = {

} & StackProps ;

const UploadImageForm = (props : UploadImageFormProps) => {
  const maxImagesCount = 5;
  const form = useForm({
    mode:'uncontrolled',
    initialValues: {
      imageTags: [] as string[],
    },
    validate: {
      imageTags: (val) => val.length === 0 ? "Добавите хотя-бы 1 подсказку" : null,
    }
  })
  const filesField = useField({
    initialValue: [] as FileWithPath[],
    validate: (val) => val.length !== 0 && val.length <= 5 ? null  : "Добавьте от 1 до 5 картинок",
  });
  const [upload, result] = useUploadImagesMutation();
  const onDrop = (files: FileWithPath[]) =>{
    const prev = filesField.getValue();
    const canAccept =  maxImagesCount - prev.length;
    filesField.setValue([...prev, ...files.slice(0, canAccept)])
  }
  const removeFile = (file: FileWithPath) => {
    const prev = filesField.getValue();
    filesField.setValue(prev.filter((item)=> item !== file))
  }
  const submit = async () =>{
    if(form.validate().hasErrors) return;
    filesField.validate();
    if(filesField.error){
      NotificationService.showErrorNotification({message: filesField.error})
      return;
    }
    const files = filesField.getValue();
    upload({
      files: files as File[],
      tags: form.getValues().imageTags,
    })
    .then(({data, error}) =>{
      if(error){
        NotificationService.showErrorNotification({message: (error as any)?.message ?? 'Ошибка добавления картинки'})
        return;
      }
      if(data){
        NotificationService.showSuccessNotification({title: 'Картинки успешно добавлены', message: `Добавлено ${data?.length} картинок с id: ${data.map(({id})=>id).join(', ')}`})
        filesField.reset();
        form.reset();
        return;
      }
    });
    
  }

  return(
    <Stack {...props}>
      <Title order={2}> 
        Загрузить картинку
      </Title>
      <ImageTagsInput 
        label="Выберите или введите подсказки для изображения"
        placeholder="Борщ холодный"
        maxTags={3}
        acceptValueOnBlur
        key={form.key('imageTags')}
        {...form.getInputProps('imageTags')}
        disabled= {result.isLoading}
      />
      <ImageDropzone 
        files={filesField.getValue()}
        removeFile={ removeFile}
        onDrop={onDrop}
        maxSize={2 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        label = {`Максимальное количество изображений: ${maxImagesCount}, Максимальный размер одного изображения: 2 Мб`}
        disabled = {filesField.getValue().length === maxImagesCount}
        loading = {result.isLoading}
      />
      <Button onClick={submit} disabled={result.isLoading}>
        Загрузить
      </Button>
    </Stack>
  )
};

export default UploadImageForm;