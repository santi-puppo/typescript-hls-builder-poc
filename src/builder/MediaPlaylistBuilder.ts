import { MediaSegment } from "./tags/MediaSegment";
import { Playlist } from "./Playlist";
import { ExtXMapTag } from "./tags/ExtXMapTag";
import { Tag } from "./tags/Tag";
import { ExtXTargetDurationTag } from "./tags/ExtXTargetDurationTag";
import {
  DEFAULT_MEDIA_PLAYLIST_NAME,
  PlaylistBuilder,
} from "./PlaylistBuilder";
import { ExtXPlaylistType, PlaylistType } from "./tags/ExtXPlaylistType";

export class MediaPlaylistBuilder extends PlaylistBuilder {
  public name: String = DEFAULT_MEDIA_PLAYLIST_NAME;
  playlistType?: ExtXPlaylistType;

  /*
   * Some media segment tags like EXTINF apply only to the following segment
   * Others, like EXT-X-MAP apply to all following segments.
   *
   * Right now, I consider We only have one tag like EXT-X-MAP, but if we
   * wanted to better model this behaviour, we could add groups to these tags
   * But it is out of scope for now
   */
  // Media Segment Tags
  map?: ExtXMapTag;
  mediaSegments: MediaSegment[] = []; // TODO Map with idx

  private get mediaSegmentTags(): Tag[] {
    let ret: Tag[] = [];
    if (this.map) ret.push(this.map);
    return ret;
  }

  private get mediaPlaylistTags(): Tag[] {
    let ret: Tag[] = [];
    if (this.playlistType) ret.push(this.playlistType);
    return ret;
  }

  addMediaSegment(uri: String, duration: number): MediaSegment {
    let mediaSegment = new MediaSegment(uri, duration);
    this.mediaSegments.push(mediaSegment);
    return mediaSegment;
  }

  addMap(uri: String): MediaPlaylistBuilder {
    this.map = new ExtXMapTag(uri);
    return this;
  }

  setTargetDuration(duration: number): ExtXTargetDurationTag {
    let tag = new ExtXTargetDurationTag(duration);
    this.mediaPlaylistTags.push(tag);
    return tag;
  }

  setPlaylistType(playlistType: PlaylistType) {
    this.playlistType = new ExtXPlaylistType(playlistType);
  }

  getResult(): Playlist {
    let playlist = new Playlist("playlist.m3u8");
    playlist.addTags(this.getHeader());
    playlist.addTags(this.mediaSegmentTags);

    this.mediaSegments.forEach((seg: MediaSegment) => {
      playlist.addTags(seg.tags);
      playlist.addTag(seg);
    });

    return playlist;
  }
}
