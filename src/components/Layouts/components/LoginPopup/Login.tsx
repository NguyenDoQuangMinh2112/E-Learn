import { useState } from 'react'

import classNames from 'classnames/bind'
import styles from './Login.module.scss'

import Button from '~/components/Button'

import userIcon from '~/assets/images/user.svg'
import googleIcon from '~/assets/images/google.svg'
import facebookIcon from '~/assets/images/facebook.svg'
import githubIcon from '~/assets/images/github.svg'
import logo from '~/assets/images/logo-black.png'

import { IoMdClose } from 'react-icons/io'
import { IoChevronBackSharp } from 'react-icons/io5'

import { useDispatch } from 'react-redux'
import { hidePopup, showPopup } from '~/redux/popup/popupSlice'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store'

const cx = classNames.bind(styles)

const Login = () => {
  const [isEmailLogin, setIsEmailLogin] = useState<boolean>(false)

  const dispatch = useDispatch()
  const { type } = useSelector((state: RootState) => state.popup)

  return (
    <div className={cx('wrapper')}>
      <div className={cx('login-popup-container')}>
        <Button className={cx('close-popup')} onClick={() => dispatch(hidePopup())}>
          <IoMdClose />
        </Button>
        <header className={cx('heading-top')}>
          <a href="">
            {' '}
            <img src={logo} alt="" />
          </a>
          <h1 className={cx('heading-title')}>{type === 'register' ? 'Đăng ký' : 'Đăng nhập'} tài khoản E-Learn</h1>
          <p className={cx('warning')}>
            Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều người sử dụng chung sẽ bị khóa.
          </p>
          {isEmailLogin && (
            <Button leftIcon={<IoChevronBackSharp />} className={cx('back')} onClick={() => setIsEmailLogin(false)}>
              Quay lại
            </Button>
          )}
        </header>

        <main className={cx('main')}>
          {isEmailLogin ? (
            <div className={cx('content')}>
              {type === 'register' ? (
                <>
                  <div className={cx('form-group')}>
                    <label htmlFor="username">Tên của bạn?</label>
                    <div className={cx('inputWrap')}>
                      <input type="text" id="username" placeholder="Họ và tên của bạn" />
                    </div>
                  </div>
                  <div className={cx('form-group')}>
                    <label htmlFor="username">Email của bạn</label>
                    <div className={cx('inputWrap')}>
                      <input type="email" id="email" placeholder="Email của bạn" />
                    </div>
                  </div>
                  <div className={cx('form-group')}>
                    <label htmlFor="password">Mật khẩu</label>
                    <div className={cx('inputWrap')}>
                      <input type="password" id="password" placeholder="Mật khẩu" />
                    </div>
                  </div>
                  <Button className={cx('login-btn')}>Đăng ký</Button>
                </>
              ) : (
                <>
                  <div className={cx('form-group')}>
                    <label htmlFor="username">Tên đăng nhập</label>
                    <div className={cx('inputWrap')}>
                      <input type="text" id="username" placeholder="Tài khoản email của bạn" />
                    </div>
                  </div>
                  <div className={cx('form-group')}>
                    <label htmlFor="password">Mật khẩu</label>
                    <div className={cx('inputWrap')}>
                      <input type="password" id="password" placeholder="Mật khẩu" />
                    </div>
                  </div>
                  <div className={cx('remember')}>
                    <input type="checkbox" id="remember" defaultChecked />
                    <label htmlFor="remember">Ghi nhớ đăng nhập</label>
                  </div>
                  <Button className={cx('login-btn')}>Đăng nhập</Button>
                </>
              )}
            </div>
          ) : (
            <div className={cx('content')}>
              <Button
                className={cx('btnPopupLogin')}
                classNameTitle={cx('text')}
                svgIcon={userIcon}
                onClick={() => setIsEmailLogin(true)}
              >
                Sử dụng tài khoản Email
              </Button>
              <Button to="/" className={cx('btnPopupLogin')} classNameTitle={cx('text')} svgIcon={googleIcon}>
                {type === 'register' ? 'Đăng ký' : 'Đăng nhập'} với Google
              </Button>
              <Button to="/" className={cx('btnPopupLogin')} classNameTitle={cx('text')} svgIcon={facebookIcon}>
                {type === 'register' ? 'Đăng ký' : 'Đăng nhập'} với Facebook
              </Button>
              <Button to="/" className={cx('btnPopupLogin')} classNameTitle={cx('text')} svgIcon={githubIcon}>
                {type === 'register' ? 'Đăng ký' : 'Đăng nhập'} với Github
              </Button>
            </div>
          )}
          <p className={cx('registerOrLogin')}>
            {type === 'register' ? 'Bạn đã có tài khoản?' : 'Bạn chưa có tài khoản?'}
            <a onClick={() => dispatch(showPopup(type === 'register' ? 'login' : 'register'))}>
              {' '}
              {type === 'register' ? 'Đăng nhập' : 'Đăng ký'}
            </a>
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
