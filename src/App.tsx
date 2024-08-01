import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home/Home'
import Content from './components/Layouts/components/Content'
import SidebarContent from './components/Layouts/components/Content/SidebarContent'
import Blog from './pages/Blog/Blog'
import CourseInfoDescription from './pages/CourseInfoDescription'
import ScrollToTop from './components/ScollToTop'
import CourseDetails from './pages/CourseDetails'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Content />}>
            <Route path="/" element={<SidebarContent />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/course/title" element={<CourseInfoDescription />} />
          </Route>
        </Route>
        <Route path="/learning/title" element={<CourseDetails />} />
      </Routes>
    </>
  )
}

export default App
