import { MainPage } from './components/MainPage';
import { NewsPage } from './components/NewsPage';
import { ProfilePage } from './components/ProfilePage';
import LoginPage from './containers/LoginPage';
import { NotFound } from './components/NotFound';

export default [
  {
    isExact: true,
    path: '/(index.html)?',
    component: MainPage,
    isNav: true,
    link: {
      isExact: true,
      to: '/',
      text: 'Main'
    }
  },
  {
    path: '/news',
    component: NewsPage,
    isNav: true,
    link: {
      text: 'News'
    }
  },
  {
    isPrivate: true,
    path: '/profile',
    component: ProfilePage,
    isNav: true,
    link: {
      text: 'Profile'
    }
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    component: NotFound,
    isNav: true,
    link: {
      to: '/azaza',
      text: 'Not found'
    }
  }
];
