// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/dashboard/users',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
    ,
    {
      id: 'quizManagement',
      title: 'Quiz Management',
      type: 'item',
      url: '/dashboard/quizManagement',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }

    ,
    {
      id: 'feedbacks',
      title: 'Feedback and Support',
      type: 'item',
      url: '/dashboard/feedbacks',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
    
  
  ]
};

export default dashboard;
