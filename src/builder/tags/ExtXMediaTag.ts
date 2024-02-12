import { Tag } from "./Tag";
import { TagType } from "./TagType";

export enum MediaTagType {
  AUDIO,
  VIDEO,
  SUBTITLES,
  CLOSED_CAPTIONS,
}

export class ExtXMediaTag implements Tag {
  type: TagType = TagType.MASTER_PLAYLIST_TAG;
  uri?: String | null;
  /** 
   valid strings are AUDIO, VIDEO, SUBTITLES, and CLOSED-CAPTIONS.  This attribute is REQUIRED.
   * */
  mediaType: MediaTagType;
  groupId: String;
  // TODO Extra attributes

  constructor(uri: String | null, mediaType: MediaTagType, groupId: String) {
    this.mediaType = mediaType;
    this.groupId = groupId;
    this.uri = uri;

    if (mediaType !== MediaTagType.CLOSED_CAPTIONS && !uri)
      throw new Error(
        "EXT-X-MAP tag does not allow URI for CLOSED CAPTIONS type"
      );
  }

  toString(): String {
    let attributeList = [
      "TYPE=" + this.mediaType,
      'GROUP-ID="' + this.groupId + '"',
    ];
    if (this.uri) attributeList.push('URI="' + this.uri + '"');
    return "#EXT-X-MEDIA:" + attributeList.join(",");
  }
}
