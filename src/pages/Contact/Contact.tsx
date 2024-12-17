import classNames from 'classnames/bind'
import styles from './Contact.module.scss'

import img1 from '~/assets/images/value-prop-get-rewarded-v3.webp'
import img2 from '~/assets/images/value-prop-inspire-v3.webp'
import img3 from '~/assets/images/value-prop-teach-v3.webp'

const cx = classNames.bind(styles)

const Contact = () => {
  return (
    <div className={cx('wrapper')}>
      <h2>Teach - On - Elearn</h2>

      <div className={cx('reason')}>
        <h2 className={cx('reason__title')}>So many reasons to start</h2>
        <div className={cx('reason__list')}>
          <div className={cx('reason__item')}>
            <div className={cx('reason__img')}>
              <img src={img2} alt="Image 1" />
            </div>
            <h3>Teach your way</h3>
            <p className={cx('des')}>
              Publish the course you want, in the way you want, and always have control of your own content.
            </p>
          </div>
          <div className={cx('reason__item')}>
            <div className={cx('reason__img')}>
              <img src={img3} alt="Image 1" />
            </div>
            <h3>Teach your way</h3>
            <p className={cx('des')}>
              Publish the course you want, in the way you want, and always have control of your own content.
            </p>
          </div>
          <div className={cx('reason__item')}>
            <div className={cx('reason__img')}>
              <img src={img1} alt="Image 1" />
            </div>
            <h3>Teach your way</h3>
            <p className={cx('des')}>
              Publish the course you want, in the way you want, and always have control of your own content.
            </p>
          </div>
        </div>
      </div>

      {/* contact */}

      <div className={cx('contact')}>
        <h2 className={cx('title')}>Become an instructor today</h2>
        <div className={cx('content')}>
          <p className={cx('des')}>
            Would you like to become an instructor on our website? It's easy! Simply send us an email with information
            about your teaching experience, the subjects you'd like to teach, and why you want to join our platform as
            an instructor.
          </p>
          <h3 style={{ marginTop: '10px' }}>Steps to become an instructor:</h3>
          <ul style={{ paddingLeft: '10px', marginTop: '10px' }}>
            <li>1. Send an email to nguyendoquangminh2112@gmail.com.</li>
            <li>2. Provide information about the field you'd like to teach and your relevant skills or knowledge.</li>
            <li>3. Attach any documents or records that can prove your teaching experience.</li>
          </ul>

          <span>We will review your request and contact you as soon as possible.</span>
        </div>
      </div>
    </div>
  )
}

export default Contact
