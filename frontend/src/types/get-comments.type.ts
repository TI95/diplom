import {CommentType} from "./comment.type";

export type GetCommentsType = {
  allCount: number,
  comments?: CommentType[],
}
