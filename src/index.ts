import { M3U8Builder } from "./builder/M3u8Builder";
import { MediaTagType } from "./builder/tags/ExtXMediaTag";
import { PlaylistType } from "./builder/tags/ExtXPlaylistType";

const loadTestData = (builder: M3U8Builder, id: String) => {
  let playlist = builder.mediaPlaylist(id + "/chunklist.m3u8");
  playlist.addMap(id + "/header.mp4");
  playlist.addMediaSegment(id + "/seg1.mp4", 6);
  playlist.addMediaSegment(id + "/seg2.mp4", 6);
  playlist.addMediaSegment(id + "/seg3.mp4", 6);
  playlist.addMediaSegment(id + "/seg4.mp4", 6);
  playlist.setTargetDuration(24);
  playlist.setPlaylistType(PlaylistType.VOD);
};

const main = () => {
  let builder = new M3U8Builder();
  builder.masterPlaylist.addMedia(
    "aac/chunklist.m3u8",
    MediaTagType.AUDIO,
    "aac"
  );
  builder.masterPlaylist.addMedia(
    "opus/chunklist.m3u8",
    MediaTagType.AUDIO,
    "opus"
  );
  builder.masterPlaylist.addStreamInf("360p/chunklist.m3u8", 10000);
  builder.masterPlaylist.addStreamInf("1080p/chunklist.m3u8", 200000);

  loadTestData(builder, "aac");
  loadTestData(builder, "opus");
  loadTestData(builder, "360p");
  loadTestData(builder, "1080p");

  console.log(
    builder
      .getResult()
      .map((res) => res.toString())
      .join("\n ------------- \n")
  );
};

main();
