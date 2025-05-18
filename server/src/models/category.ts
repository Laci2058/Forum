import mongoose, { Model, Schema } from 'mongoose';

interface ICategory extends Document {
  category_name: string;
}

const categorySchmema: Schema<ICategory> = new mongoose.Schema({
  category_name: { type: String, required: true }
});

export const Category: Model<ICategory> = mongoose.model<ICategory>('Category', categorySchmema);