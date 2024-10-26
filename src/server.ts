import mongoose from 'mongoose'
import config from './app/config'
import app from './app'
import { Server } from "http"
import { UserModel } from './app/modules/auth/auth.model';
let server: Server;

async function main() {
  try {

    const newUser = new UserModel({
      email: config.default_user_email,
      password: config.default_user_password
    });

    newUser.save()
      .then(() => console.log('Initial user created:'))
      .catch(err => console.error('Error creating initial user:', err));


    await mongoose.connect(config.database_url as string)
    server = app.listen(config.port, () => {
      console.log(`🚀 Server is running on port: ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()

process.on("unhandledRejection", () => {
  console.log(`unhandledRejection is detected, server shutting down... 😞`);
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on("uncaughtException", () => {
  console.log(`uncaughtException is detected, server shutting down... 😞`);
  process.exit();
})
