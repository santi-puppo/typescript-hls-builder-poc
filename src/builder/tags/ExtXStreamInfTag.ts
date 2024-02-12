import { Tag } from "./Tag";
import { TagType } from "./TagType";

export class ExtXStreamInfTag implements Tag {
  type: TagType = TagType.MASTER_PLAYLIST_TAG;
  uri: String;
  bandwidth: number;
  codecs?: String;
  resolution?: String;
  frameRate?: String;
  audio?: String;
  video?: String;
  subtitles?: String;
  closedCaptions?: String;

  constructor(uri: String, bandwidth: number) {
    this.uri = uri;
    this.bandwidth = bandwidth;
  }

  attributeList(): String {
    let attributes = ["BANDWIDTH=" + this.bandwidth];
    if (this.codecs) attributes.push("CODECS=" + this.codecs);
    if (this.resolution) attributes.push("RESOLUTION=" + this.resolution);
    if (this.frameRate) attributes.push("FRAME-RATE" + this.frameRate);
    if (this.audio) attributes.push("AUDIO" + this.audio);
    if (this.video) attributes.push("VIDEO" + this.video);
    if (this.subtitles) attributes.push("SUBTITLES" + this.subtitles);
    if (this.closedCaptions)
      attributes.push("CLOSED-CAPTIONS" + this.closedCaptions);

    return attributes.join(",");
  }

  toString(): String {
    return "#EXT-X-STREAM-INF:" + this.attributeList() + "\n" + this.uri;
  }
}
