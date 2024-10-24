import handleAsyncRequest from "../../utils/handleAsyncRequest"
import { successResponse } from "../../utils/successResponse"
import { SkillServices } from "./skill.service"

const createSkill = handleAsyncRequest(async (req, res) => {
  const bodyData = req.body
  const { id } = req.params
  const result = await SkillServices.createSkillIntoDb(bodyData, id)
  successResponse((res), {
    message: "Skill updated successfully!", data: result,
  })
})

const getAllSkills = handleAsyncRequest(async (req, res) => {
  const { id } = req.params
  const result = await SkillServices.getAllSkillFromDb(id)
  successResponse((res), {
    message: 'Skills retrieved successfully!', data: result,
  })
})

export const SkillControllers = {
  createSkill,
  getAllSkills,
}