import { useState } from 'react'

import classNames from 'classnames/bind'
import styles from './Login.module.scss'

import Button from '~/components/Button'

import logo from '~/assets/images/logo-black.png'

import { IoMdClose } from 'react-icons/io'
import { IoChevronBackSharp } from 'react-icons/io5'

import { useDispatch } from 'react-redux'
import { hidePopup, showPopup } from '~/redux/popup/popupSlice'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store'
import EmailLoginForm from './EmailLoginForm'
import SocialLoginButtons from './SocialLoginButtons'

const cx = classNames.bind(styles)

const Login: React.FC = () => {
  const [isEmailLogin, setIsEmailLogin] = useState<boolean>(false)
  const dispatch = useDispatch()
  const type = useSelector((state: RootState) => state.popup.type) || 'login'

  const handleClosePopup = () => dispatch(hidePopup())
  const handleBack = () => setIsEmailLogin(false)
  const handleToggleLoginType = () => dispatch(showPopup(type === 'register' ? 'login' : 'register'))

  const handleEmailLogin = () => setIsEmailLogin(true)

  return (
    <div className={cx('wrapper')}>
      <div className={cx('login-popup-container')}>
        <Button className={cx('close-popup')} onClick={handleClosePopup}>
          <IoMdClose />
        </Button>
        <header className={cx('heading-top')}>
          <a href="">
            <img src={logo} alt="E-Learn Logo" />
          </a>
          <h1 className={cx('heading-title')}>{type === 'register' ? 'Đăng ký' : 'Đăng nhập'} tài khoản E-Learn</h1>
          <p className={cx('warning')}>
            Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều người sử dụng chung sẽ bị khóa.
          </p>
          {isEmailLogin && (
            <Button leftIcon={<IoChevronBackSharp />} className={cx('back')} onClick={handleBack}>
              Quay lại
            </Button>
          )}
        </header>

        <main className={cx('main')}>
          {isEmailLogin ? (
            <EmailLoginForm type={type} />
          ) : (
            <SocialLoginButtons type={type} onEmailLogin={handleEmailLogin} />
          )}
          <p className={cx('registerOrLogin')}>
            {type === 'register' ? 'Bạn đã có tài khoản? ' : 'Bạn chưa có tài khoản? '}
            <a onClick={handleToggleLoginType}>{type === 'register' ? 'Đăng nhập' : 'Đăng ký'}</a>
          </p>
          <a className={cx('forgotPassword')} href="">
            Quên mật khẩu?
          </a>
          <p className={cx('rules')}>
            Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với
            <a href=""> điều khoản sử dụng</a> của chúng tôi.
          </p>
        </main>
      </div>
    </div>
  )
}

export default Login
