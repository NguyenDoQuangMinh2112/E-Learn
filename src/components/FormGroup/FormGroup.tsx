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
}

const FormGroup: React.FC<FormGroupProps> = ({
  id,
  label,
  type = 'text',
  value,
  placeholder,
  onChange,
  onBlur,
  error
}) => (
  <div className={cx('form-group')}>
    <label htmlFor={id}>{label}</label>
    <div className={cx('inputWrap', { invalid: error && !value })}>
      <input type={type} id={id} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} />
      {error && !value && <FaTriangleExclamation fontSize={18} />}
    </div>
    {error && !value && <p className={cx('error')}>Trường này không được để trống</p>}
  </div>
)

export default FormGroup
