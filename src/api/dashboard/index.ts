import { IDashboard, IDashBoardDailyScrum } from '../../types';
import { http } from '../dailyScrum/dailyScrum';

export const getDashBoardData = (projectId: string, userId: string): Promise<IDashboard[]> => {
  return http.get(`/${projectId}/dashboards`, {
    params: {
      userId
    }
  });
};

export const getDashBoardDailyScrumsByUser = (
  projectId: string,
  userId: string
): Promise<IDashBoardDailyScrum[]> => {
  return http.get(`/${projectId}/dashboards/dailyScrums`, {
    params: {
      userId
    }
  });
};
