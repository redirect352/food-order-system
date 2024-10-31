import { Carousel, CarouselProps } from "@mantine/carousel";
import classes from './styles.module.scss';
import { ImageWithFallback } from "../../UI";
import { ImageDto } from "../../shared/types";
import { ImageHelper } from "../../shared/helpers";
interface ImageCarouselProps extends CarouselProps {
  images?: ImageDto[],
  classNames?: { slide?: string }
  sizes?: string,
}

const ImageCarousel = ({images, classNames,sizes,...props}: ImageCarouselProps) => { 
  const slideClass = classNames?.slide ?? classes.imageBox;
  const CarouselSlide = ({ src, alt}: {src: string, alt: string}) =>(
      <Carousel.Slide 
        pos={'relative'} 
        className={slideClass}
      >
        <ImageWithFallback
          src={src}
          alt={alt}
          sizes={sizes ?? "100px 100px"}
          priority={false}
          fill
        />
      </Carousel.Slide>
    
  );
  return (
    <Carousel 
      withIndicators 
      {...props}
      className={slideClass}
      classNames={{control: classes.control}}
    >
    {
      (images?.length === 0 || !images) && <CarouselSlide key='no-img' src="" alt="no-image"/>
    }
    {
      images?.map((img)=> (
        <CarouselSlide key={img.path} src={ImageHelper.getImageSrc(img)} alt={img?.name ?? ''}/>
      ))
    }
    </Carousel>
  );
};

export default ImageCarousel;