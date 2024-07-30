import { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './Home.module.scss'

import { Outlet, useLocation } from 'react-router-dom'

import Header from '~/components/Layouts/components/Header'
import Footer from '~/components/Layouts/components/Footer'
import Login from '~/components/Layouts/components/LoginPopup/Login'

import { useSelector } from 'react-redux'
import { popupSelector } from '~/redux/popup/popup.selector'

const cx = classNames.bind(styles)

const Home = () => {
  const location = useLocation()
  const { isOpenPopup } = useSelector(popupSelector)

  const showFooter = location.pathname !== '/a'
  useEffect(() => {
    const body = document.body
    if (isOpenPopup) {
      body.style.overflow = 'hidden'
    } else {
      body.style.overflow = ''
    }

    if (isOpenPopup) {
      body.classList.add('no-scroll')
    } else {
      body.classList.remove('no-scroll')
    }
  }, [isOpenPopup])
  return (
    <>
      {isOpenPopup ? <Login /> : <></>}
      <Header />
      <div className={cx('wrapper')}>
        <Outlet />
      </div>
      {showFooter && <Footer />}
    </>
  )
}

export default Home
