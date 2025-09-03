import { Flex, Paper, Title, Text, Indicator, ActionIcon, Portal, Affix, VisuallyHidden, Overlay } from "@mantine/core";
import { ImageFullInfoDto } from "@/shared/types";
import classes from './styles.module.scss';
import { ImageWithFallback, ScalingCard } from "@/UI";
import { formatDate, ImageHelper } from "@/shared/helpers";
import { IconCheck } from "@tabler/icons-react";
import { MouseEventHandler } from "react";

interface ImageCardProps {
  image: ImageFullInfoDto,
  picked?: boolean,
  togglePicked: () => void,
  onDoubleClick?:  MouseEventHandler<HTMLDivElement>,
}

const ImageCard = ( { image, picked, togglePicked, onDoubleClick }: ImageCardProps) => {
  const { id, name, author, tags, uploaded } = image;
  const src = ImageHelper.getImageSrc(image);
  return (
    <ScalingCard
      className={classes.imageCardBox} 
      animationType="up"
      onDoubleClick={onDoubleClick}
    >
      <ActionIcon 
        className={classes.checkedIndicator}
        size={32}
        variant='filled'
        data-picked={picked?'true':undefined}
      >
        <IconCheck />
      </ActionIcon>
      {picked && <Overlay color='#000' backgroundOpacity={0.07} style={{pointerEvents:'none'}} />}
      <Paper className={classes.imageBox} onClick={togglePicked} >
        <ImageWithFallback
          className={classes.image}
          src={src}
          alt={name ?? ''}
          sizes="(max-width: 460px) 270px 270px, (max-width: 564px) 370px 370px, (min-width: 565px) 220px 220px,"
          fill
          />
      </Paper>
        <Flex className={classes.imageInfo}>
          <Title order={4} lineClamp={1}>
            {name} {`(id:${id})`}
          </Title>
          <Flex className={classes.imageInfoLine}> 
            <Text className={classes.infoLabel}>
              Автор:
            </Text>
            <Text className={classes.infoContent} lineClamp={1}>
              {`${author?.employee.surname} (${author?.employee.personnelNumber})`  }
            </Text>
          </Flex>
          <Flex className={classes.imageInfoLine}> 
            <Text className={classes.infoLabel}>
              Добавлено:
            </Text>
            <Text className={classes.infoContent}>
              {formatDate(new Date(uploaded))}
            </Text>
          </Flex>
          <Flex className={classes.imageInfoLine}> 
            <Text className={classes.infoLabel}>
              Теги:
            </Text>
            <Text className={classes.infoContent} lineClamp={2}>
              {tags?.map(({id, tagName},index, arr) => <span key={id}>{tagName}{index !== arr.length-1 ? ', ' : ''}</span>)}
            </Text>
          </Flex>
        </Flex>
    </ScalingCard>
  );
};

export default ImageCard;