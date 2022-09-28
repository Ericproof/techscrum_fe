import React, { useEffect, useState } from 'react';
import TaskTypeSelect from '../../components/Select/TypeSelect/TaskTypeSelect';
import BacklogView from './BacklogView/BacklogView';

export default function BacklogPage() {
  // WIP add props after backend is done
  // const [type, setType] = useState('');

  // return <TaskTypeSelect onChange={(e) => setType(e)} />;
  return <BacklogView />;
}
