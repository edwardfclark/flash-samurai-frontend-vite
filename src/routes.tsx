import { createBrowserRouter } from 'react-router-dom';
import { Root } from './pages/Root';
import { Login } from './pages/Login';
import { Groups } from './pages/Groups';
import { GroupCreate } from './pages/GroupCreate';
import { GroupUpdate } from './pages/GroupUpdate';
import { GroupQuiz } from './pages/GroupQuiz';
import { Tags } from './pages/Tags';
import { TagCreate } from './pages/TagCreate';
import { TagUpdate } from './pages/TagUpdate';
import { Cards } from './pages/Cards';
import { CardCreate } from './pages/CardCreate';
import { CardUpdate } from './pages/CardUpdate';

export const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/',
        element: <Groups />,
      },
      {
        path: '/groups/create',
        element: <GroupCreate />,
      },
      {
        path: '/groups/:groupId/edit',
        element: <GroupUpdate />,
      },

      {
        path: '/groups/:groupId/quiz',
        element: <GroupQuiz />,
      },
      {
        path: '/groups/:groupId/tags',
        element: <Tags />,
      },
      {
        path: '/groups/:groupId/tags/create',
        element: <TagCreate />,
      },
      {
        path: '/groups/:groupId/tags/:tagId/edit',
        element: <TagUpdate />,
      },
      {
        path: '/groups/:groupId/cards',
        element: <Cards />,
      },
      {
        path: '/groups/:groupId/cards/create',
        element: <CardCreate />,
      },
      {
        path: '/groups/:groupId/cards/:cardId/edit',
        element: <CardUpdate />,
      },
    ],
  },
]);
