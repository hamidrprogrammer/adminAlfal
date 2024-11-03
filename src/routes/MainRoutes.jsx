import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));
const UserTable = Loadable(lazy(() => import('views/dashboard/users')));
const QuizManagementTable = Loadable(lazy(() => import('views/dashboard/quiz')));

const FeedbackTable = Loadable(lazy(() => import('views/dashboard/feedbacks')));


// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        },
        {
          path: 'users',
          element: <UserTable />
        }
        ,
        {
          path: 'quizManagement',
          element: <QuizManagementTable />
        }
        ,
        {
          path: 'feedbacks',
          element: <FeedbackTable />
        }
        
        
      ]
    }
    
   
  ]
};

export default MainRoutes;
