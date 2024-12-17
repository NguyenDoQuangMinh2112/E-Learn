import Button from '~/components/Button'

import styles from './Note.module.scss'
import classNames from 'classnames/bind'

import { Editor } from 'react-draft-wysiwyg'

import { useState } from 'react'
import { EditorState } from 'draft-js'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { addNoteLessonAPI } from '~/apis/course'
import Spinner from '~/components/Spinner/Spinner'
import { useSelector } from 'react-redux'
import { authSelector } from '~/redux/auth/authSelectors'

const cx = classNames.bind(styles)

interface NoteProps {
  setShowPopup: (show: boolean) => void
  formattedCurrentTime: string
  onClose: () => void
  onCancel: () => void
  chapter_id: string
  lesson_id: string
}
const Note = ({ setShowPopup, formattedCurrentTime, onCancel, chapter_id, lesson_id }: NoteProps) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [isLoading, setIsLoading] = useState(false)
  const { userInfo } = useSelector(authSelector)

  const { id } = useParams()

  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState)
  }
  const getEditorContentAsPlainText = () => {
    const contentState = editorState.getCurrentContent()
    return contentState.getPlainText()
  }

  const isEditorEmpty = () => {
    const content = editorState.getCurrentContent()
    return !content.hasText()
  }

  const handleCreatNote = async () => {
    const value = getEditorContentAsPlainText()
    const timeSave = formattedCurrentTime
    const payload = {
      course_id: id as string,
      chapter_id,
      lesson_id,
      time: timeSave as string,
      content: value as string,
      user_id: userInfo?._id
    }

    try {
      setIsLoading(true)
      const res = await addNoteLessonAPI(payload)
      if (res.statusCode === 201) {
        setShowPopup(false)
        toast.success(res.message)
        setIsLoading(false)
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className={cx('wrapper')}>
      <div className={cx('popup_inner')}>
        <h2>
          Thêm ghi chú tại <span>{formattedCurrentTime}</span>
        </h2>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            options: ['inline', 'blockType', 'list', 'textAlign'],
            inline: {
              options: ['bold', 'italic'],
              bold: { className: 'toolbar-button' },
              italic: { className: 'toolbar-button' }
            },
            blockType: {
              options: ['Normal'],
              className: 'toolbar-button'
            },
            list: {
              options: ['unordered', 'ordered'],
              unordered: { className: 'toolbar-button' },
              ordered: { className: 'toolbar-button' }
            },
            textAlign: {
              options: ['left', 'center', 'right'],
              left: { className: 'toolbar-button' },
              center: { className: 'toolbar-button' },
              right: { className: 'toolbar-button' }
            }
          }}
        />

        <div className={cx('popup_btn')}>
          <Button
            className={cx('cancle')}
            onClick={() => {
              onCancel(), setShowPopup(false), setEditorState(EditorState.createEmpty())
            }}
          >
            Cancel
          </Button>
          <Button className={cx('addNote_btn', { disable: isEditorEmpty() })} onClick={handleCreatNote}>
            {isLoading ? <Spinner color="#fff" /> : 'Create note'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Note
