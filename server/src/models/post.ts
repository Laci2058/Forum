
import mongoose, { Model, Schema } from 'mongoose';

interface IPost extends Document {
  creator_id: string;
  creator_nickname: string;
  category_id: string;
  title: string;
  text: string;
}

const postSchema: Schema<IPost> = new mongoose.Schema({
  creator_id: { type: String, required: true },
  creator_nickname: { type: String, required: true },
  category_id: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true }
});

export const Post: Model<IPost> = mongoose.model<IPost>('Post', postSchema);