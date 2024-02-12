import { Tag } from "./Tag";
import { TagType } from "./TagType";

export class ExtXMapTag implements Tag {
  type: TagType = TagType.MEDIA_PLAYLIST_TAG;
  uri: String;
  byteRangeN?: number; // number offset
  byteRangeO?: number;

  constructor(uri: String) {
    this.uri = uri;
  }

  toString(): String {
    let attributeList = ["URI=" + this.uri];
    if (this.byteRangeN) {
      let byteRange =
        this.byteRangeN + (this.byteRangeO ? "@" + this.byteRangeO : "");
      attributeList.push("BYTERANGE=" + byteRange);
    }

    return "#EXT-X-MAP:" + attributeList.join(",");
  }
}
