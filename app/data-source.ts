import { DataSource } from "typeorm";
import dotEnv from "dotenv";
import { Users } from "./entities/Users.entity";

dotEnv.config();

const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  NODE_ENV
} = process.env

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,

  synchronize: NODE_ENV === "development" ? false : false,
  //logging logs sql command on the terminal
  logging: NODE_ENV === "development" ? false : false,
  entities: [Users],
  migrations: ["app/migration/*.ts"],
  subscribers: [],
});
