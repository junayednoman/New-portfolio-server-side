import { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";

// Create the schema
const BlogSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String], // Array of strings
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Create and export the model
const BlogModel = model<TBlog>('Blog', BlogSchema);
export default BlogModel;