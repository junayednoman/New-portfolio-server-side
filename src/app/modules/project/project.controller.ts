import { defaultImage } from "../../constant";
import handleAsyncRequest from "../../utils/handleAsyncRequest";
import { successResponse } from "../../utils/successResponse";
import ProjectModel from "./project.model";
import { projectServices } from "./project.service";

const createProject = handleAsyncRequest(async (req, res) => {
  const thumbnail = req?.file?.path || defaultImage
  const bodyData = req.body
  const projectData = {
    thumbnail,
    ...bodyData
  }


  const result = await projectServices.createProjectIntoDb(projectData)
  successResponse((res), {
    message: "Project created successfully!", data: result,
  })
})

const getAllProjects = handleAsyncRequest(async (req, res) => {
  const result = await projectServices.getAllProjectFromDb(req.query)
  successResponse((res), {
    message: 'Projects retrieved successfully!', data: result,
  })
})

const getProjectById = handleAsyncRequest(async (req, res) => {
  const result = await projectServices.getSingleProjectFromDb(req.params.id)
  successResponse((res), {
    message: "Project retrieved successfully!", data: result,
  })
})

const updateSingleProject = handleAsyncRequest(async (req, res) => {
  const bodyData = req.body
  let thumbnail
  const oldProject = await ProjectModel.findById(req.params.id)
  if (req.file) {
    thumbnail = req.file?.path
  } else {
    thumbnail = oldProject?.thumbnail
  }
  const ProjectData = {
    thumbnail,
    ...bodyData
  }

  // const retrievedToken = req.headers.authorization
  // const token = retrievedToken?.split('Bearer, ')[1]

  const result = await projectServices.updateSingleProject(req.params.id, ProjectData)
  successResponse((res), {
    message: "Project updated successfully!", data: result,
  })
})

const deleteProject = handleAsyncRequest(async (req, res) => {
  // const retrievedToken = req.headers.authorization
  // const token = retrievedToken?.split('Bearer, ')[1]
  const result = await projectServices.deleteProject(req.params.id)
  successResponse((res), {
    message: "Project deleted successfully!", data: result,
  })
})

export const projectControllers = {
  createProject,
  getAllProjects,
  getProjectById,
  updateSingleProject,
  deleteProject
}