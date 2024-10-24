import { TSkill } from "./skill.interface";
import SkillModel from "./skill.model";

// create Skill into database
const createSkillIntoDb = async (payload: TSkill, id: string) => {
  const result = await SkillModel.findOneAndUpdate({ id }, payload, { upsert: true });
  return result;
};

const getAllSkillFromDb = async (id: string) => {
  const result = await SkillModel.findOne({ id });
  return result;
}

export const SkillServices = {
  createSkillIntoDb,
  getAllSkillFromDb,
}

