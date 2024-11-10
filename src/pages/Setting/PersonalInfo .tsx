import styles from './Setting.module.scss'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'

import Button from '~/components/Button'
import FormGroup from '~/components/FormGroup'
import Modal from '~/components/Modal/Modal'
import InfoDetail from './InfoDetail '

import { FaPlus } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { authSelector } from '~/redux/auth/authSelectors'
import { useDispatch } from 'react-redux'
import { updateUserInfo } from '~/redux/auth/authSlice'
import { convertName } from '~/utils/helper'
import { BiImages } from 'react-icons/bi'
import { updateInfoUserAPI, uploadAvatarAPI } from '~/apis/auth'
import { toast } from 'react-toastify'
import Spinner from '~/components/Spinner/Spinner'

const cx = classNames.bind(styles)

const PersonalInfo = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [currentDetail, setCurrentDetail] = useState<string | null>(null)
  const [userDetails, setUserDetails] = useState({ fullName: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [files, setFiles] = useState<string | null>(null)

  const { userInfo } = useSelector(authSelector)
  const dispatch = useDispatch()

  const openModal = (detailType: string) => {
    setCurrentDetail(detailType)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setCurrentDetail(null)
    setSelectedFile(null)
  }

  const handleSave = async () => {
    try {
      setIsLoading(true)
      const res = await updateInfoUserAPI(String(userInfo?._id), userDetails)
      if (res.statusCode === 200) {
        setIsLoading(false)
        dispatch(updateUserInfo(userDetails))
        closeModal()
        toast.success('Updated user info successfully!')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (userInfo) {
      setUserDetails({ fullName: userInfo.fullName })
    }
  }, [userInfo])

  useEffect(() => {
    return () => {
      if (selectedFile) {
        URL.revokeObjectURL(selectedFile)
      }
    }
  }, [selectedFile])

  const handleFileChange = async (event: any) => {
    const file = event.target.files?.[0]
    if (file) {
      setFiles(file)
      const imageUrl = URL.createObjectURL(file)

      setSelectedFile(imageUrl)
    }
  }
  const handleUpdateAvatar = async () => {
    if (files) {
      // Kiểm tra files có phải là null không
      const formData = new FormData()
      formData.append('avatar_url', files) // Sử dụng files thay vì selectedFile
      try {
        setIsLoading(true)
        const res = await uploadAvatarAPI(String(userInfo?._id), formData) // Gọi API với FormData
        if (res.success) {
          dispatch(updateUserInfo({ avatar_url: res.avatar_url }))
          setSelectedFile(null)
          setFiles(null)
          setIsLoading(false)
          closeModal()
          toast.success('Update avatar successfully!')
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
  return (
    <>
      <Modal isOpen={isModalOpen} title={`Cập nhật ${currentDetail}`} onClose={closeModal} widthSize="small">
        {currentDetail !== 'Ảnh đại diện' ? (
          <>
            <div className={cx('formGroup')}>
              <FormGroup
                id="name"
                label={String(currentDetail)}
                value={userDetails.fullName}
                onChange={(e) => setUserDetails({ fullName: e.target.value })}
              />
            </div>
            <Button onClick={handleSave} className={cx('saveBtn')} disabled={isLoading}>
              {isLoading ? <Spinner color="#fff" /> : 'Lưu lại'}
            </Button>
          </>
        ) : (
          <div className={cx('wcp')}>
            <input type="file" id="avatar" hidden onChange={handleFileChange} />
            <label htmlFor="avatar" className={cx('wp_avt')}>
              <img src={selectedFile || userInfo?.avatar_url} alt="avatar" className={cx('avatar_change')} />
            </label>
            <label htmlFor={`${!selectedFile && 'avatar'}`} className={cx('addNew')} onClick={handleUpdateAvatar}>
              {!selectedFile ? (
                <>
                  <FaPlus /> Tải ảnh mới lên
                </>
              ) : (
                <>
                  {' '}
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <>
                      <BiImages /> Update
                    </>
                  )}
                </>
              )}
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
              <InfoDetail label="Họ và tên" value={userInfo?.fullName} onClick={() => openModal('Họ và tên')} />
              <InfoDetail
                label="Tên người dùng"
                value={convertName(String(userInfo?.fullName))}
                onClick={() => openModal('Tên người dùng')}
              />
              <InfoDetail
                label="Ảnh đại diện"
                imgSrc={userInfo?.avatar_url}
                image
                onClick={() => openModal('Ảnh đại diện')}
              />
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default PersonalInfo
