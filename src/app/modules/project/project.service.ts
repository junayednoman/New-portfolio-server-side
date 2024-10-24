import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { AppError } from "../../error/appError";
import { TProject } from "./project.interface";
import ProjectModel from "./project.model";

const searchableFields = ['title', 'content', 'techs', 'description']

// create project into database
const createProjectIntoDb = async (payload: TProject) => {
  const result = await ProjectModel.create(payload);
  return result;
};

const getAllProjectFromDb = async (query: Record<string, unknown>) => {
  const projectQuery = new QueryBuilder(ProjectModel.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .selectFields()

  const meta = await projectQuery.countTotal();
  const result = await projectQuery.queryModel
  return { result, meta }
}


const getSingleProjectFromDb = async (id: string) => {
  const projectFromDb = await ProjectModel.findById(id)
  if (!projectFromDb) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid project ID')
  }
  if (projectFromDb.isDeleted) {
    throw new AppError(httpStatus.MOVED_PERMANENTLY, 'project is deleted')
  }
  return projectFromDb;
}

// // update post
const updateSingleProject = async (id: string, payload: TProject,) => {
  // verify the user
  // const decoded = verifyAccessToken(token)

  // check if the update request is from the author
  const postFromDb = await ProjectModel.findOne({ _id: id, isDeleted: false })

  if (!postFromDb) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid project ID')
  }

  const updatedProject = await ProjectModel.findByIdAndUpdate(id, payload, { new: true })
  if (!updatedProject) {
    throw new Error('Unable to update the project!')
  }
  return updatedProject
}


// delete post
const deleteProject = async (id: string) => {
  // check if the update request is from the author
  const projectFromDb = await ProjectModel.findOne({ _id: id, isDeleted: false })

  if (!projectFromDb) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid project ID')
  }

  const deleteProject = await ProjectModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
  if (!deleteProject) {
    throw new Error('Unable to delete the project!')
  }
  return deleteProject;
}

export const projectServices = {
  createProjectIntoDb,
  getAllProjectFromDb,
  getSingleProjectFromDb,
  updateSingleProject,
  deleteProject
}

