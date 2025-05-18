import mongoose, { Model, Schema } from 'mongoose';

interface IComment extends Document {
  creator_id: string;
  creator_nickname: string;
  post_id: string;
  text: string;
}

const commentSchema:Schema<IComment> = new mongoose.Schema({
  creator_id: { type: String, required: true },
  creator_nickname: { type: String, required: true },
  post_id: { type: String, required: true },
  text: { type: String, required: true }
});

export const Comment: Model<IComment> = mongoose.model<IComment>('Comment', commentSchema);