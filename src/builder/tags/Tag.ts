import { TagType } from "./TagType";

export interface Tag {
  toString(): String;
  type: TagType;
}
