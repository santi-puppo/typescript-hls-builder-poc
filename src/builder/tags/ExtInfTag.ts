import { Tag } from "./Tag";
import { TagType } from "./TagType";

export class ExtInfTag implements Tag {
  type: TagType = TagType.SEGMENT_TAG;
  /**
   * decimal-floating-point or decimal-integer that specifies the
   * duration of the Media Segment in seconds. */
  public duration: number;
  /** an optional human-
   readable informative title of the Media Segment expressed as UTF-8
   text. */
  public title?: String; // optional

  constructor(duration: number) {
    this.duration = duration;
  }

  toString(): String {
    let str = "#EXTINF:" + this.duration + ",";
    if (this.title) str += this.title;
    return str;
  }
}
