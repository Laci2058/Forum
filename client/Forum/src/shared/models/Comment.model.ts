export interface Comment {
  _id?:string
  creator_id: string;
  creator_nickname: string;
  post_id: string;
  text: string;
}