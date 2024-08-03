import { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Login.module.scss'

import FormGroup from '~/components/FormGroup'
import Button from '~/components/Button'
import PasswordStrengthBar from './PasswordStrengthBar'

const cx = classNames.bind(styles)

interface EmailLoginForm {
  type: 'login' | 'register'
}

const EmailLoginForm: React.FC<{ type: 'login' | 'register' }> = ({ type }: EmailLoginForm) => {
  // Login form
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [fullName, setFullName] = useState<string>('')
  const [emailError, setEmailError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [fullNameError, setFullNameError] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email.length > 0 && password.length > 0) {
      console.log({ email, password })
    }
  }

  const handleEmailBlur = () => {
    setEmailError(email.trim() === '')
  }

  const handlePasswordBlur = () => {
    setPasswordError(password.trim() === '')
  }
  const handleFullNameBlur = () => {
    setFullNameError(fullName.trim() === '')
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

  const passwordStrength = calculatePasswordStrength(password)

  return (
    <form onSubmit={handleSubmit}>
      <div className={cx('content')}>
        {type === 'register' ? (
          <>
            <FormGroup
              id="username"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={handleFullNameBlur}
              error={fullNameError}
              label="Tên của bạn?"
              placeholder="Họ và tên của bạn"
            />
            <FormGroup
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
              error={emailError}
              label="Email của bạn"
              type="email"
              placeholder="Email của bạn"
            />
            <FormGroup
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordBlur}
              error={passwordError}
              label="Mật khẩu"
              type="password"
              placeholder="Mật khẩu"
            />
            <PasswordStrengthBar strength={passwordStrength} />
            <Button
              className={cx('login-btn', `${(!email.length || !password.length || !fullName.length) && 'disable'} `)}
            >
              Đăng ký
            </Button>
          </>
        ) : (
          <>
            <FormGroup
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
              error={emailError}
              label="Tên đăng nhập"
              placeholder="Tài khoản email của bạn"
            />
            <FormGroup
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordBlur}
              error={passwordError}
              label="Mật khẩu"
              type="password"
              placeholder="Mật khẩu"
            />
            <div className={cx('remember')}>
              <input type="checkbox" id="remember" defaultChecked />
              <label htmlFor="remember">Ghi nhớ đăng nhập</label>
            </div>
            <Button type="submit" className={cx('login-btn', `${(!email.length || !password.length) && 'disable'} `)}>
              Đăng nhập
            </Button>
          </>
        )}
      </div>
    </form>
  )
}
export default EmailLoginForm
