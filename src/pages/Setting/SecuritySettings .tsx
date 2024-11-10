import { useState } from 'react'

import styles from './Setting.module.scss'
import classNames from 'classnames/bind'

import { useForm } from '~/hooks'

import Button from '~/components/Button'
import FormGroup from '~/components/FormGroup'
import Modal from '~/components/Modal/Modal'
import Spinner from '~/components/Spinner/Spinner'

import { FaChevronRight } from 'react-icons/fa'
import { resetPasswordAPI } from '~/apis/auth'
import { toast } from 'react-toastify'

const cx = classNames.bind(styles)

const SecuritySettings = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const { values, errors, setErrors, handleChange, handleBlur, isLoading, setIsLoading } = useForm({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const closeModal = () => {
    setModalOpen(false)
    setErrors({})
  }

  const handleUpdatePassword = async () => {
    const data = {
      currentPassword: values?.currentPassword as string,
      newPassword: values?.newPassword as string,
      confirmPassword: values?.confirmPassword as string
    }
    try {
      setIsLoading(true)
      const res = await resetPasswordAPI(data)
      if (res.statusCode === 201) {
        toast.success(res.message)
        setIsLoading(false)
      }
    } catch (error: any) {
      setIsLoading(false)
      toast.error(error?.response?.data?.message)
    }
  }

  const isFormValid = (): boolean => {
    return !!values.currentPassword && !!values.newPassword && !!values.confirmPassword
  }

  return (
    <>
      <Modal isOpen={isModalOpen} title={`Đổi mật khẩu`} onClose={closeModal} widthSize="small">
        <>
          <div className={cx('formGroup')}>
            <FormGroup
              id="currentPassword"
              label="Mật khẩu cũ"
              placeholder="Mật khẩu cũ"
              value={values.currentPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.currentPassword}
              type="password"
            />
            <FormGroup
              id="newPassword"
              label="Mật khẩu mới"
              placeholder="Mật khẩu mới"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.newPassword}
              type="password"
            />
            <FormGroup
              id="confirmPassword"
              label="Xác nhận khẩu mới"
              placeholder="Xác nhận khẩu mới"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.confirmPassword}
              type="password"
            />
          </div>
          <Button className={cx('saveBtn', { disable: !isFormValid() })} onClick={handleUpdatePassword}>
            {isLoading ? <Spinner /> : ' Cập nhật'}
          </Button>
        </>
      </Modal>
      <main className={cx('wrapper_info')}>
        <h1 className={cx('title')}>Mật khẩu và bảo mật</h1>
        <p className={cx('des')}>Quản lý mật khẩu và cài đặt bảo mật.</p>

        <div className={cx('inner')}>
          <div className={cx('info_content')}>
            <div className={cx('info_details')} onClick={() => setModalOpen(true)}>
              <div className={cx('wrapper1')}>
                <h4>Đổi mật khẩu</h4>
                <span>Chưa đổi mật khẩu</span>
              </div>
              <button className={cx('right_btn')}>
                <FaChevronRight />
              </button>
            </div>
            <div className={cx('info_details')} data-label="off">
              <div className={cx('wrapper1')}>
                <h4>Xác minh 2 bước</h4>
                <span>Đang tắt</span>
              </div>
              <button className={cx('right_btn')}>
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default SecuritySettings
