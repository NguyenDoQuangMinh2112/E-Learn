import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import Home from './pages/Home/Home'
import Content from './components/Layouts/components/Content'
import SidebarContent from './components/Layouts/components/Content/SidebarContent'
import Blog from './pages/Blog/Blog'
import CourseInfoDescription from './pages/CourseInfoDescription'
import ScrollToTop from './components/ScollToTop'
import CourseDetails from './pages/CourseDetails'
import { useSelector } from 'react-redux'
import { authSelector } from './redux/auth/authSelectors'
import { useDispatch } from 'react-redux'
import { showPopup } from './redux/popup/popupSlice'
import Setting from './pages/Setting/Setting'
import DetailBlog from './pages/DetailBlog/DetailBlog'
import NewPost from './pages/NewPost/NewPost'

const ProtectedRoute = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(authSelector)
  if (!userInfo) {
    dispatch(showPopup('login'))
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

// const UnAuthorizedRoute = () => {
//   const { userInfo } = useSelector(authSelector)
//   if (userInfo) {
//     return <Navigate to="/" />
//   }
//   return <Outlet />
// }

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/" element={<Content />}>
            <Route path="/" element={<SidebarContent />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/123" element={<DetailBlog />} />
            </Route>
            <Route path="/course/:id" element={<CourseInfoDescription />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/learning/title" element={<CourseDetails />} />
        </Route>

        <Route path="/setting" element={<Setting />} />
      </Routes>
    </>
  )
}

export default App
