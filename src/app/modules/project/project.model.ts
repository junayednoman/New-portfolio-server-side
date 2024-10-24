import { model, Schema } from "mongoose";
import { defaultImage } from "../../constant";
import { TProject } from "./project.interface";

const ProjectSchema = new Schema({

  title: { type: String, required: true },
  content: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, default: defaultImage },
  techs: [{ type: String, }],
  github_client: { type: String, required: true },
  github_server: { type: String, required: true },
  url: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
}, {
  timestamps: true
});


const ProjectModel = model<TProject>('project', ProjectSchema)
export default ProjectModel