import { memo, useState } from 'react'

import classNames from 'classnames/bind'
import styles from './Login.module.scss'

import FormGroup from '~/components/FormGroup'
import Button from '~/components/Button'
import PasswordStrengthBar from './PasswordStrengthBar'

import { loginAPI } from '~/apis/auth'
import { useDispatch } from 'react-redux'
import { login } from '~/redux/auth'
import { hidePopup } from '~/redux/popup/popupSlice'
import { useForm } from '~/hooks'
import Spinner from '~/components/Spinner/Spinner'

const cx = classNames.bind(styles)

interface EmailLoginForm {
  type: 'login' | 'register'
}

const EmailLoginForm: React.FC<{ type: 'login' | 'register' }> = ({ type }: EmailLoginForm) => {
  const { values, errors, handleChange, handleBlur, isLoading, setIsLoading } = useForm({
    email: '',
    password: '',
    fullName: '',
    code: ''
  })
  const [loginError, setLoginError] = useState<string | null>(null)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [isSendingCode, setIsSendingCode] = useState<boolean>(false)
  const dispatch = useDispatch()

  const isFormValid = (): boolean => {
    return type === 'register'
      ? !!values.fullName &&
          !!values.email &&
          !!values.password &&
          !!values.code &&
          Object.values(errors).every((value) => value === undefined) &&
          calculatePasswordStrength(values.password) >= 3
      : !!values.email && !!values.password
  }

  const isRegistrationFormValid = (): boolean => {
    return (
      type === 'register' &&
      !!values.fullName &&
      !!values.email &&
      !!values.password &&
      Object.values(errors).every((value) => value === undefined) &&
      calculatePasswordStrength(values.password) >= 3
    )
  }

  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    return strength
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    if (type === 'login') {
      const data = {
        email: values.email,
        password: values.password
      }
      const response = await loginAPI(data)

      if (response?.statusCode === 200) {
        setLoginError(null)
        response.accessToken && localStorage.setItem('accessToken', response.accessToken)
        response.refreshToken && localStorage.setItem('refreshToken', response.refreshToken)
        dispatch(
          login({
            isLogin: true,
            userInfo: response.data
          })
        )
        setIsLoading(false)
        dispatch(hidePopup())
      } else {
        setLoginError(String(response?.message))
      }
    }
    if (type === 'register' && isFormValid()) {
      console.log({ fullName: values.fullName, email: values.email, password: values.password })
    }
  }

  const handleSendCodeToVeryfiAccount = () => {
    setIsSendingCode(true)
    setTimeout(() => {
      // Simulate a delay for API call
      setIsDisabled(false)
      setIsSendingCode(false)
    }, 2000) // 2-second delay
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={cx('content')}>
        {type === 'register' && (
          <FormGroup
            id="fullName"
            label="Tên của bạn"
            placeholder="Họ và tên của bạn"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.fullName}
          />
        )}
        <FormGroup
          id="email"
          label="Tên đăng nhập"
          placeholder="Email của bạn"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
        />
        <FormGroup
          id="password"
          label="Mật khẩu"
          placeholder="Mật khẩu"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          type="password"
        />
        {!!loginError?.length && <p className={cx('login_mes')}>{loginError}</p>}
        {type === 'register' && <PasswordStrengthBar strength={calculatePasswordStrength(values.password)} />}

        {type === 'register' && (
          <FormGroup
            id="code"
            placeholder="Nhập mã xác nhận"
            isHide={true}
            value={values.code}
            onChange={handleChange}
            showSendCode={!isRegistrationFormValid()}
            onClick={handleSendCodeToVeryfiAccount}
            isDisabledInputCode={isDisabled}
            isLoading={isSendingCode}
          />
        )}
        {type === 'register' && !isDisabled && (
          <p className={cx('noticeVerify')}>Mã xác nhận đã gửi về email của bạn. Vui lòng kiểm tra email !</p>
        )}
        <Button type="submit" className={cx('login-btn', { disable: !isFormValid() })} disabled={!isFormValid()}>
          {isLoading ? <Spinner color="#fff" /> : type === 'register' ? 'Đăng ký' : 'Đăng nhập'}
        </Button>
      </div>
    </form>
  )
}
export default memo(EmailLoginForm)
