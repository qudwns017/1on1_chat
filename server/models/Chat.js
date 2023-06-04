const Sequelize = require("sequelize");

class Chat extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        _id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          comment: "채팅의 아이디 ( 채팅을 식별할 값 )",
        },
        message: {
          type: Sequelize.STRING(200),
          alllowNull: false,
          comment: "채팅 이름 ( 최대 200자, 특수문자 가능 )",
        },
        name: {
          type: Sequelize.STRING(200),
          alllowNull: false,
          comment: "User의 이름",
        },
      },
      {
        modelName: "Chat",
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Chat.belongsTo(db.Room, {
      foreignKey: "RoomId",
      onDelete: "cascade",
    });
  }
}

module.exports = Chat;
