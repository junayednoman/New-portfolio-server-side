import { model, Schema } from "mongoose";
import { TUserModel, TUser } from "./auth.interface";
import bcrypt from 'bcrypt'
import config from "../../config";
import { AppError } from "../../error/appError";
import httpStatus from "http-status";

const userSchema = new Schema<TUser, TUserModel>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, default: 'admin' }
    },
    { timestamps: true }
)


// encrypt the password
userSchema.pre('save', async function (next) {
    const hashedPassword = await bcrypt.hash(this.password, Number(config.salt_rounds!))
    this.password = hashedPassword
    next()
});

userSchema.statics.isUserExist = async function (email: string) {
    const user = await UserModel.findOne({ email })
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "No user found with the email!")
    }
    return user
}

// make and export the user model
export const UserModel = model<TUser, TUserModel>('User', userSchema)