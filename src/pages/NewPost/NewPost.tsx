import { useRef, useState } from 'react'

import classNames from 'classnames/bind'
import styles from './NewPost.module.scss'

import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'

import { useSelector } from 'react-redux'
import { popupSelector } from '~/redux/popup/popup.selector'
import { useDispatch } from 'react-redux'
import { hidePopup } from '~/redux/popup/popupSlice'
import Modal from '~/components/Modal/Modal'
import Button from '~/components/Button'
import Tag from '~/components/Tag'
import { createBlogAPI } from '~/apis/blogs'
import { authSelector } from '~/redux/auth/authSelectors'
import { toast } from 'react-toastify'
import Spinner from '~/components/Spinner/Spinner'

const cx = classNames.bind(styles)

// Khởi tạo MarkdownIt
const mdParser = new MarkdownIt()

interface EditorChangeEvent {
  html?: string
  text: string
}

const NewPost = () => {
  const { type, isOpenPopup } = useSelector(popupSelector)
  const { userInfo } = useSelector(authSelector)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  let [tags, setTags] = useState<any>([])
  const [title, setTitle] = useState<string | undefined>('')
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [content, setContent] = useState<string>('')
  const [des, setDes] = useState<string | undefined>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  let tagLimit: number = 10

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)

      setSelectedFile(imageUrl)
    }
  }

  const closeModal = () => {
    dispatch(hidePopup())
  }

  // Handle Tags
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13 || e.keyCode === 188 || e.keyCode === 9) {
      e.preventDefault()

      let tag = e.target.value
      if (tags.length < tagLimit) {
        if (!tags.includes(tag) && tag.length) {
          setTags((prev: any) => [...prev, tag])
        }
      }
      e.target.value = ''
    }
  }

  // remove Tags
  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev: any) => prev.filter((tag: any) => tag !== tagToRemove))
  }

  // Markdown editor lite
  const handleEditorChange = ({ text }: EditorChangeEvent) => {
    setContent(text)
  }

  // Created new board
  const handleCreateNewPost = async () => {
    if (!title || title.trim() === '') {
      alert('Title cannot be empty!')
      return
    }
    if (!des || des.trim() === '') {
      alert('Description cannot be empty!')
      return
    }

    if (des.length > 20) {
      alert('Description cannot be greater than 20 characters.')
      return
    }
    if (tags.length === 0) {
      alert('Please add at least one tag!')
      return
    }

    if (tags.length > 10) {
      alert('You can add a maximum of 10 tags!')
      return
    }

    const fileInput = fileInputRef.current
    if (fileInput && fileInput.files?.length === 0) {
      alert('Please select an image!')
      return
    }
    try {
      const htmlContent = mdParser.render(content)
      const formData = new FormData()
      formData.append('title', title || '')
      formData.append('des', des || '')
      formData.append('content[]', htmlContent)
      tags.forEach((tag: string) => formData.append('tags[]', tag))
      formData.append('author', userInfo?._id || '')
      if (fileInputRef.current && fileInputRef.current.files?.[0]) {
        formData.append('banner', fileInputRef.current.files[0])
      }

      setIsLoading(true)
      const res = await createBlogAPI(formData)

      if (res.statusCode === 201) {
        setContent('')
        setDes('')
        setTitle('')
        setSelectedFile('')
        closeModal()
        setIsLoading(false)
        toast.success(res?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className={cx('containers')}>
        {type === 'blog' && (
          <Modal widthSize="large" isOpen={type === 'blog' && isOpenPopup} iShowHeader onClose={closeModal}>
            <div className={cx('container')}>
              <div className={cx('row')}>
                <div className={cx('col col-12')}>
                  <div className={cx('content')}>
                    <div className={cx('body')}>
                      <div className={cx('row')}>
                        <div className={cx('col col-6')}>
                          <div className={cx('left')}>
                            <h3>Xem trước</h3>
                            <div
                              className={cx('img')}
                              role="button"
                              tabIndex={0}
                              onClick={handleClick}
                              onChange={handleFileChange}
                              style={{ backgroundImage: `url(${selectedFile})` }}
                            >
                              <input type="file" hidden tabIndex={-1} ref={fileInputRef} />
                              <p style={{ opacity: `${selectedFile && 0}` }}>
                                Ảnh đại diện hấp dẫn giúp bài viết của bạn cuốn hút hơn với độc giả.
                              </p>
                              <span style={{ opacity: `${selectedFile && 0}` }}>
                                Kéo thả ảnh vào đây, hoặc bấm để chọn ảnh
                              </span>
                            </div>
                            <input
                              className={cx('blogTitle')}
                              value={title}
                              onChange={(e: any) => setTitle(e.target.value)}
                              placeholder="Tiêu đề khi tin được hiển thị"
                              style={{ width: '100%' }}
                            />

                            <input
                              className={cx('blogDes')}
                              value={des}
                              onChange={(e: any) => setDes(e.target.value)}
                              placeholder="Mô tả khi được hiển thị"
                              style={{ width: '100%' }}
                            />
                          </div>
                        </div>
                        <div className={cx('col col-6')}>
                          <div className={cx('storyBook')}>
                            <div className={cx('lable')}>
                              <span>Thêm tối đa 5 thẻ để độc giả biết bài viết của bạn nói về điều gì.</span>
                              <span className={cx('watch-out')}>
                                Lưu ý:{' '}
                                <p style={{ color: '#45b613' }}>
                                  {' '}
                                  Sử dụng Enter, tab, hoặc ',' trên bàn phím để thêm tag.
                                </p>
                                .
                              </span>
                            </div>
                            <div className={cx('select')}>
                              {tags?.map((tag: any) => (
                                <Tag tag={tag} onRemove={handleRemoveTag} />
                              ))}
                              <input
                                className={cx('searchTag')}
                                placeholder="Ví dụ: Front-end, ReactJS, UI, UX"
                                aria-expanded="false"
                                onKeyDown={handleKeyDown}
                              />
                            </div>

                            <div className={cx('actions')}>
                              <Button className={cx('createPostBtn')} onClick={handleCreateNewPost}>
                                {isLoading ? <Spinner color="#fff" /> : 'Xuất bản ngay'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
        <section>
          <input
            className={cx('wrapper', 'title')}
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
            placeholder="Tiêu đề"
            style={{ width: '100%' }}
          />
          <div className={cx('text-editor')}>
            <MdEditor
              style={{ height: '500px' }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
              value={content}
            />
          </div>
        </section>
      </div>
    </>
  )
}

export default NewPost
