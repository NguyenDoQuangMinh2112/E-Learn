import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import styles from './CourseDetails.module.scss'
import classNames from 'classnames/bind'

import ReactPlayer from 'react-player'
import Button from '~/components/Button/Button'

import { FaPlus } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import ListCourseDetails from '~/components/Layouts/components/ListCourseDetails'
import CourseLearningHeader from '~/components/Layouts/components/CourseLearningHeader'
import Note from '~/components/Layouts/components/Markdown'
import { useSelector } from 'react-redux'
import { courseSelector } from '~/redux/course/courseSelector'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '~/redux/store'
import { fetchDetailCourse } from '~/redux/course/courseAction'
import { useParams } from 'react-router-dom'
import { setActiveLesson } from '~/redux/course/courseSlice'

const cx = classNames.bind(styles)
interface Note {
  time: number
  text: string
}

const CourseDetails = () => {
  const [isSidebarClosed, setIsSidebarClosed] = useState<boolean>(false)
  const playerRef = useRef<ReactPlayer>(null)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [showPopup, setShowPopup] = useState<boolean>(false)

  const { courseDetail, activeLesson } = useSelector(courseSelector)
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams()

  const handleCloseMenuLesson = () => {
    setIsSidebarClosed(true)
  }
  const handleAddNote = useCallback(() => {
    setShowPopup(true)
  }, [currentTime])

  const handleProgress = useCallback((state: { playedSeconds: number }) => {
    setCurrentTime(state.playedSeconds)
  }, [])
  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0')
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0')
    return `${minutes}:${secs}`
  }, [])

  const formattedCurrentTime = useMemo(() => formatTime(currentTime), [currentTime, formatTime])

  useEffect(() => {
    // fetchGetCourseInfoDescriptionAPI()
    dispatch(fetchDetailCourse(String(id)))
  }, [])

  useEffect(() => {
    if (courseDetail && courseDetail.chapters && courseDetail.chapters.length > 0) {
      const firstChapter = courseDetail.chapters[0]
      if (firstChapter.lessons && firstChapter.lessons.length > 0) {
        dispatch(setActiveLesson(firstChapter.lessons[0]))
      }
    }
  }, [courseDetail])
  return (
    <>
      <CourseLearningHeader />
      <div className={cx('wrapper')}>
        <div className={cx('left')}>
          {/* video */}
          <div className={cx('wrapper_video')}>
            <div className={cx('learning-center')}>
              <div className={cx('container1')}>
                <ReactPlayer
                  className={cx('react-player')}
                  controls
                  height="100%"
                  width="100%"
                  ref={playerRef}
                  onProgress={handleProgress}
                  // url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                  url={activeLesson ? activeLesson.videoUrl : 'https://www.youtube.com/watch?v=LXb3EKWsInQ'}
                />
              </div>
            </div>
          </div>
          {/* video */}
          <div className={cx('wrapper_content')}>
            <div className={cx('content_top')}>
              <header className={cx('wrapper')}>
                <h1 className={cx('heading')}>{activeLesson?.title}</h1>
                <p className={cx('updated')}>Cập nhật tháng 11 năm 2022</p>
              </header>
              <Button className={cx('add_note')} leftIcon={<FaPlus />} onClick={handleAddNote}>
                {`Thêm ghi chú tại ${formattedCurrentTime}`}
              </Button>
            </div>
            {/* introduction */}
            <div className={cx('introduction')}>
              <h2>Giới thiệu</h2>
              <div dangerouslySetInnerHTML={{ __html: activeLesson?.description! }} />

              <p>
                Đây là một khóa học tuyệt vời. Nội dung có vẻ rất kỹ lưỡng và toàn diện. Tôi thích cách tất cả các khái
                niệm và cấu hình được thể hiện rõ ràng trong GNS3. Ngoài ra còn có rất nhiều ví dụ khắc phục sự cố và
                ứng dụng trong thế giới thực. Tôi đặc biệt thích những simlets thực tế.
              </p>
            </div>
          </div>
          {showPopup && <Note setShowPopup={setShowPopup} formattedCurrentTime={formattedCurrentTime} />}
        </div>
        <div className={cx('right', { close: isSidebarClosed })}>
          <div className={cx('container')}>
            <header className={cx('headWrapper')}>
              <h1 className={cx('headWrapper_title')}>Nội dung khóa học</h1>
              <IoClose onClick={handleCloseMenuLesson} />
            </header>
            <ListCourseDetails datas={courseDetail} activeLesson={activeLesson} />
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseDetails
