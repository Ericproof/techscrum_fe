import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDashBoardDailyScrumsByUser, getDashBoardData } from '../../../api/dashboard';
import { UserContext } from '../../../context/UserInfoProvider';
import { IDashboard, IDashBoardDailyScrum } from '../../../types';

const useFetchDashboardData = () => {
  const { id } = useContext(UserContext);
  const [data, setData] = useState<IDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { projectId } = useParams<{ projectId: string }>();

  useEffect(() => {
    if (!projectId || !id) {
      return;
    }
    (async () => {
      try {
        const result = await getDashBoardData(projectId as string, id as string);
        setData(result);
        setIsLoading(false);
      } catch (e) {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      }
    })();
  }, [projectId, id]);

  return { data, isLoading };
};

export const useFetchDashboardDailyScrumsByUser = () => {
  const { id } = useContext(UserContext);
  const [data, setData] = useState<IDashBoardDailyScrum[] | null>(null);
  const { projectId } = useParams<{ projectId: string }>();

  useEffect(() => {
    (async () => {
      try {
        const result = await getDashBoardDailyScrumsByUser(projectId as string, id as string);
        setData(result);
      } catch (e) {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      }
    })();
  }, [projectId, id]);

  return data;
};

export default useFetchDashboardData;
