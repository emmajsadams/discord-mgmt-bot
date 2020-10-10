const { ACQUAINTANCE_ROLE } = require("./ids");

const autorole = async (member) => {
  await member.roles.add(ACQUAINTANCE_ROLE, "Auto role");
};

module.exports = autorole;
