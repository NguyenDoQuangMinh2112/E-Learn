import classNames from 'classnames/bind'
import styles from './DetailBlog.module.scss'

import { FaRegHeart } from 'react-icons/fa'
import { FaRegComment } from 'react-icons/fa'
import ActionButton from '~/components/ActionButton/ActionButton'
import MetaData from '~/components/MetaData'

const cx = classNames.bind(styles)

const DetailBlog = () => {
  return (
    <>
      <MetaData title='Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án "AI Powered Learning"' />
      <div className={cx('wrapper')}>
        <div className={cx('container-fluid')}>
          <div className={cx('row')}>
            <div className={cx('col col-2 col-xxxl-3 col-xxl-2 d-lg-none offset-1 offset-xxxl-0 offset-xxl-0')}>
              <div className={cx('aside')}>
                <h4>Quang Minh</h4>
                <p className={cx('des')}>Stop thinking, start doing!</p>
                <hr />
                <div className={cx('actions')}>
                  <div className={cx('btnReact')}>
                    <FaRegHeart size={20} />
                    <span>5</span>
                  </div>
                  <div className={cx('btnReact')}>
                    <FaRegComment size={20} />
                    <span>5</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('col col-6')}>
              <article>
                <h1 className={cx('heading')}>
                  Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án "AI Powered Learning"
                </h1>
                <div className={cx('header')}>
                  <div className={cx('user')}>
                    <div style={{ fontSize: '5.6px' }}>
                      <img src="https://files.fullstack.edu.vn/f8-prod/public-images/6676511103ac3.png" alt="" />
                    </div>
                    <div className={cx('info')}>
                      <h4>Quang Minh</h4>
                      <p className={cx('time')}>
                        7 ngày trước <span className={cx('dot')}>.</span> 6 phút đọc
                      </p>
                    </div>
                  </div>
                  <div className={cx('wrp')}>
                    <ActionButton />
                  </div>
                </div>
                <div className={cx('box')}></div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailBlog
