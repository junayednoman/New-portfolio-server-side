import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { AppError } from "../../error/appError";
import { TBlog } from "./blog.interface";
import BlogModel from "./blog.model";

const searchableFields = ['title', 'content', 'tags', 'description']

// create Blog into database
const createBlogIntoDb = async (payload: TBlog) => {
  const result = await BlogModel.create(payload);
  return result;
};

const getAllBlogFromDb = async (query: Record<string, unknown>) => {
  const BlogQuery = new QueryBuilder(BlogModel.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .selectFields()

  const meta = await BlogQuery.countTotal();
  const result = await BlogQuery.queryModel
  return { result, meta }
}


const getSingleBlogFromDb = async (id: string) => {
  const BlogFromDb = await BlogModel.findById(id)
  if (!BlogFromDb) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Blog ID')
  }
  if (BlogFromDb.isDeleted) {
    throw new AppError(httpStatus.MOVED_PERMANENTLY, 'Blog is deleted')
  }
  return BlogFromDb;
}

// // update post
const updateSingleBlog = async (id: string, payload: TBlog,) => {
  // verify the user
  // const decoded = verifyAccessToken(token)

  // check if the update request is from the author
  const postFromDb = await BlogModel.findOne({ _id: id, isDeleted: false })

  if (!postFromDb) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Blog ID')
  }

  const updatedBlog = await BlogModel.findByIdAndUpdate(id, payload, { new: true })
  if (!updatedBlog) {
    throw new Error('Unable to update the Blog!')
  }
  return updatedBlog
}


// delete post
const deleteBlog = async (id: string) => {
  // check if the update request is from the author
  const BlogFromDb = await BlogModel.findOne({ _id: id, isDeleted: false })

  if (!BlogFromDb) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Blog ID')
  }

  const deleteBlog = await BlogModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
  if (!deleteBlog) {
    throw new Error('Unable to delete the Blog!')
  }
  return deleteBlog;
}

export const BlogServices = {
  createBlogIntoDb,
  getAllBlogFromDb,
  getSingleBlogFromDb,
  updateSingleBlog,
  deleteBlog
}

