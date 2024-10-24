import { defaultImage } from "../../constant"
import handleAsyncRequest from "../../utils/handleAsyncRequest"
import { successResponse } from "../../utils/successResponse"
import BlogModel from "./blog.model"
import { BlogServices } from "./blog.service"

const createBlog = handleAsyncRequest(async (req, res) => {
  const thumbnail = req?.file?.path || defaultImage
  const bodyData = req.body
  const BlogData = {
    thumbnail,
    ...bodyData
  }

  const result = await BlogServices.createBlogIntoDb(BlogData)
  successResponse((res), {
    message: "Blog created successfully!", data: result,
  })
})

const getAllBlogs = handleAsyncRequest(async (req, res) => {
  const result = await BlogServices.getAllBlogFromDb(req.query)
  successResponse((res), {
    message: 'Blogs retrieved successfully!', data: result,
  })
})

const getBlogById = handleAsyncRequest(async (req, res) => {
  const result = await BlogServices.getSingleBlogFromDb(req.params.id)
  successResponse((res), {
    message: "Blog retrieved successfully!", data: result,
  })
})

const updateSingleBlog = handleAsyncRequest(async (req, res) => {
  const bodyData = req.body
  let thumbnail
  const oldBlog = await BlogModel.findById(req.params.id)
  if (req.file) {
    thumbnail = req.file?.path
  } else {
    thumbnail = oldBlog?.thumbnail
  }
  const BlogData = {
    thumbnail,
    ...bodyData
  }

  // const retrievedToken = req.headers.authorization
  // const token = retrievedToken?.split('Bearer, ')[1]

  const result = await BlogServices.updateSingleBlog(req.params.id, BlogData)
  successResponse((res), {
    message: "Blog updated successfully!", data: result,
  })
})

const deleteBlog = handleAsyncRequest(async (req, res) => {
  // const retrievedToken = req.headers.authorization
  // const token = retrievedToken?.split('Bearer, ')[1]
  const result = await BlogServices.deleteBlog(req.params.id)
  successResponse((res), {
    message: "Blog deleted successfully!", data: result,
  })
})

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateSingleBlog,
  deleteBlog
}