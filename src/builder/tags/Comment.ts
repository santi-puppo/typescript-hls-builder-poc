import { Tag } from "./Tag";
import { TagType } from "./TagType";

export class Comment implements Tag {
  type: TagType = TagType.BASIC_TAG;
  comment: String;

  constructor(comment: String) {
    this.comment = comment;
  }
  toString(): String {
    return this.comment;
  }
}
