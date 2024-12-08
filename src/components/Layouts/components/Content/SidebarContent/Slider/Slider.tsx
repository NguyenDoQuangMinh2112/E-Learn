import classNames from 'classnames/bind'
import styles from './Slider.module.scss'

import Slider from 'react-slick'
import { NextArrow, PrevArrow } from '~/components/CustomArrow/CustomArrow'

const cx = classNames.bind(styles)

const CustomSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  }
  return (
    <div className={cx('wrapper')}>
      <Slider {...settings}>
        <div>
          <img
            className={cx('slider-img')}
            src="https://static.vecteezy.com/system/resources/previews/002/294/829/non_2x/programming-language-training-web-banner-free-vector.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            className={cx('slider-img')}
            src="https://static.vecteezy.com/system/resources/previews/002/294/878/non_2x/learning-and-education-web-banner-design-free-vector.jpg"
            alt="logo"
          />
        </div>
        <div>
          <img
            className={cx('slider-img')}
            src="https://static.vecteezy.com/system/resources/previews/002/294/877/non_2x/education-knowledge-concept-web-banner-design-student-study-on-stack-of-books-with-trophy-and-graduation-roll-online-education-digital-classroom-e-learning-concept-header-or-footer-banner-free-vector.jpg"
            alt=""
          />
        </div>
      </Slider>
    </div>
  )
}

export default CustomSlider
