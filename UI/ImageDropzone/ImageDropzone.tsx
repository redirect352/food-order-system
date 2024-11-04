'use client';

import { Group, rem, SimpleGrid, Text, Image, Box, BackgroundImage, Card, Button, ActionIcon, LoadingOverlay } from "@mantine/core";
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconX, IconPhoto, IconDots } from "@tabler/icons-react";
import { FunctionComponent, useState } from "react";

interface ImageDropzoneProps  extends DropzoneProps{
  label?: React.ReactNode,
  files: FileWithPath[],
  removeFile: (file: FileWithPath) => void,
} 
 
const ImageDropzone: FunctionComponent<ImageDropzoneProps> = ({
  label = `Прикрепите файлы`,
  files,
  removeFile,
  ...props
}) => {
  const previews = files.map((file) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Card w={200} h={230} maw={200} key={file.lastModified} p={0} px={'xs'} bg={"var(--mantine-color-background)"} withBorder>
      <Card.Section inheritPadding py="xs">
        <Group justify="space-between" py={'xs'} align='center'>
          <Text lineClamp={1} maw={"70%"}>{file.name}</Text>
          <ActionIcon 
            onClick={()=> removeFile(file)}
            variant="subtle"
          >
            <IconX style={{ width: rem(24), height: rem(24) }} />
          </ActionIcon>
        </Group>
      </Card.Section>
      
        <BackgroundImage
          src={imageUrl}
          radius="sm"
          w={"100%"}
          h={"100%"}
          opacity={40}
        >
           <LoadingOverlay 
            visible={props.loading} 
            zIndex={1000} 
            overlayProps={{ radius: "sm", blur: 2 }} 
           />
        </BackgroundImage>
      </Card>
    );
  });
  return (
    <>
      <Dropzone
       
        
        {...props}
      >
        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <IconUpload
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Перетащите изображения сюда или нажмите, чтобы выбрать файлы
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              {label}
            </Text>
          </div>
        </Group>
      </Dropzone>
      <Group>
          {previews}
      </Group>
    </>
  );
}
 
export default ImageDropzone;