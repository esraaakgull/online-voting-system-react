import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Voting from '../pages/userPages/Voting';
import Applications from '../pages/userPages/Applications';
import ElectionCalendar from '../pages/ElectionCalendar';
import ElectionResults from '../pages/ElectionResults';
import AnnounceResults from '../pages/adminPages/AnnounceResults';
import VotingViewOnly from '../pages/adminPages/VotingViewOnly';
import ViewApplications from '../pages/adminPages/ViewApplications';
import EnterSchedule from '../pages/adminPages/EnterSchedule';
import SendNotification from '../pages/adminPages/SendNotification';
import AddNewsAnnouncements from '../pages/adminPages/AddNewsAnnouncements';
import Announcement from '../pages/Announcement';

export const pages = {
  
  userPages: {
    dashboard: {
      title: 'Dashboard',
      path: '/',
      element: <Dashboard />,
      icon: 'fa-home'
    },
    voting: {
      title: 'Voting',
      path: '/voting',
      element: <Voting />,
      icon: 'fa-person-booth'
    },
    applications: {
      title: 'Applications',
      path: '/applications',
      element: <Applications />,
      icon: 'fa-paperclip'
    },

  },
  adminPages: {
    dashboard: {
      title: 'Dashboard',
      path: '/',
      element: <Dashboard />,
      icon: 'fa-home'
    },
    voting: {
      title: 'Voting (View Only)',
      path: '/voting',
      element: <VotingViewOnly />,
      icon: 'fa-eye'
    },
    announceResults: {
      title: 'Announce Results',
      path: '/announceResults',
      element: <AnnounceResults />,
      icon: 'fa-bullhorn'
    },
    viewApplications: {
      title: 'View Applications',
      path: '/viewApplications',
      element: <ViewApplications />,
      icon: 'fa-file-pdf'
    },
    enterSchedule: {
      title: 'Enter Schedule',
      path: '/enterSchedule',
      element: <EnterSchedule />,
      icon: 'fa-calendar'
    },
    addNews: {
      title: 'Add News-Announcement',
      path: '/addNewsAnnouncement',
      element: <AddNewsAnnouncements />,
      icon: 'fa-pen'
    },
    sendNotification: {
      title: 'Send Notification',
      path: '/sendNotification',
      element: <SendNotification />,
      icon: 'fa-envelope'
    },

  },
  commonPages: {
    main:{
      title:'Title',
      path:'/',
    },
    login: {
      path: '/',
      element: <Login />
    },
    electionCalendar: {
      path: '/electionCalendar',
      element: <ElectionCalendar />
    },
    electionResults: {
      path: '/electionResults',
      element: <ElectionResults />
    },
    announcement: {
      path: '/announcements/:id',
      element: <Announcement />
    }
  }
};
