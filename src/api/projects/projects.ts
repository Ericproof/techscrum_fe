import axios from 'axios';

import config from '../../config/config';

export function getProjects() {
  // return axios.get(`${config.apiAddress}/projects`);
  const projects = {
    data: [
      {
        id: 0,
        star: false,
        icon: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10418?size=small',
        name: 'example',
        key: 'EX',
        type: 'Team-managed software',
        lead: 'Evan Lin',
        avatar:
          'https://i2.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/EL-3.png?ssl=1',
        lastEditTime: new Date('2021-05-10')
      },
      {
        id: 1,
        star: false,
        icon: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10411?size=small',
        name: 'TECHSCRUM',
        key: 'TEC',
        type: 'Team-managed software',
        lead: 'Yiu Kitman',
        avatar:
          'https://i2.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/YK-3.png?ssl=1',
        lastEditTime: new Date('2021-05-11')
      },
      {
        id: 2,
        star: false,
        icon: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10412?size=small',
        name: 'Template',
        key: 'TEM',
        type: 'Company-managed software',
        lead: 'Yiu Kitman',
        avatar:
          'https://i2.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/YK-3.png?ssl=1',
        lastEditTime: new Date('2021-05-8')
      }
    ]
  };
  return projects;
}

export function show(id: string) {
  return axios.get(`${config.apiAddress}/projects/${id}`);
}

export function createProject(data: any) {
  return axios.post(`${config.apiAddress}/projects`, data);
}

export function deleteProject(id: any) {
  return axios.delete(`${config.apiAddress}/projects/${id}`);
}
