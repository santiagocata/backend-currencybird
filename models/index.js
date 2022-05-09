const User = require("./User");
const Token = require("./Token");

User.hasMany(Token);
Token.belongsTo(User);

module.exports = { User, Token };
