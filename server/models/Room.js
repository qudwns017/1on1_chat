const Sequelize = require("sequelize");

class Room extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        _id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          comment: "채팅방의 아이디 ( 채팅방을 식별할 값 )",
        },
        name: {
          type: Sequelize.STRING(40),
          alllowNull: true,
          comment: "채팅방 이름 ( 최대 40자, 특수문자 가능 )",
        },
      },
      {
        modelName: "Room",
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Room.hasMany(db.Chat, {
      foreignKey: { name: "RoomId", allowNull: true },
      onDelete: "cascade",
    });
  }
}

module.exports = Room;
