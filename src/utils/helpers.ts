import axios from 'axios';
import config from '../config/config';

let roleData: any = {};
let userProjectRoles: any = {};
let projectData: any = {};
export default function checkAccess(accessLevel: any, projectId: string) {
  const data = localStorage.getItem('user_project_roles');
  const rolesData = localStorage.getItem('roles');
  const isAdmin = localStorage.getItem('is_admin');
  const projects = localStorage.getItem('projects');
  const userId = localStorage.getItem('user_id');
  if (!isAdmin) {
    return false;
  }
  if (isAdmin.toString() === '1' || isAdmin.toString() === 'true') {
    return true;
  }
  if (!data || !rolesData || !projects) {
    return false;
  }

  if (Object.keys(userProjectRoles).length === 0) {
    userProjectRoles = JSON.parse(data);
  }
  if (Object.keys(roleData).length === 0) {
    roleData = JSON.parse(rolesData);
  }
  if (Object.keys(projectData).length === 0) {
    projectData = JSON.parse(projects);
  }
  // console.log(projectData, userId, projectData[projectId].ownerId, projectId);

  if (projectData[projectId]?.ownerId?.id === userId) {
    return true;
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

export const projectRolesToObject = (projectsRoles: any) => {
  const obj: any = {};
  const keys = projectsRoles.map((item: any) => {
    return item.projectId;
  });

  for (let i = 0; i < keys.length; i += 1) {
    obj[keys[i]] = projectsRoles[i];
  }
  return obj;
};

export const projectToObject = (projects: any) => {
  const obj: any = {};
  const keys = projects.map((item: any) => {
    return item.id;
  });

  for (let i = 0; i < keys.length; i += 1) {
    obj[keys[i]] = projects[i];
  }
  return obj;
};

export const getOwner = (projectId: string) => {
  const projects = localStorage.getItem('projects');
  if (!projects) {
    return {};
  }
  if (Object.keys(projectData).length === 0) {
    projectData = JSON.parse(projects);
  }
  return projectData[projectId]?.ownerId;
};

export const convertRolesArrayToObject = (roles: any) => {
  const obj: any = {};
  const keys = roles.map((item: any) => {
    return item.id;
  });

  for (let i = 0; i < keys.length; i += 1) {
    obj[keys[i]] = roles[i];
  }
  return obj;
};

export const getRoles = async () => {
  const path = `${config.apiAddress}/roles`;
  const res = await axios.get(path);
  const obj = convertRolesArrayToObject(res.data);
  localStorage.setItem('roles', JSON.stringify(obj));
  return obj;
};

export const setLocalStorage = (user: any) => {
  localStorage.setItem(
    'user_project_roles',
    JSON.stringify(projectRolesToObject(user.projectsRoles))
  );
  localStorage.setItem('is_admin', user.isAdmin);
  localStorage.setItem('user_id', user.id);
  const roles = localStorage.getItem('roles');
  if (!roles) {
    getRoles();
  }
};
