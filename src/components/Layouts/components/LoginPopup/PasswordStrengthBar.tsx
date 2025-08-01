import React, { memo } from 'react'
import classNames from 'classnames/bind'
import styles from './Login.module.scss'

const cx = classNames.bind(styles)

interface PasswordStrengthBarProps {
  strength: number
}

const PasswordStrengthBar: React.FC<PasswordStrengthBarProps> = ({ strength }) => {
  const getBarColor = (index: number) => {
    if (index < strength) {
      if (strength >= 4) return 'strong'
      if (strength >= 3 && strength <= 4) return 'medium'
      if (strength <= 2) return 'weak'
    }
    return 'normal'
  }

  return (
    <div className={cx('wrapper_form')}>
      <div className={cx('verify')}>
        {[...Array(4)].map((_, index) => (
          <div key={index} className={cx('bar', getBarColor(index))}></div>
        ))}
      </div>
      <p className={cx('result')}>
        {strength === 1
          ? 'Weak password'
          : strength === 2 || strength === 3
          ? 'Medium password'
          : strength === 4
          ? 'Strong password'
          : ''}
      </p>
    </div>
  )
}

export default memo(PasswordStrengthBar)
