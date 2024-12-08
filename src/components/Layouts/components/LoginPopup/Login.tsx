import { useCallback, useState } from 'react'

import classNames from 'classnames/bind'
import styles from './Login.module.scss'

import Button from '~/components/Button'

import logo from '~/assets/images/logo-black.png'

import { IoMdClose } from 'react-icons/io'
import { IoChevronBackSharp } from 'react-icons/io5'

import { useDispatch } from 'react-redux'
import { hidePopup, showPopup } from '~/redux/popup/popupSlice'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/redux/store'
import EmailLoginForm from './EmailLoginForm'
import SocialLoginButtons from './SocialLoginButtons'
import FormGroup from '~/components/FormGroup'
import { useForm } from '~/hooks'
import { forgotPasswordAPI, resetPasswordAPI, verifyResetTokenAPI } from '~/apis/auth'
import { toast } from 'react-toastify'

const cx = classNames.bind(styles)

const Login: React.FC = () => {
  const [isEmailLogin, setIsEmailLogin] = useState<boolean>(false)
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false)
  const [isDisabledInputCode, setIsDisabledInputCode] = useState<boolean>(true)
  const [isResetPassword, setIsResetPassword] = useState<boolean>(false)
  const [message, setMessage] = useState<{ text: string; type?: 'success' | 'error' } | null>(null)

  const dispatch = useDispatch<AppDispatch>()
  const type = useSelector((state: RootState) => state.popup.type) || 'login'

  const { values, errors, handleChange, handleBlur, isLoading, setIsLoading, setErrors } = useForm({
    emailForgot: '',
    code: '',
    newPasswordReset: '',
    confirmPasswordReset: ''
  })

  const handleClosePopup = () => dispatch(hidePopup())
  const handleBack = () => setIsEmailLogin(false)
  const handleToggleLoginType = () => {
    dispatch(showPopup(type === 'register' ? 'login' : 'register'))
    setIsForgotPassword(false)
  }

  const handleEmailLogin = () => setIsEmailLogin(true)

  const handleSendCodeForgotPassword = useCallback(async () => {
    setIsDisabledInputCode(false)

    if (values.emailForgot) {
      setIsLoading(true)

      try {
        const sendCode = await forgotPasswordAPI(values.emailForgot)
        if (sendCode.statusCode === 200) {
          setIsLoading(false)
          setMessage({ text: sendCode.message, type: 'success' })
        }
      } catch (error) {
        setIsLoading(false)
        setErrors({ ...errors, emailForgot: 'Email không tồn tại' })
      }
    }
  }, [values.emailForgot])

  const handleResetPassword = useCallback(async () => {
    if (!isResetPassword) {
      const payload = {
        email: values.emailForgot as string,
        code: values.code as string
      }

      try {
        const verifyResetCode = await verifyResetTokenAPI(payload)

        if (verifyResetCode.statusCode === 200) {
          setIsResetPassword(true)
          setMessage({ text: '' })
        } else {
          setMessage({ text: verifyResetCode.message, type: 'error' })
        }
      } catch (error: any) {
        setMessage({ text: error.response.data.message, type: 'error' })
      }
    } else {
      const payload = {
        email: values.emailForgot as string,
        newPasswordReset: values.newPasswordReset as string,
        confirmPasswordReset: values.confirmPasswordReset as string
      }

      const resetPassword = await resetPasswordAPI(payload)
      if (resetPassword.statusCode === 201) {
        setIsForgotPassword(false)
        toast.success(resetPassword.message)
      }
    }
  }, [isResetPassword, values, message])

  return (
    <div className={cx('wrapper')}>
      <div className={cx('login-popup-container')}>
        <Button className={cx('close-popup')} onClick={handleClosePopup}>
          <IoMdClose />
        </Button>
        <header className={cx('heading-top')}>
          <a href="">
            <img src={logo} alt="E-Learn Logo" loading="lazy" />
          </a>
          {isForgotPassword ? (
            <h1 style={{ color: `var(--black)` }}>Quên mật khẩu</h1>
          ) : (
            <h1 className={cx('heading-title')}>{type === 'register' ? 'Đăng ký' : 'Đăng nhập'} tài khoản E-Learn</h1>
          )}
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
          {isForgotPassword ? (
            <div className={cx('forgotPassword_form')}>
              {isResetPassword ? (
                <>
                  <FormGroup
                    id="newPasswordReset"
                    label="Mật khẩu mới"
                    placeholder="Nhập mật khẩu mới"
                    type="password"
                    value={values.newPasswordReset}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.newPasswordReset}
                  />
                  <FormGroup
                    id="confirmPasswordReset"
                    label="Nhập lại mật khẩu mới"
                    placeholder="Nhập lại mật khẩu mới"
                    type="password"
                    value={values.confirmPasswordReset}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.confirmPasswordReset}
                  />
                </>
              ) : (
                <>
                  <FormGroup
                    id="emailForgot"
                    label="Email của bạn"
                    placeholder="Email"
                    type="email"
                    value={values.emailForgot}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.emailForgot}
                  />
                  <FormGroup
                    id="code"
                    placeholder="Nhập mã xác nhận"
                    isHide={true}
                    disabled={isDisabledInputCode}
                    isDisabledInputCode={isDisabledInputCode}
                    isDisabledBtn={!values.emailForgot}
                    onClick={handleSendCodeForgotPassword}
                    textValue="Gửi mã"
                    isLoading={isLoading}
                    value={values.code}
                    onChange={handleChange}
                  />
                </>
              )}

              <p
                className={cx('noticeMessage', {
                  success: message?.type === 'success',
                  error: message?.type === 'error'
                })}
              >
                {message?.text}
              </p>
              <Button
                type="submit"
                className={cx('login-btn', { disable: !values.code })}
                onClick={handleResetPassword}
              >
                Đặt lại mật khẩu
              </Button>
            </div>
          ) : isEmailLogin ? (
            <EmailLoginForm type={type === 'login' || type === 'register' ? type : 'login'} />
          ) : (
            <SocialLoginButtons
              type={type === 'login' || type === 'register' ? type : 'login'}
              onEmailLogin={handleEmailLogin}
            />
          )}

          <p className={cx('registerOrLogin')}>
            {type === 'register' ? 'Bạn đã có tài khoản? ' : 'Bạn chưa có tài khoản? '}
            <a onClick={handleToggleLoginType}>{type === 'register' ? 'Đăng nhập' : 'Đăng ký'}</a>
          </p>
          <a className={cx('forgotPassword')} onClick={() => setIsForgotPassword(true)}>
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
