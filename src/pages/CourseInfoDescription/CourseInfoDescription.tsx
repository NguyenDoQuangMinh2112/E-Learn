import classNames from 'classnames/bind'
import styles from './CourseInfoDescription.module.scss'

import Accordion from '~/components/Layouts/components/Accordion'
import Button from '~/components/Button'

import { FaCheck } from 'react-icons/fa6'
import { GiTeacher } from 'react-icons/gi'
import { PiVideoLight } from 'react-icons/pi'
import { GrCertificate } from 'react-icons/gr'
import { formatPrice, getLastTwoNames } from '~/utils/helper'
import { useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'

import MetaData from '~/components/MetaData'
import { useSelector } from 'react-redux'
import { authSelector } from '~/redux/auth/authSelectors'
import { useDispatch } from 'react-redux'
import { showPopup } from '~/redux/popup/popupSlice'
import { fetchCourses, fetchDetailCourse } from '~/redux/course/courseAction'
import { AppDispatch } from '~/redux/store'
import { courseSelector } from '~/redux/course/courseSelector'

import { loadStripe } from '@stripe/stripe-js'
import { createPaymentSessionAPI } from '~/apis/enroll'
import Spinner from '~/components/Spinner/Spinner'
import { Course } from '~/interfaces/course'
import CourseItem from '~/components/Layouts/components/ListCourse/CourseItem'

const cx = classNames.bind(styles)

const CourseInfoDescription = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { courseDetail, listCourse } = useSelector(courseSelector)
  const requiredList =
    courseDetail?.required &&
    courseDetail?.required[0]
      ?.split('<p>')
      .filter((item) => item.trim() !== '')
      .map((item) => {
        return item.replace('</p>', '').trim()
      })

  const { userInfo } = useSelector(authSelector)

  const [isLoading, setIsLoading] = useState(false)
  const [recommendCourse, setRecommendCourse] = useState<any>([])

  const { id } = useParams()

  const totalLessons = useMemo(() => {
    return courseDetail?.chapters.reduce((total, chapter) => total + chapter.lessons.length, 0)
  }, [courseDetail])

  const matchedCourses = listCourse?.filter((course) =>
    recommendCourse.some((cosine: any) => cosine._id === course._id)
  )

  useEffect(() => {
    dispatch(fetchDetailCourse(String(id)))
    dispatch(fetchCourses({}))

    if (userInfo) {
      fetch('https://damp-bastion-99051-92c994c25ba2.herokuapp.com/sync_suggest')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to sync suggest')
          }
          return response.json()
        })
        .then(() => {
          return fetch('https://damp-bastion-99051-92c994c25ba2.herokuapp.com/get_suggest', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              course_id: id
            })
          })
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to get suggest')
          }
          return response.json()
        })
        .then((getSuggestData) => {
          setRecommendCourse(getSuggestData)
        })
        .catch((error) => {
          console.error('There was an error:', error)
        })
    }
  }, [id])

  const handleEnrollCourse = async () => {
    if (!userInfo) {
      dispatch(showPopup('login'))
      return
    }

    try {
      const stripe = await loadStripe(
        'pk_test_51QOy93G32ujZNpUiwFZIfOxVo8R4TKP1B8LED3PFKCpinXB4BEV1Dwt0nduUtuZmQwkb3KcTAQ9NfaSItgcbEH7S00YprpRAq5'
      )
      setIsLoading(true)
      const res = await createPaymentSessionAPI({ course: courseDetail, userId: userInfo._id })
      stripe?.redirectToCheckout({ sessionId: res.id })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <MetaData title={String(courseDetail?.title)} />
      <div className={cx('wrapper', 'container')}>
        <div className={cx('row')}>
          <article className={cx('col col-9 col-xxxxxl-8 col-md-12')}>
            <div className={cx('content')}>
              <div>
                {' '}
                <h1>{courseDetail?.title}</h1>
                <div className={cx('text-content')}>{courseDetail?.description}</div>
              </div>
              <div className={cx('topic_list')}>
                <h2 className={cx('topic_heading')}>Bạn sẽ học được gì?</h2>
                <ul className={cx('list')}>
                  {requiredList?.map((item, index) => (
                    <li key={index}>
                      <FaCheck />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={cx('curriculumOfCourse')}>
                <div className={cx('headingTitle')}>
                  <h2>Nội dung khóa học</h2>
                </div>

                <div className={cx('subHead')}>
                  <ul>
                    <li>
                      <strong>11</strong> chương
                    </li>
                    <li className={cx('dot')}>•</li>
                    <li>
                      <strong>138</strong> bài học
                    </li>
                    <li className={cx('dot')}>•</li>
                  </ul>
                  <div className={cx('openMore')}>Mở tất cả</div> {/* (su dung redux de hanlde) */}
                </div>
              </div>
            </div>

            {/* accordion */}
            {courseDetail?.chapters?.map((chapter) => (
              <Accordion data={chapter} key={chapter._id} />
            ))}

            <div className={cx('topic_list', 'm-top-40')}>
              <h2 className={cx('topic_heading')}>Yêu cầu</h2>
              <ul className={cx('list', 'f-colunm')}>
                <li>
                  <FaCheck />
                  Computer connected to the internet (Windows, Ubuntu, or MacOS)
                </li>
                <li>
                  <FaCheck />
                  High self-learning awareness, strong sense of responsibility, persistence, and determination to
                  overcome difficulties.
                </li>
                <li>
                  <FaCheck />
                  Don't rush, study calmly, and do the exercises after each lesson.
                </li>
                <li>
                  <FaCheck />
                  You don't need to know anything more; in this course, I will show you what you need to know.
                </li>
              </ul>
            </div>
          </article>

          <div className={cx('col col-3 col-xxxxxl-4 ')}>
            <div className={cx('sidebar-widget')}>
              <div className={cx('info-price')}>
                <span className={cx('price')}>{`${formatPrice(Number(courseDetail?.price))} đ`} </span>
              </div>
              <div className={cx('info-list')}>
                <ul>
                  <li>
                    <span className={cx('group')}>
                      <GiTeacher />
                      <strong>Instructor</strong>
                    </span>
                    <span>{getLastTwoNames(String(courseDetail?.instructor_id?.fullName))}</span>
                  </li>

                  <li>
                    <span className={cx('group')}>
                      {' '}
                      <PiVideoLight />
                      <strong> Bài giảng</strong>
                    </span>
                    <span>{totalLessons}</span>
                  </li>

                  <li>
                    <span className={cx('group')}>
                      <GrCertificate />
                      <strong>Certificate</strong>
                    </span>
                    <span>Yes</span>
                  </li>
                </ul>
              </div>

              <div className={cx('info-button')}>
                <Button className={cx('btn-enroll', { disable: isLoading })} onClick={handleEnrollCourse}>
                  {isLoading ? <Spinner color="#fff" /> : 'Checkout'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {userInfo && (
          <div className={cx('courseRecommend')}>
            <h2>Các khóa học liên quan</h2>

            <div
              className={cx(
                'row row-cols-6 row-cols-xxxxxl-5 row-cols-xxxxl-4 row-cols-xl-3 row-cols-lg-2 gy-6 gx-xxl-2 gx-xl-3 gx-lg-2'
              )}
            >
              {matchedCourses && matchedCourses?.length > 0 ? (
                matchedCourses?.slice(0, 4)?.map((course: Course) => <CourseItem data={course} key={course._id} />)
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CourseInfoDescription
