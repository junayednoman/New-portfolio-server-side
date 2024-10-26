import config from "../../config"
import { AppError } from "../../error/appError"
import { TUser } from "./auth.interface"
import { UserModel } from "./auth.model"
import httpStatus from "http-status"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

//  Creates a user in the database.
// const createUserIntoDb = async (payload: TUser) => {
//     const existedUser = await UserModel.findOne({ email: payload.email })
//     if (existedUser) {
//         throw new AppError(httpStatus.BAD_REQUEST, "User already exists")
//     }

//     const newUser = await UserModel.create(payload)
//     const jwtPayload = {
//         _id: newUser._id,
//         name: newUser.name,
//         email: newUser.email,
//         role: newUser.role,
//     }
//     const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret!, { expiresIn: config.jwt_access_expires_in });
//     const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret!, { expiresIn: config.jwt_refresh_expires_in });
//     return {
//         accessToken,
//         refreshToken
//     }
// }

const loginUser = async (payload: Pick<TUser, "email" | "password">) => {
    const user = await UserModel.isUserExist(payload.email) as TUser & { _id: string };

    // check if password match
    const isPasswordMatch = await bcrypt.compare(
        payload?.password,
        user.password,
    );
    if (!isPasswordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Password is incorrect!")
    }

    const jwtPayload = {
        _id: user._id,
        email: user.email,
        role: user.role
    }
    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret!, { expiresIn: config.jwt_access_expires_in });
    const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret!, { expiresIn: config.jwt_refresh_expires_in });

    return {
        accessToken,
        refreshToken
    }
}


export const authServices = {
    loginUser,
}