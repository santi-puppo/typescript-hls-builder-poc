# PoC HLS Playlist Builder

Provides classes to generate basic Master Playlists (builder/MasterPlaylistBuilder.ts) and Media Playlists (builder/MediaPlaylistBuilder.ts). 
Also provides a M3u8 Builder (builder/M3u8Builder.ts) to hold this set of builders and get the generated results.

The project was build following this standard: https://datatracker.ietf.org/doc/html/rfc8216 

## Constraints and Validations
If using the builders to generate a Playlist a user should expect an HLS compatible playlist to be generated. 

Some of the constraints specified in the document that are taken into account in this project:
- To ensure that each type of Playlist only contains its corresponding tags: 
  - The MasterPlaylistBuilder only offers methods to generate "Basic tags", "Master Playlist tags" and "Media or Master Playlist tags"; 
  - The Media Playlist Builder offers methods to generate "Basic tags", "Media Playlist tags", "Media Segment tags" and "Media or Master Playlist tags".
- Builders ensure that these tags are output in the correct order
- Unique tags are represented as attributes in a builder and tags that allow repetition are stored in Lists and will be rendered in order of insertion. 
- For tag attributes: Required attributes are requested on tag creation. 
  - Builders may add extra methods to build tags in two steps, but that logic should be handled in the builder


## Limitations

- HLS Version number is set to 7.
- Only a reduced set of tags was implemented. These tags were chosen to build simple CMAF compatible playlists for another project.
- The builders do not check for empty or correct output, so they could generate results with just the HLS header or incompatible results such as a Master playlist with no stream inf tags. Adding all the necessary tags is a responability of the user.
- Only one EXT-X-MAP tag is allowed per playlist.

