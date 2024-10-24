import { ImageDto } from '../types';

export default class ImageHelper {
  private static readonly imageBase = process.env.NEXT_PUBLIC_IMAGE_BASE;
  public static getImageSrc(image?: ImageDto) {
    return image ? `${this.imageBase}/${image.path}` : '';
  }
}
