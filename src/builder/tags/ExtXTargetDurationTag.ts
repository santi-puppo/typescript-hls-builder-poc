import { Tag } from "./Tag";
import { TagType } from "./TagType";

/**The EXT-X-TARGETDURATION tag specifies the maximum Media Segment
   duration.  The EXTINF duration of each Media Segment in the Playlist
   file, when rounded to the nearest integer, MUST be less than or equal
   to the target duration; longer segments can trigger playback stalls
   or other errors.  It applies to the entire Playlist file.  */
export class ExtXTargetDurationTag implements Tag {
  type: TagType = TagType.MEDIA_PLAYLIST_TAG;
  /**decimal-integer indicating the target duration in
   seconds. */
  duration: number;

  constructor(duration: number) {
    this.duration = duration;
  }
  
  toString(): String {
    return "#EXT-X-TARGETDURATION:" + this.duration;
  }
}
