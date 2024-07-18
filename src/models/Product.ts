import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  imageURL: String,
  brand: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default model('Product', productSchema);
