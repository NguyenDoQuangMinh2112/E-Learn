import { memo, useEffect, useState } from 'react'

import classNames from 'classnames/bind'
import styles from './Login.module.scss'

import FormGroup from '~/components/FormGroup'
import Button from '~/components/Button'
import PasswordStrengthBar from './PasswordStrengthBar'

import { loginAPI, registerAPI, verifyAPI } from '~/apis/auth'
import { useDispatch } from 'react-redux'
import { login } from '~/redux/auth'
import { hidePopup, showPopup } from '~/redux/popup/popupSlice'
import { useForm } from '~/hooks'
import Spinner from '~/components/Spinner/Spinner'
import { toast } from 'react-toastify'

const cx = classNames.bind(styles)

interface EmailLoginForm {
  type: 'login' | 'register' | 'verify' | 'forgotPassword' | 'blog'
}

const EmailLoginForm: React.FC<{ type: 'login' | 'register' | 'forgotPassword' }> = ({ type }: EmailLoginForm) => {
  const { values, errors, handleChange, handleBlur, isLoading, setIsLoading, setErrors } = useForm({
    email: '',
    password: '',
    fullName: '',
    code: ''
  })
  const [loginError, setLoginError] = useState<string | null>(null)
  const [isSendingCode, setIsSendingCode] = useState<boolean>(false)
  const [isShowVerifyCode, setIsShowVerifyCode] = useState<boolean>(false)
  const dispatch = useDispatch()

  const isFormValid = (): boolean => {
    return type === 'register'
      ? !!values.fullName &&
          !!values.email &&
          !!values.password &&
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
    try {
      if (type === 'login') {
        const data = {
          email: values.email as string,
          password: values.password as string
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
        setIsLoading(true)
        const res = await registerAPI({
          fullName: values.fullName as string,
          email: values.email as string,
          password: values.password as string
        })
        if (res.statusCode === 201) {
          setIsLoading(false)
          setIsShowVerifyCode(true)
        }
      } else {
        setIsLoading(false)
      }
    } catch (error: any) {
      setLoginError(error?.response?.data?.message || 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendCodeToVeryfiAccount = async () => {
    if (values.code) {
      setIsSendingCode(true)
      try {
        const res = await verifyAPI(values.code)

        if (res.statusCode === 201) {
          dispatch(showPopup('login'))
          setIsShowVerifyCode(false)
          toast.success(res.message)
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message)
      } finally {
        setIsSendingCode(false)
      }
    }
  }

  useEffect(() => {
    if (type === 'login') {
      values.email = ''
      values.password = ''
    } else {
      values.email = ''
      values.fullName = ''
      values.password = ''
    }
    setErrors({})
  }, [type])

  return (
    <form onSubmit={handleSubmit}>
      <div className={cx('content')}>
        {type === 'register' && (
          <FormGroup
            id="fullName"
            label="Full Name"
            placeholder="Enter your full name"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.fullName}
          />
        )}
        <FormGroup
          id="email"
          label="Email"
          placeholder="Your email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
        />
        <FormGroup
          id="password"
          label="Password"
          placeholder="Enter your password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          type="password"
        />
        {!!loginError?.length && <p className={cx('login_mes')}>{loginError}</p>}
        {type === 'register' && <PasswordStrengthBar strength={calculatePasswordStrength(String(values.password))} />}

        {type === 'register' && isShowVerifyCode && (
          <FormGroup
            id="code"
            placeholder="Enter the verification code."
            isHide={true}
            value={values.code}
            onChange={handleChange}
            showSendCode={!isRegistrationFormValid()}
            onClick={handleSendCodeToVeryfiAccount}
            isLoading={isSendingCode}
          />
        )}
        {type === 'register' && isShowVerifyCode && (
          <p className={cx('noticeVerify')}>
            You have successfully registered an account! Please check your email to get the verification code to verify
            your account!
          </p>
        )}
        <Button
          type="submit"
          className={cx('login-btn', { disable: !isFormValid() || isShowVerifyCode })}
          disabled={!isFormValid() || isShowVerifyCode}
        >
          {isLoading ? <Spinner color="#fff" /> : type === 'register' ? 'Register' : 'Login'}
        </Button>
      </div>
    </form>
  )
}
export default memo(EmailLoginForm)
