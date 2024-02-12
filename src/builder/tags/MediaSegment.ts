import { ExtInfTag } from "./ExtInfTag";
import { Tag } from "./Tag";
import { TagType } from "./TagType";

export class MediaSegment implements Tag {
  type: TagType = TagType.MEDIA_PLAYLIST_TAG;
  uri: String;
  inf: ExtInfTag;
  private _tags: Tag[] = [];

  get tags(): Tag[] {
    let res: Tag[] = [this.inf];
    return res.concat(this._tags);
  }

  constructor(uri: String, duration: number) {
    this.uri = uri;
    this.inf = new ExtInfTag(duration);
  }

  addTag(tag: Tag): MediaSegment {
    if (tag.type == TagType.SEGMENT_TAG) this._tags.push(tag);
    return this;
  }

  toString(): String {
    return this.uri;
  }
}
