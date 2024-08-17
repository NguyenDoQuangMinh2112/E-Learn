import { memo, useEffect, useRef } from 'react'

import classNames from 'classnames/bind'
import styles from './FormGroup.module.scss'

import { FaTriangleExclamation } from 'react-icons/fa6'
import Spinner from '../Spinner/Spinner'

const cx = classNames.bind(styles)

interface FormGroupProps {
  id: string
  label?: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  error?: string
  status?: 'login' | 'register'
  isHide?: boolean
  isDisabledInputCode?: boolean
  showSendCode?: boolean
  isLoading?: boolean
}

const FormGroup: React.FC<FormGroupProps> = ({
  id,
  label,
  type = 'text',
  value,
  placeholder,
  onChange,
  onBlur,
  onClick,
  error,
  status,
  isHide = false,
  showSendCode = false,
  isDisabledInputCode,
  isLoading
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const shouldForcus = (id === 'email' && status === 'login') || (id === 'username' && status === 'register')
    if (shouldForcus) {
      inputRef.current?.focus()
    }
  }, [id, status])

  const isInvalid = error && (error.includes('Email đã được sử dụng') || error.length > 0)
  const isDisabled = id === 'code'
  const isConditional = id === 'code' && !showSendCode

  return (
    <div className={cx('form-group')}>
      {!isHide && <label htmlFor={id}>{label}</label>}
      <div className={cx('inputWrap', { invalid: isInvalid, disabled: !!isDisabledInputCode })}>
        <input
          ref={inputRef}
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={isDisabledInputCode}
        />
        {isHide && (
          <div className={cx('right-btn', { active: isConditional, disabled: !!isDisabled })} onClick={onClick}>
            {isLoading ? (
              <span>
                <Spinner color="#fff" />
              </span>
            ) : (
              <span>Gửi mã</span>
            )}
          </div>
        )}
        {error && !value && <FaTriangleExclamation className={cx('showError')} fontSize={18} />}
      </div>
      {error && <p className={cx('error')}>{error}</p>}
    </div>
  )
}

export default memo(FormGroup)
