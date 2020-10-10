const { ACQUAINTANCE_ROLE } = require('./ids')

const autorole = async (member) => {
  await member.edit({
    roles: [ACQUAINTANCE_ROLE]
  })
}

module.exports = autorole
