const Sequelize = require("sequelize");
const config = require("../config");
const dbConfig = config["db"];

const Chat = require("./Chat");
const Room = require("./Room");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

const db = {};

db.Room = Room;
db.Chat = Chat;

Object.keys(db).forEach(async (name) => {
  await db[name].init(sequelize);
});
Object.keys(db).forEach((name) => {
  if (typeof db[name].associate === "function") {
    db[name].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
