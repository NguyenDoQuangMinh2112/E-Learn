import Button from '~/components/Button'

import styles from './Note.module.scss'
import classNames from 'classnames/bind'

import { Editor } from 'react-draft-wysiwyg'

import { useState } from 'react'
import { EditorState } from 'draft-js'
import { useDispatch } from 'react-redux'
import { createNewNoteLesson } from '~/redux/noteLesson/noteLessonSlice'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { courseSelector } from '~/redux/course/courseSelector'
import { addNoteLessonAPI } from '~/apis/course'
import Spinner from '~/components/Spinner/Spinner'

const cx = classNames.bind(styles)

interface NoteProps {
  setShowPopup: (show: boolean) => void
  formattedCurrentTime: string
}
const Note = ({ setShowPopup, formattedCurrentTime }: NoteProps) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const { activeLesson } = useSelector(courseSelector)
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
      chapter_id: activeLesson?.chapter_id as string,
      lesson_id: activeLesson?._id as string,
      time: timeSave as string,
      content: value as string
    }
    try {
      setIsLoading(true)
      const res = await addNoteLessonAPI(payload)
      if (res.statusCode === 201) {
        dispatch(createNewNoteLesson({ id: 1, title: 'Loi khuyen truoc khoa hoc', content: value, time: timeSave }))
        setShowPopup(false)
        toast.success(res.message)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
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
              setShowPopup(false), setEditorState(EditorState.createEmpty())
            }}
          >
            HỦY BỎ
          </Button>
          <Button className={cx('addNote_btn', { disable: isEditorEmpty() })} onClick={handleCreatNote}>
            {isLoading ? <Spinner color="#fff" /> : 'TẠO GHI CHÚ'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Note
