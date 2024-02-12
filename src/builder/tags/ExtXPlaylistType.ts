import { Tag } from "./Tag";
import { TagType } from "./TagType";

export enum PlaylistType {
  VOD = "VOD",
  EVENT = "EVENT",
}

export class ExtXPlaylistType implements Tag {
  type: TagType = TagType.MEDIA_PLAYLIST_TAG;
  playlistType: PlaylistType;

  constructor(playlistType: PlaylistType) {
    this.playlistType = playlistType;
  }

  toString(): String {
    return "#EXT-X-PLAYLIST-TYPE:" + this.playlistType;
  }
}
