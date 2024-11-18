import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'

import { useSelector } from 'react-redux'
import { authSelector } from './redux/auth/authSelectors'
import { useDispatch } from 'react-redux'
import { showPopup } from './redux/popup/popupSlice'

import Home from './pages/Home/Home'
import Content from './components/Layouts/components/Content'
import SidebarContent from './components/Layouts/components/Content/SidebarContent'
import Blog from './pages/Blog/Blog'
import CourseInfoDescription from './pages/CourseInfoDescription'
import ScrollToTop from './components/ScollToTop'
import CourseDetails from './pages/CourseDetails'

import Setting from './pages/Setting/Setting'
import DetailBlog from './pages/DetailBlog/DetailBlog'
import NewPost from './pages/NewPost/NewPost'
import Profile from './pages/Profile/Profile'
import Exercise from './components/Layouts/components/Exercise/Exercise'

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
      <ToastContainer autoClose={2000} theme="colored" />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/post/:id/edit" element={<NewPost />} />
          <Route path="/my-profile" element={<Profile />} />
          <Route path="/" element={<Content />}>
            <Route path="/" element={<SidebarContent />} />

            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<DetailBlog />} />

            <Route path="/course/:id" element={<CourseInfoDescription />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/course/learning/:id" element={<CourseDetails />} />
          <Route path="/course/learning/exercise/:id" element={<Exercise />} />
        </Route>

        <Route path="/setting" element={<Setting />} />
      </Routes>
    </>
  )
}

export default App
