import { Tag } from "./Tag";
import { TagType } from "./TagType";

export class ExtXVersionTag implements Tag {
  type = TagType.BASIC_TAG;

  version: number;

  constructor(version: number) {
    this.version = version;
  }

  toString(): String {
    return "#EXT-X-VERSION=" + this.version;
  }
}
