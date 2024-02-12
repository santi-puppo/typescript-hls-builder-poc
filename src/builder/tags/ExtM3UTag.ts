import { Tag } from "./Tag";
import { TagType } from "./TagType";

export class ExtM3UTag implements Tag {
  type: TagType = TagType.BASIC_TAG;

  toString(): String {
    return "#EXTM3U";
  }
}
