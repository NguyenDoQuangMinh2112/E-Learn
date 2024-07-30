import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Content from './components/Layouts/components/Content'
import SidebarContent from './components/Layouts/components/Content/SidebarContent'
import Blog from './pages/Blog/Blog'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Content />}>
            <Route path="/" element={<SidebarContent />} />
            <Route path="/blog" element={<Blog />} />
            {/* <Route path="/course/c" element={<CourseDescription />} /> */}
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
