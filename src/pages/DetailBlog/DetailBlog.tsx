import { useEffect, useState } from 'react'

import classNames from 'classnames/bind'
import styles from './DetailBlog.module.scss'

import ActionButton from '~/components/ActionButton/ActionButton'
import MetaData from '~/components/MetaData'
import { getLastTwoNames } from '~/utils/helper'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showChat } from '~/redux/noteLesson/noteLessonSlice'
import { useSelector } from 'react-redux'
import { noteLessonSelector } from '~/redux/noteLesson/noteLesson.selector'

import { fetchCommentByBlog, fetchDetailBlog } from '~/redux/blog/blogAction'
import { blogSelector } from '~/redux/blog/blogSelector'
import { AppDispatch } from '~/redux/store'

import adminSignature from '~/assets/images/admin.svg'
import ChatInterface from '~/components/Layouts/components/ChatInterface/ChatInterface'

import { FaCheckCircle, FaRegHeart, FaHeart } from 'react-icons/fa'
import { FaRegComment } from 'react-icons/fa'
import { authSelector } from '~/redux/auth/authSelectors'
import { checkLikedByUserAPI, reactionBlogAPI } from '~/apis/blogs'
import { showPopup } from '~/redux/popup/popupSlice'
import { updateBlog } from '~/redux/blog/blogSlice'

const cx = classNames.bind(styles)

const DetailBlog = () => {
  const { id } = useParams()
  const [isLikeBlog, setIsLikeBlog] = useState<boolean>(false)
  const { userInfo } = useSelector(authSelector)
  const dispatch = useDispatch<AppDispatch>()
  const { blogDetail, commentByBlog } = useSelector(blogSelector)
  let total_likes = blogDetail?.activity?.total_likes ?? 0

  const { isOpenChat } = useSelector(noteLessonSelector)

  useEffect(() => {
    if (id) {
      dispatch(fetchDetailBlog(id))
      dispatch(fetchCommentByBlog(String(id)))
    }
  }, [id])
  const handleComment = () => {
    if (userInfo) {
      dispatch(showChat())
    } else {
      dispatch(showPopup('login'))
    }
  }
  const handleLikeBlog = async () => {
    if (userInfo) {
      if (blogDetail) {
        setIsLikeBlog((prev) => !prev)
        !isLikeBlog ? total_likes++ : total_likes--
        const { activity } = blogDetail
        dispatch(updateBlog({ ...blogDetail, activity: { ...activity, total_likes } }))
        const payload = {
          blogId: blogDetail?._id,
          isLiked: isLikeBlog
        }
        await reactionBlogAPI(payload)
      }
    } else {
      dispatch(showPopup('login'))
    }
  }

  useEffect(() => {
    if (userInfo) {
      const fetchIsLikedData = async () => {
        try {
          const payload = { blogId: id as string }

          console.log('🚀 ~ fetchIsLikedData ~ payload:', payload)
          const res = await checkLikedByUserAPI(payload)

          if (res.statusCode === 200) {
            setIsLikeBlog(Boolean(res.data))
          }
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }

      fetchIsLikedData()
    }
  }, [])

  if (!blogDetail) {
    return <div>Loading...</div>
  }

  return (
    <>
      <MetaData title={String(blogDetail?.title)} />
      <div className={cx('wrapper')}>
        {isOpenChat && <ChatInterface />}
        <div className={cx('container-fluid')}>
          <div className={cx('row')}>
            <div className={cx('col col-2 col-xxxl-3 col-xxl-2 d-lg-none offset-1 offset-xxxl-0 offset-xxl-0')}>
              <div className={cx('aside')}>
                <h4>{getLastTwoNames(String(blogDetail?.author.fullName))}</h4>
                <p className={cx('des')}>{blogDetail?.des}</p>
                <hr />
                <div className={cx('actions')}>
                  <div className={cx('btnReact', { active: isLikeBlog })} onClick={handleLikeBlog}>
                    {isLikeBlog ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                    <span>{total_likes}</span>
                  </div>
                  <div className={cx('btnReact')} onClick={handleComment}>
                    <FaRegComment size={20} />
                    <span>{commentByBlog?.length}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('col col-7 col-xxl-8 col-lg-12')}>
              <article>
                <h1 className={cx('heading')}>{blogDetail?.title}</h1>
                <div className={cx('header')}>
                  <div className={cx('user')}>
                    <div
                      className={cx('userMenu_avatar')}
                      style={{
                        background: `${
                          blogDetail?.author.role === 'admin' && 'linear-gradient(180deg, #ffd900, #b45264 93.68%)'
                        }`
                      }}
                    >
                      <img src={blogDetail?.author.avatar_url} alt="author" />
                      {blogDetail?.author.role === 'admin' && (
                        <img src={adminSignature} alt="" className={cx('adminSignature')} />
                      )}
                    </div>
                    <div className={cx('info')}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <h4>{getLastTwoNames(String(blogDetail?.author.fullName))}</h4>
                        {blogDetail?.author.role === 'admin' && <FaCheckCircle className={cx('icon')} />}
                      </div>
                      <p className={cx('time')}>
                        7 ngày trước <span className={cx('dot')}>.</span> 6 phút đọc
                      </p>
                    </div>
                  </div>
                  <div className={cx('wrp')}>
                    <ActionButton place="right" />
                  </div>
                </div>
                <div className={cx('box')}>
                  <div dangerouslySetInnerHTML={{ __html: blogDetail?.content! }} />
                </div>
              </article>

              <div className={cx('tags')}>
                {blogDetail?.tags?.map((tag, index) => (
                  <div className={cx('tag')} key={index}>
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailBlog
