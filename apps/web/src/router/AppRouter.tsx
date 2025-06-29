import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from '../App'
import HomePage from '@/pages/homePage'
import LiveRecordPage from '@/pages/liveRecordPage'
import LoginPage from '@/pages/login/loginPage'
import TeamSelectPage from '@/pages/login/teamSelectPage'

import { PATH } from '@/constants/path'

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.HOME,
      element: <App />,
      children: [
        { path: '', element: <HomePage /> },
        { path: PATH.LIVE_RECORD, element: <LiveRecordPage /> },
        { path: PATH.LOGIN, element: <LoginPage /> },
        { path: PATH.TEAM_SELECT, element: <TeamSelectPage /> },
        // {
        //   path: 'test/:id',
        //   element: <TestId />,
        // },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default AppRouter
