import { Playlist } from "./Playlist";
import { ExtXMediaTag, MediaTagType } from "./tags/ExtXMediaTag";
import { ExtXStreamInfTag } from "./tags/ExtXStreamInfTag";
import {
  DEFAULT_MASTER_PLAYLIST_NAME,
  PlaylistBuilder,
} from "./PlaylistBuilder";

export class MasterPlaylistBuilder extends PlaylistBuilder {
  public name: String = DEFAULT_MASTER_PLAYLIST_NAME;
  medias: ExtXMediaTag[] = [];
  streamInfs: ExtXStreamInfTag[] = [];

  addMedia(uri: String, type: MediaTagType, groupId: String): ExtXMediaTag {
    let mediaTag = new ExtXMediaTag(uri, type, groupId);
    this.medias.push(mediaTag);
    return mediaTag;
  }

  addStreamInf(uri: String, bandwidth: number): ExtXStreamInfTag {
    let tag = new ExtXStreamInfTag(uri, bandwidth);
    this.streamInfs.push(tag);
    return tag;
  }

  getResult(): Playlist {
    let playlist = new Playlist(this.name);
    playlist.addTags(this.getHeader());
    playlist.addTags(this.medias);
    playlist.addTags(this.streamInfs);
    return playlist;
  }
}
