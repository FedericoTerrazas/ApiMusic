import mysql from "mysql2/promise";

const dbConfig = {
 host: "localhost",
 user: "root",
 password: process.env.DB_PASS,
 port: 3306,
 database: "musics",
}
export const connection = await mysql.createConnection(dbConfig);

