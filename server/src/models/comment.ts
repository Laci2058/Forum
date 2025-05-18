import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  creator_id: { type: String, required: true },
  creator_nickname: { type: String, required: true },
  post_id: { type: String, required: true },
  text: { type: String, required: true }
});

export const Comment = mongoose.model('Comment', commentSchema);