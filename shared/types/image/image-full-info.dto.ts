import { ImageTagDto } from "./image-tag.dto";
import { UserOwnInfoDto } from "../user";

export type ImageFullInfoDto = {
  id: number,
  name: string,
  path: string,
  tags?: ImageTagDto[],
  author?: UserOwnInfoDto,
  uploaded: Date;
};