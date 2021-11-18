const allRoles = {
  user: [],
  device: ['station'],
  admin: ['getUsers', 'manageUsers', 'station', 'manageStation', 'newStation'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
