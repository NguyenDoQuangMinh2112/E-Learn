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
import { noteLessonSelector } from '~/redux/noteLesson/noteLesson.selector'
import { useDispatch } from 'react-redux'
import { API_ROOT } from '~/utils/constant'
import { io } from 'socket.io-client'
import { setSocket } from '~/redux/socket/socketSlice'
import { authSelector } from '~/redux/auth/authSelectors'
const cx = classNames.bind(styles)
const Home = () => {
  const location = useLocation()
  const { isOpenPopup, type } = useSelector(popupSelector)
  const { isOpenChat } = useSelector(noteLessonSelector)
  const { userInfo } = useSelector(authSelector)

  const { socket } = useSelector((state: any) => state.socket)
  const dispatch = useDispatch()

  const showFooter = location.pathname !== '/learning/title'
  const isBlogPage = location.pathname === '/new-post' || location.pathname === '/my-profile'
  const isHidePostBtn = location.pathname === '/my-profile' ? false : isBlogPage
  const isTransparentHeader = location.pathname === '/my-profile'

  useEffect(() => {
    const body = document.body
    if (isOpenPopup || isOpenChat) {
      body.style.overflow = 'hidden'
    } else {
      body.style.overflow = ''
    }

    if (isOpenPopup || isOpenChat) {
      body.classList.add('no-scroll')
    } else {
      body.classList.remove('no-scroll')
    }
  }, [isOpenPopup, isOpenChat])

  useEffect(() => {
    const socket = io(API_ROOT)
    dispatch(setSocket(socket))

    return () => {
      socket?.disconnect()
    }
  }, [])

  useEffect(() => {
    if (userInfo) {
      socket?.emit('newUser', userInfo._id)
    }
  }, [socket, userInfo?._id])

  return (
    <>
      <MetaData title="E-Lean" />
      {(isOpenPopup && type === 'login') || type === 'register' ? <Login /> : <></>}
      <Header
        isHideSearch={isBlogPage}
        isHidePostBtn={isHidePostBtn}
        isTransparentHeader={isTransparentHeader}
        isHideNotification={isBlogPage}
      />
      <div className={cx('wrapper')}>
        <Outlet />
      </div>
      {showFooter && <Footer />}
    </>
  )
}

export default Home
