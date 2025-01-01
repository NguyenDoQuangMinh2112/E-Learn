import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import styles from './CourseDetails.module.scss'
import classNames from 'classnames/bind'

import ReactPlayer from 'react-player'
import moment from 'moment'

import Button from '~/components/Button/Button'
import CourseLearningHeader from '~/components/Layouts/components/CourseLearningHeader'
import Note from '~/components/Layouts/components/Markdown'
import Exercise from '~/components/Layouts/components/Exercise/Exercise'
import ListCourseDetails from '~/components/Layouts/components/ListCourseDetails'

import { FiPlus } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
import { FaComments } from 'react-icons/fa6'

import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { getDetailLessonAPI } from '~/apis/lesson'

import { Lesson } from '~/interfaces/lesson'
import { useSelector } from 'react-redux'
import { courseSelector } from '~/redux/course/courseSelector'
import { noteLessonSelector } from '~/redux/noteLesson/noteLesson.selector'
import MetaData from '~/components/MetaData'
import { checkUserEnrollAPI } from '~/apis/enroll'
import Spinner from '~/components/Spinner/Spinner'
import ChatBoxAI from '~/components/Layouts/components/ChatboxAI/ChatBoxAI'

const cx = classNames.bind(styles)
interface Note {
  time: number
  text: string
}

const CourseDetails = () => {
  const playerRef = useRef<ReactPlayer>(null)
  const { chapters } = useSelector(courseSelector)
  const { selectedTime } = useSelector(noteLessonSelector)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { id } = useParams()

  const [isSidebarClosed, setIsSidebarClosed] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [detailLesson, setDetailLesson] = useState<Lesson | null>(null)
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false)

  const endCodedId = atob(String(searchParams.get('id')))

  const handleCloseMenuLesson = () => {
    setIsSidebarClosed(true)
  }
  const handleAddNote = useCallback(() => {
    setIsPaused(true)
    setShowPopup(true)
  }, [currentTime])

  const handleClosePopup = useCallback(() => {
    setShowPopup(false)
    setIsPaused(false)
  }, [])

  const handleCancelPopup = () => {
    setShowPopup(false)
    setIsPaused(false)
  }

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

  const fetchLessonDetails = async () => {
    const res = await getDetailLessonAPI(endCodedId)
    if (res.statusCode === 200) {
      setDetailLesson(res.data)
    }
  }

  // useEffect(() => {
  //   const checkEnrollment = async () => {
  //     const response = await checkUserEnrollAPI(String(id))

  //     if (!response) {
  //       navigate('/')
  //     } else {
  //       setIsEnrolled(true)
  //     }
  //   }

  //   checkEnrollment()
  // }, [id, navigate])

  useEffect(() => {
    if (searchParams.get('type') === 'lesson') {
      fetchLessonDetails()
    }
  }, [endCodedId])

  useEffect(() => {
    if (!searchParams.get('id') && chapters && chapters?.length > 0) {
      const firstLesson = chapters[0]?.lessons?.[0]
      if (firstLesson) {
        const defaultId = btoa(firstLesson._id)
        navigate(`/course/learning/66b2111e02402496c308a935?id=${defaultId}&type=lesson`)
      }
    }
  }, [searchParams, chapters])

  useEffect(() => {
    if (selectedTime !== null && playerRef.current) {
      playerRef.current.seekTo(selectedTime)
    }
  }, [selectedTime])

  // if (!isEnrolled) {
  //   return (
  //     <div style={{ height: '100vh' }} className={cx('isCenter')}>
  //       <Spinner />
  //     </div>
  //   )
  // }

  return (
    <>
      <MetaData title={String(detailLesson?.title)} />
      <CourseLearningHeader />
      <div className={cx('wrapper')}>
        <div className={cx('left')}>
          {/* video */}
          {searchParams.get('type') === 'exercises' ? (
            <Exercise />
          ) : (
            <>
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
                      playing={!isPaused}
                      url={detailLesson?.videoUrl}
                    />
                  </div>
                </div>
              </div>
              {/* video */}
              <div className={cx('wrapper_content')}>
                <div className={cx('content_top')}>
                  <header className={cx('wrapper')}>
                    <h1 className={cx('heading')}>{detailLesson?.title}</h1>
                    <p className={cx('updated')}>
                      Updated in month {moment(detailLesson?.createdAt).format('MM')} on {''}
                      {moment(detailLesson?.createdAt).format('DD')} year {''}
                      {moment(detailLesson?.createdAt).format('YYYY')}
                    </p>
                  </header>
                  <Button className={cx('add_note')} leftIcon={<FiPlus />} onClick={handleAddNote}>
                    <span style={{ fontWeight: 400 }}>
                      Add a note at
                      <span style={{ fontWeight: '600' }}> {formattedCurrentTime}</span>
                    </span>
                  </Button>
                </div>
                {/* introduction */}
                <div className={cx('introduction')}>
                  <h2>More Information About the Lesson</h2>
                  <div dangerouslySetInnerHTML={{ __html: detailLesson?.description! }} />
                </div>
              </div>
            </>
          )}
          {showPopup && (
            <Note
              setShowPopup={setShowPopup}
              formattedCurrentTime={formattedCurrentTime}
              onClose={handleClosePopup}
              onCancel={handleCancelPopup}
              chapter_id={String(detailLesson?.chapter_id)}
              lesson_id={String(detailLesson?._id)}
            />
          )}
        </div>
        <div className={cx('right', { close: isSidebarClosed })}>
          <div className={cx('container')}>
            <header className={cx('headWrapper')}>
              <h1 className={cx('headWrapper_title')}>Course Content</h1>
              <IoClose onClick={handleCloseMenuLesson} />
            </header>
            <ListCourseDetails />
          </div>
        </div>
      </div>

      <ChatBoxAI />
    </>
  )
}

export default CourseDetails
