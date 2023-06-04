const path = require("path");
const dotenv = require("dotenv");

let envFound;

if (process.env.NODE_ENV === "production") {
  envFound = dotenv.config({
    path: path.join(__dirname, "../.env"),
  });
} else if (process.env.NODE_ENV === "development") {
  envFound = dotenv.config({
    path: path.join(__dirname, "../.env.development"),
  });
}

// if (envFound.error) {
//   throw new Error("⚠️  Couldn't find .env file  ⚠️");
// }

module.exports = {
  //server 구동 환경
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  //db 설정
  db: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    timezone: "+09:00", // DB에 저장할 때 시간 설정
    dialectOptions: {
      timezone: "+09:00", // DB에서 가져올 때 시간 설정
    },
  },
};
