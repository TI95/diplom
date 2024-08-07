export type GetCommentsType = {
  allCount: number,
  comments?: {
    id: string,
    text: string,
    date: string,
    likesCount: number,
    dislikesCount: number,
    likeColor?:string,
    dislikeColor?:string
    user: {
      id: string,
      name: string,
    }
  }[],
}
