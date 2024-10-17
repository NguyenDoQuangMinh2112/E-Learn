import styles from './Setting.module.scss'
import classNames from 'classnames/bind'
import { useState } from 'react'

import Button from '~/components/Button'
import FormGroup from '~/components/FormGroup'
import Modal from '~/components/Modal/Modal'
import InfoDetail from './InfoDetail '

import { FaPlus } from 'react-icons/fa6'

const cx = classNames.bind(styles)

const PersonalInfo = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [currentDetail, setCurrentDetail] = useState<string | null>(null)

  const openModal = (detailType: string) => {
    setCurrentDetail(detailType)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setCurrentDetail(null)
  }

  const handleSave = () => {
    closeModal()
  }
  return (
    <>
      <Modal isOpen={isModalOpen} title={`Cập nhật ${currentDetail}`} onClose={closeModal} widthSize="small">
        {currentDetail !== 'Ảnh đại diện' && (
          <>
            <div className={cx('formGroup')}>
              <FormGroup id="name" label="Họ và tên" value="Nguyễn Đỗ Quang Minh" />
            </div>

            <Button onClick={closeModal} className={cx('saveBtn')}>
              Lưu lại
            </Button>
          </>
        )}

        {currentDetail === 'Ảnh đại diện' && (
          <div className={cx('wcp')}>
            <input type="file" id="avatar" hidden />
            <label htmlFor="avatar" className={cx('wp_avt')}>
              <img
                src="https://files.fullstack.edu.vn/f8-prod/public-images/6676511103ac3.png"
                alt="avatar"
                className={cx('avatar_change')}
              />
            </label>

            <label htmlFor="avatar" className={cx('addNew')}>
              <FaPlus /> Tải ảnh mới lên
            </label>
          </div>
        )}
      </Modal>
      <main className={cx('wrapper_info')}>
        <h1 className={cx('title')}>Thông tin cá nhân</h1>
        <p className={cx('des')}>Quản lí thông tin cá nhân của bạn</p>

        <div className={cx('inner')}>
          <section className={cx('info')}>
            <div className={cx('header')}>
              <h2>Thông tin cơ bản</h2>
              <p className={cx('des')}>Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn.</p>
            </div>
            <div className={cx('info_content')}>
              <InfoDetail label="Họ và tên" value="Minh Nguyễn Đỗ Quang" onClick={() => openModal('Họ và tên')} />
              <InfoDetail
                label="Tên người dùng"
                value="nguyen-do-quang-minh"
                onClick={() => openModal('Tên người dùng')}
              />
              <InfoDetail label="Ảnh đại diện" image onClick={() => openModal('Ảnh đại diện')} />
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default PersonalInfo
