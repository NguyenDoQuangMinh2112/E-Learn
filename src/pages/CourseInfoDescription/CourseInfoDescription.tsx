import classNames from 'classnames/bind'
import styles from './CourseInfoDescription.module.scss'

import Accordion from '~/components/Layouts/components/Accordion'
import Button from '~/components/Button'

import { FaCheck } from 'react-icons/fa6'
import { GiTeacher } from 'react-icons/gi'
import { GoClockFill } from 'react-icons/go'
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
import { fetchDetailCourse } from '~/redux/course/courseAction'
import { AppDispatch } from '~/redux/store'
import { courseSelector } from '~/redux/course/courseSelector'

import { loadStripe } from '@stripe/stripe-js'
import { createPaymentSessionAPI } from '~/apis/enroll'
import Spinner from '~/components/Spinner/Spinner'

const cx = classNames.bind(styles)

const CourseInfoDescription = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { courseDetail } = useSelector(courseSelector)
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

  const { id } = useParams()

  const totalLessons = useMemo(() => {
    return courseDetail?.chapters.reduce((total, chapter) => total + chapter.lessons.length, 0)
  }, [courseDetail])

  useEffect(() => {
    dispatch(fetchDetailCourse(String(id)))
  }, [])

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
                    <li>
                      Thời lượng <strong>10 giờ 29 phút</strong>
                    </li>
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
                  Máy vi tính kết nối internet (Windows, Ubuntu hoặc MacOS)
                </li>
                <li>
                  <FaCheck />Ý thức tự học cao, trách nhiệm cao, kiên trì bền bỉ không ngại cái khó
                </li>
                <li>
                  <FaCheck />
                  Không được nóng vội, bình tĩnh học, làm bài tập sau mỗi bài học
                </li>
                <li>
                  <FaCheck />
                  Bạn không cần biết gì hơn nữa, trong khóa học tôi sẽ chỉ cho bạn những gì bạn cần phải biết
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
                      <strong>Người dạy</strong>
                    </span>
                    <span>{getLastTwoNames(String(courseDetail?.instructor_id?.fullName))}</span>
                  </li>
                  <li>
                    <span className={cx('group')}>
                      {' '}
                      <GoClockFill />
                      <strong>Thời lượng</strong>
                    </span>
                    <span>08 hr 15 mins</span>
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
                      <strong>Chứng chỉ</strong>
                    </span>
                    <span>Yes</span>
                  </li>
                </ul>
              </div>

              <div className={cx('info-button')}>
                <Button className={cx('btn-enroll', { disable: isLoading })} onClick={handleEnrollCourse}>
                  {isLoading ? <Spinner color="#fff" /> : 'Payment with Stripe'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseInfoDescription
