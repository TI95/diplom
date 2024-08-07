export type ArticleType = {
  text: string,
  comments:
    {
      id: string,
      text: string,
      date: string,
      likesCount: number,
      dislikesCount: number,
      likeColor?: string;
      dislikeColor?:string,
      isDateFormatted?:boolean
      user: {
        id: string,
        name: string
      }
    }[],
  commentsCount: number,
  id: string,
  title: string,
  description: string,
  image: string,
  date: string,
  category: string,
  url: string,

}
