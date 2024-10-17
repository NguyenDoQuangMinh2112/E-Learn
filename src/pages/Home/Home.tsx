import { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './Home.module.scss'

import { Outlet, useLocation } from 'react-router-dom'

import Header from '~/components/Layouts/components/Header'
import Footer from '~/components/Layouts/components/Footer'
import Login from '~/components/Layouts/components/LoginPopup'

import { useSelector } from 'react-redux'
import { popupSelector } from '~/redux/popup/popup.selector'
import MetaData from '~/components/MetaData'
import { getDetailCourseAPI } from '~/apis/course'
const cx = classNames.bind(styles)

const Home = () => {
  const location = useLocation()
  const { isOpenPopup, type } = useSelector(popupSelector)

  const showFooter = location.pathname !== '/learning/title'
  const isBlogPage = location.pathname === '/new-post'
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

  useEffect(() => {
    const fetchApiTest = async () => {
      const res = await getDetailCourseAPI('66b2111e02402496c308a935')
    }
    fetchApiTest()
  }, [])

  return (
    <>
      <MetaData title="E-Lean" />
      {(isOpenPopup && type === 'login') || type === 'register' ? <Login /> : <></>}
      <Header isHideSearch={isBlogPage} isHidePostBtn={isBlogPage} />
      <div className={cx('wrapper')}>
        <Outlet />
      </div>
      {showFooter && <Footer />}
    </>
  )
}

export default Home
