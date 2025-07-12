import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App'

import HomePage from '@/pages/home/ui/HomePage'
import LiveRecordPage from '@/pages/home/ui/LiveRecordPage'
import LoginPage from '@/pages/auth/ui/loginPage'
import TeamSelectPage from '@/pages/auth/ui/teamSelectPage'
import NickNamePage from '@/pages/auth/ui/nickNamePage'


import { PATH } from '@/shared/constants/path'
import TeamSelectPage from '@/pages/auth/ui/TeamSelectPage'
import NickNamePage from '@/pages/auth/ui/NickNamePage'

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
        { path: PATH.NICKNAME, element: <NickNamePage /> },
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
