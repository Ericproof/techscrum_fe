let roleData: any = {};
let userProjectRoles: any = {};

export default function checkAccess(accessLevel: any, projectId: string) {
  const data = localStorage.getItem('user_project_roles');
  const rolesData = localStorage.getItem('roles');
  const isAdmin = localStorage.getItem('is_admin');
  if (isAdmin) {
    return true;
  }
  if (!data || !rolesData) {
    return false;
  }

  if (Object.keys(userProjectRoles).length === 0) {
    userProjectRoles = JSON.parse(data);
  }
  if (Object.keys(roleData).length === 0) {
    roleData = JSON.parse(rolesData);
  }

  const hasProjectAccess = Object.prototype.hasOwnProperty.call(userProjectRoles, projectId);
  if (!hasProjectAccess) {
    return false;
  }

  const userRoleId: string = userProjectRoles[projectId].roleId;
  const hasRole = Object.prototype.hasOwnProperty.call(roleData, userRoleId);
  if (!hasRole) {
    return false;
  }

  const role = roleData[userRoleId];
  const result = role.permission.filter((item: any) => item.slug === accessLevel);
  return result.length === 1;
}
