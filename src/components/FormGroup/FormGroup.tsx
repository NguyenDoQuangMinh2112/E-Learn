import { memo, useEffect, useRef } from 'react'

import classNames from 'classnames/bind'
import styles from './FormGroup.module.scss'

import { FaTriangleExclamation } from 'react-icons/fa6'

const cx = classNames.bind(styles)

interface FormGroupProps {
  id: string
  label: string
  type?: string
  placeholder: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: boolean
  status?: 'login' | 'register'
}

const FormGroup: React.FC<FormGroupProps> = ({
  id,
  label,
  type = 'text',
  value,
  placeholder,
  onChange,
  onBlur,
  error,
  status
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const shouldForcus = (id === 'email' && status === 'login') || (id === 'username' && status === 'register')
    if (shouldForcus) {
      inputRef.current?.focus()
    }
  }, [id, status])
  return (
    <div className={cx('form-group')}>
      <label htmlFor={id}>{label}</label>
      <div className={cx('inputWrap', { invalid: error && !value })}>
        <input
          ref={inputRef}
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {error && !value && <FaTriangleExclamation fontSize={18} />}
      </div>
      {error && <p className={cx('error')}>Trường này không được để trống</p>}
    </div>
  )
}

export default memo(FormGroup)
