import { Playlist } from "./Playlist";
import { ExtM3UTag } from "./tags/ExtM3UTag";
import { Tag } from "./tags/Tag";
import { ExtXVersionTag } from "./tags/ExtXVersionTag";
import { Comment } from "./tags/Comment";

export const DEFAULT_MEDIA_PLAYLIST_NAME: String = "chunklist.m3u8";
export const DEFAULT_MASTER_PLAYLIST_NAME: String = "playlist.m3u8";

export abstract class PlaylistBuilder {
  public abstract name: String;

  abstract getResult(): Playlist;

  /**
   * From the reference doc:
   * > SHOULD NOT be greater than what is
   * > required for the tags and attributes in the
   * > Playlist (see Section 7).
   *
   * Right now we hardcode this to 7, but we
   * could check the minimum required version when
   * we have all tags set
   */
  protected getHeader(): Tag[] {
    return [new ExtM3UTag(), new ExtXVersionTag(7)];
  }
}
