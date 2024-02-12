import { Tag } from "./tags/Tag";

export class Playlist {
  public name: String;
  public tags: Tag[];

  constructor(name: String, tags: Tag[] = []) {
    this.name = name;
    this.tags = tags;
  }

  addTag(tag: Tag): Playlist {
    this.tags.push(tag);
    return this;
  }

  addTags(tags: Tag[]): Playlist {
    tags.forEach((tag) => {
      this.tags.push(tag);
    });
    return this;
  }

  toString(): String {
    return this.tags.map((tag: Tag) => tag.toString()).join("\n");
  }
}
