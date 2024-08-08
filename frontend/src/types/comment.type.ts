import {UserInfoType} from "./user-info.type";

export type CommentType = {

  id: string,
  text: string,
  date: string,
  likesCount: number,
  dislikesCount: number,
  likeColor?: string;
  dislikeColor?:string,
  isDateFormatted?:boolean,
  user:UserInfoType
}
