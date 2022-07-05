import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DropResult } from 'react-beautiful-dnd';
import style from './Board.module.scss';
import BoardSearch from './BoardSearch/BoardSearch';
import BoardMain from './BoardMain/BoardMain';
import ProjectHeader from '../ProjectHeader/ProjectHeader';
import CreateNewCard from '../Card/Card';
import HeaderNav from './HeaderNav/HeaderNav';
import { getBoard } from '../../api/board/board';
import { updateTaskStatus } from '../../api/task/task';
import IBoardEntity, { IColumnsFromBackend, ICardData, IItemFromBackend } from '../../types';

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

const onDragEnd = (
  result: DropResult,
  columns: IColumnsFromBackend,
  setColumns: (arg0: IColumnsFromBackend) => void
) => {
  if (!result.destination) return null;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    updateTaskStatus(result.draggableId, parseInt(result.destination.droppableId, 10));
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
    return true;
  }

  const column = columns[source.droppableId];
  const copiedItems = [...column.items];
  const [removed] = copiedItems.splice(source.index, 1);
  copiedItems.splice(destination.index, 0, removed);
  return setColumns({
    ...columns,
    [source.droppableId]: {
      ...column,
      items: copiedItems
    }
  });
};

export default function Board() {
  const [inputQuery, setInputQuery] = useState<string>('');
  const [columnsInfo, setColumnsInfo] = useState<IColumnsFromBackend>({});
  const { boardId = '' } = useParams();

  const projectsOrderbyDate = projects.sort((a, b) => {
    return a.lastEditTime < b.lastEditTime ? 1 : -1;
  });
  const [projectList] = useState(projectsOrderbyDate);
  const [value, setValue] = useState(0);
  const [isCreateNewCard, setIsCreateNewCard] = useState(false);

  const getProjectFromChildren = (index: number) => {
    projectList[index].star = !projectList[index].star;
    setValue(value + 1);
  };

  const getCreateNewCardStateFromChildren = () => {
    setIsCreateNewCard(!isCreateNewCard);

    // setTaskList([...taskList, ...newTask])
  };

  const fetchNewCard = (newCard: ICardData) => {
    getCreateNewCardStateFromChildren();
    const newItem: IItemFromBackend = {
      id: newCard.id,
      tag: newCard.tag,
      title: newCard.title,
      statusId: newCard.statusId
    };
    const columns = columnsInfo;
    columns[0].items.push(newItem);
    setColumnsInfo(columns);
  };

  const dragEventHandler = (result: DropResult) => {
    return onDragEnd(result, columnsInfo, setColumnsInfo);
  };

  useEffect(() => {
    const fetchColumnsData = (boardInfo: IBoardEntity) => {
      let columnInfoData: IColumnsFromBackend = {};
      boardInfo.taskStatus.forEach((status, index) => {
        const tasks: IItemFromBackend[] = boardInfo.taskList.filter(
          (task) =>
            task.statusId === index && task.title.toLowerCase().includes(inputQuery.toLowerCase())
        );
        columnInfoData = { ...columnInfoData, [index.toString()]: { name: status, items: tasks } };
      });
      setColumnsInfo(columnInfoData);
    };

    const fetchBoardInfo = async () => {
      const boardInfo = await getBoard(boardId);
      fetchColumnsData(boardInfo);
    };
    fetchBoardInfo();
  }, [inputQuery, boardId]);

  return (
    <div className={style.container}>
      <ProjectHeader
        projects={projects}
        updateProject={getProjectFromChildren}
        updateIsCreateNewCard={getCreateNewCardStateFromChildren}
      />
      <HeaderNav />
      <BoardSearch
        updateIsCreateNewCard={getCreateNewCardStateFromChildren}
        setInputQuery={setInputQuery}
      />
      <BoardMain columnsInfo={columnsInfo} onDragEventHandler={dragEventHandler} />
      {isCreateNewCard && (
        <CreateNewCard
          fetchNewCard={fetchNewCard}
          updateIsCreateNewCard={getCreateNewCardStateFromChildren}
        />
      )}
    </div>
  );
}
