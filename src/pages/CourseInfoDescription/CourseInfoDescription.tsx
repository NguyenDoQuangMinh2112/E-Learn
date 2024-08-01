import classNames from 'classnames/bind'
import styles from './CourseInfoDescription.module.scss'

import Accordion from '~/components/Layouts/components/Accordion'
import Button from '~/components/Button'

import { FaCheck } from 'react-icons/fa6'
import { GiTeacher } from 'react-icons/gi'
import { GoClockFill } from 'react-icons/go'
import { PiVideoLight } from 'react-icons/pi'
import { GrCertificate } from 'react-icons/gr'
import { IoMdCode } from 'react-icons/io'
import { formatPrice } from '~/utils/helper'

const cx = classNames.bind(styles)

const CourseInfoDescription = () => {
  return (
    <div className={cx('wrapper', 'container')}>
      <div className={cx('row')}>
        <article className={cx('col', 'col-9')}>
          <div className={cx('content')}>
            <div>
              {' '}
              <h1>Lập Trình JavaScript Cơ Bản</h1>
              <div className={cx('text-content')}>
                Học Javascript cơ bản phù hợp cho người chưa từng học lập trình. Với hơn 100 bài học và có bài tập thực
                hành sau mỗi bài học.
              </div>
            </div>
            <div className={cx('topic_list')}>
              <h2 className={cx('topic_heading')}>Bạn sẽ học được gì?</h2>
              <ul className={cx('list')}>
                <li>
                  <FaCheck />
                  Hiểu chi tiết về các khái niệm cơ bản trong JS
                </li>
                <li>
                  <FaCheck />
                  Tự tin khi phỏng vấn với kiến thức vững chắc
                </li>
                <li>
                  <FaCheck />
                  Nắm chắc các tính năng trong phiên bản ES6
                </li>
                <li>
                  <FaCheck />
                  Ghi nhớ các khái niệm nhờ bài tập trắc nghiệm
                </li>
                <li>
                  <FaCheck />
                  Các bài thực hành như Tabs, Music Player
                </li>
                <li>
                  <FaCheck />
                  Xây dựng được website đầu tiên kết hợp với JS
                </li>
                <li>
                  <FaCheck />
                  Có nền tảng để học các thư viện và framework JS
                </li>
                <li>
                  <FaCheck />
                  Thành thạo DOM APIs để tương tác với trang web
                </li>
                <li>
                  <FaCheck />
                  Nâng cao tư duy với các bài kiểm tra với testcases
                </li>
                <li>
                  <FaCheck />
                  Nhận chứng chỉ khóa học do F8 cấp
                </li>
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
          <Accordion />
          <Accordion />
          <Accordion />

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

        <div className={cx('col', 'col-3')}>
          <div className={cx('sidebar-widget')}>
            <div className={cx('info-price')}>
              <span className={cx('price')}>{`${formatPrice(1200000)} đ`} </span>
            </div>
            <div className={cx('info-list')}>
              <ul>
                <li>
                  <span className={cx('group')}>
                    <GiTeacher />
                    <strong>Người dạy</strong>
                  </span>
                  <span>Quang Minh</span>
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
                  <span>29</span>
                </li>
                <li>
                  <span className={cx('group')}>
                    <IoMdCode />
                    <strong>Ngôn ngữ</strong>
                  </span>
                  <span>Javascript</span>
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
              <Button className={cx('btn-enroll')} to="/learning/title">
                Mua khóa học
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseInfoDescription
