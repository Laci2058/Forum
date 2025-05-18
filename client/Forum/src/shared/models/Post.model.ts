export interface Post {
  _id?: string;
  creator_id: string;
  creator_nickname: string
  category_id: string;
  title: string;
  text: string;
}