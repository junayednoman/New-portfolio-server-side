import { model, Schema } from "mongoose";
import { TSkill } from "./skill.interface";

// Create the schema
const SkillSchema: Schema = new Schema(
  {
    id: { type: String, required: true },
    frontend: { type: [String], required: true },
    backend: { type: [String], required: true }
  },
  { timestamps: true }
);

// Create and export the model
const SkillModel = model<TSkill>('Skill', SkillSchema);
export default SkillModel;