import { Playlist } from "./Playlist";
import { MasterPlaylistBuilder } from "./MasterPlaylistBuilder";
import { MediaPlaylistBuilder } from "./MediaPlaylistBuilder";

export class M3U8Builder {
  private masterPlaylistBuilder: MasterPlaylistBuilder;
  private mediaPlaylistBuilders: Map<String, MediaPlaylistBuilder>;

  constructor() {
    this.masterPlaylistBuilder = new MasterPlaylistBuilder();
    this.mediaPlaylistBuilders = new Map();
  }

  get masterPlaylist(): MasterPlaylistBuilder {
    return this.masterPlaylistBuilder;
  }

  mediaPlaylist(id: String) {
    let builder = this.mediaPlaylistBuilders.get(id);
    if (!builder) {
      builder = new MediaPlaylistBuilder();
      builder.name = id;
      this.mediaPlaylistBuilders.set(id, builder);
    }
    return builder;
  }

  getResult(): Playlist[] {
    let masterPlaylist = this.masterPlaylist.getResult();
    let mediaPlaylists = Array.from(this.mediaPlaylistBuilders.values()).map(
      (builder) => builder.getResult()
    );
    return [this.masterPlaylist.getResult()].concat(mediaPlaylists);
  }
}
