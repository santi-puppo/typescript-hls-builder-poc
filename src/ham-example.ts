import { M3U8Builder } from "./builder/M3u8Builder";
import { Playlist } from "./builder/Playlist";
import { MediaTagType } from "./builder/tags/ExtXMediaTag";
import { PlaylistType } from "./builder/tags/ExtXPlaylistType";

class HamVisitor {
  builder: M3U8Builder = new M3U8Builder();

  visitTrack(id: String, type: MediaTagType, codec: String) {
    // Seems worth it to do visitAudioTrack and visitVideoTrack
    if (type == MediaTagType.AUDIO) {
      this.builder.masterPlaylist.addMedia(id, type, codec);
    } else {
      this.builder.masterPlaylist.addStreamInf(id, 100000); // random bandwidth
    }

    let playlist = this.builder.mediaPlaylist(id);

    playlist.setTargetDuration(24);
    playlist.setPlaylistType(PlaylistType.VOD);
  }

  visitSegment(uri: String, duration: number, segmentTrackId: String) {
    this.builder.mediaPlaylist(segmentTrackId).addMediaSegment(uri, duration);
  }

  visitHeader(uri: String, segmentTrackId: String) {
    this.builder.mediaPlaylist(segmentTrackId).addMap(uri);
  }

  getResult(): Playlist[] {
    return this.builder.getResult();
  }

  loadTestData = (
    trackId: String,
    segmentNumbers: number[],
    mediaType: MediaTagType,
    codec: String = trackId
  ) => {
    // Aux functions since I didnt add the whole model,
    // but these methods would be called from each element and their
    // parameters would be the element itself
    this.visitTrack(trackId, mediaType, codec);
    this.visitHeader(trackId + "/header.mp4", trackId);
    segmentNumbers.forEach((n) =>
      this.visitSegment(trackId + "/media" + n + ".mp4", 6, trackId)
    );
  };
}

const main = () => {
  let renderer = new HamVisitor();

  let testSegments = [1, 2, 3, 4, 5, 6];
  renderer.loadTestData(
    "aac/chunklist.m3u8",
    testSegments,
    MediaTagType.AUDIO,
    "aac"
  );
  renderer.loadTestData(
    "opus/chunklist.m3u8",
    testSegments,
    MediaTagType.AUDIO,
    "opus"
  );
  renderer.loadTestData(
    "360p/chunklist.m3u8",
    testSegments,
    MediaTagType.VIDEO,
    "h264"
  );
  renderer.loadTestData(
    "1080p/chunklist.m3u8",
    testSegments,
    MediaTagType.VIDEO,
    "h264"
  );

  console.log(
    renderer
      .getResult()
      .map((res) => res.toString())
      .join("\n ------------- \n")
  );
};

main();
