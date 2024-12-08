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
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi molestias rerum ex optio dignissimos laborum
            tempora nesciunt delectus provident velit dolores sint beatae, ipsam, quidem, blanditiis corporis iusto
            placeat? Explicabo facere, rerum inventore, perferendis nobis aperiam illo natus doloribus itaque earum non
            cupiditate ut dolorum fuga ratione at dolore aliquid. Officia itaque vero natus aspernatur, nesciunt ipsum
            accusantium facilis ea consectetur aperiam voluptas exercitationem sunt ullam quasi saepe possimus.
            Blanditiis maxime vitae nobis qui eaque quos voluptatibus maiores at quaerat, omnis perspiciatis neque
            suscipit unde eius. Nihil harum cumque minus reprehenderit cum amet. Inventore deserunt cumque, ullam optio
            iusto mollitia accusamus sed sunt reiciendis illum nam ratione tempore? Voluptate ipsam voluptatem eligendi
            doloribus est ea eveniet minima magnam labore dolore nulla nesciunt non quisquam incidunt, et consectetur,
            odio accusantium eaque quibusdam quis consequatur. Maiores aliquam et, obcaecati, consequuntur ut quod
            voluptatum illo ad architecto assumenda ea officia. Minus, laborum velit.
          </p>

          <div className={cx('contact__info')}>
            <h2 className={cx('title')}>Contact Information</h2>
            <p>
              <span>Phone:</span> +1 234 567 8900
            </p>
            <p>
              <span>Email:</span> info@example.com
            </p>
            <p>
              <span>Address:</span> 123 Main St, Anytown, USA
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
