import React, { useState } from 'react';
import style from './index.module.scss';
import BoardSearch from './BoardSearch/BoardSearch';
import BoardMain from './BoardMain/BoardMain';
import ProjectHeader from '../../components/ProjectHeader/ProjectHeader';
import Card from '../../components/Card/Card';

const projects = [
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
];
export default function Board() {
  const projectsOrderbyDate = projects.sort((a, b) => {
    return a.lastEditTime < b.lastEditTime ? 1 : -1;
  });
  const [projectList] = useState(projectsOrderbyDate);
  const [value, setValue] = useState(0);
  const getProjectFromChildren = (index: number) => {
    projectList[index].star = !projectList[index].star;
    setValue(value + 1);
  };
  return (
    <>
      <ProjectHeader projects={projects} updateProject={getProjectFromChildren} />
      <div className={style.container}>
        <BoardSearch />
        <BoardMain />
        <Card />
      </div>
    </>
  );
}
