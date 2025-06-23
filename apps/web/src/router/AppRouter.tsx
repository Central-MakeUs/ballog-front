import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from '../App'
import HomePage from '@/pages/homePage'
import TestPage from '@/pages/testPage'
import TestId from '@/pages/testId'

import { PATH } from '@/constants/path'

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.HOME,
      element: <App />,
      children: [
        { path: '', element: <HomePage /> },
        { path: PATH.TEST, element: <TestPage /> },
        {
          path: 'test/:id',
          element: <TestId />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default AppRouter
