import { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdClose } from 'react-icons/io'
import { MdEdit, MdDeleteOutline } from 'react-icons/md'
import 'draft-js/dist/Draft.css'
import { Editor, EditorState } from 'react-draft-wysiwyg'
import { EditorState as DraftEditorState, ContentState } from 'draft-js'
import { toast } from 'react-toastify'
import { useSearchParams } from 'react-router-dom'

import { AppDispatch, RootState } from '~/redux/store'
import { authSelector } from '~/redux/auth/authSelectors'

import Button from '../Button'
import Spinner from '../Spinner/Spinner'

import { deleteNoteLesson, hideNoteLesson, setSelectedTime, updateNoteLesson } from '~/redux/noteLesson/noteLessonSlice'
import { fetchNoteLessonByLessonID } from '~/redux/noteLesson/noteLessonAction'

import noNoteYet from '~/assets/images/noNoteYet.svg'

import { convertTimeToSeconds } from '~/utils/helper'

import classNames from 'classnames/bind'
import styles from './NoteLesson.module.scss'

import { editNoteLessonAPI } from '~/apis/course'

const cx = classNames.bind(styles)

const NoteLesson = ({ noteLessonRef }: { noteLessonRef: React.RefObject<HTMLDivElement> }) => {
  let editorStateS = EditorState?.createEmpty()
  const [editorState, setEditorState] = useState(editorStateS)
  const [edit, setEdit] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [idNote, setIdNote] = useState<string>()
  const [searchParams] = useSearchParams()
  const endCodedId = atob(String(searchParams.get('id')))

  const { userInfo } = useSelector(authSelector)
  const dispatch = useDispatch<AppDispatch>()
  const { myNoteLessons } = useSelector((state: RootState) => state.noteLesson)

  const onEditorStateChange = (editorStateS: EditorState) => {
    setEditorState(editorStateS)
  }

  const handleCancleNoteLesson = () => {
    setEdit(false)
    setEditorState(EditorState?.createEmpty())
  }
  const handleUpdateNote = async (idNote: string) => {
    try {
      setIsLoading(true)
      const contentState = editorState?.getCurrentContent()?.getPlainText()
      setEdit(false)
      setEditorState(EditorState?.createEmpty())
      dispatch(updateNoteLesson({ _id: idNote, content: contentState }))
      const res = await editNoteLessonAPI(idNote, { content: contentState })
      if (res.statusCode === 200) {
        setIsLoading(false)
        toast.success('Update note lesson successfully!')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemoveNoteLesson = useCallback((id: string) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this blog?')
    if (isConfirmed) {
      dispatch(deleteNoteLesson({ id }))
      toast.success('Xóa ghi chú thành công!')
    }
  }, [])

  const handleSelectTime = useCallback(
    (time: string) => {
      const seconds = convertTimeToSeconds(time)
      dispatch(setSelectedTime(seconds))
      dispatch(hideNoteLesson())
    },
    [dispatch]
  )

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchNoteLessonByLessonID(String(endCodedId)))
    }
  }, [endCodedId])
  return (
    <div className={cx('wrapper')}>
      <div className={cx('overlay')}></div>
      <div className={cx('container')} ref={noteLessonRef}>
        <div className={cx('close')}>
          <Button className={cx('close-btn')} onClick={() => dispatch(hideNoteLesson())}>
            <IoMdClose size={25} color="#333" />
          </Button>
        </div>
        <div className={cx('body')}>
          <header>
            <h2>My notes</h2>
          </header>
          {myNoteLessons && !myNoteLessons?.length ? (
            <div className={cx('noResult')}>
              <img src={noNoteYet} alt="note-result" loading="lazy" />
              <div className={cx('heading')}>Bạn chưa có ghi chú nào</div>
              <div className={cx('des')}>Hãy ghi chép để nhớ những gì bạn đã học!</div>
            </div>
          ) : (
            <ul className={cx('listNote')}>
              {myNoteLessons?.map((note) => (
                <li key={note._id}>
                  <div className={cx('itemHead')}>
                    <div className={cx('noteTime')} onClick={() => handleSelectTime(note?.time)}>
                      {note?.time}
                    </div>
                    <div className={cx('titleWrap')}>
                      <div className={cx('title')}>{note?.lesson_id.title}</div>
                      <div className={cx('trackTitle')}>{note?.chapter_id.title}</div>
                    </div>
                    <div className={cx('noteActions')}>
                      <Button
                        className={cx('a')}
                        onClick={() => {
                          setEdit(true)
                          setIdNote(note._id)
                          if (note.content && typeof note.content === 'string') {
                            const contentState = ContentState?.createFromText(note.content)
                            if (contentState) {
                              const newEditorState = DraftEditorState?.createWithContent(contentState)
                              setEditorState(newEditorState)
                            } else {
                              setEditorState(EditorState.createEmpty())
                            }
                          } else {
                            setEditorState(EditorState.createEmpty())
                          }
                        }}
                      >
                        <MdEdit size={20} color="#b8b6b6" className={cx('icon')} />
                      </Button>
                      <Button onClick={() => handleRemoveNoteLesson(note._id)}>
                        <MdDeleteOutline size={20} color="#b8b6b6" className={cx('icon')} />
                      </Button>
                    </div>
                  </div>
                  <div className={cx('content')}>
                    {edit && note._id === idNote ? (
                      <>
                        <Editor
                          editorState={editorState}
                          onEditorStateChange={onEditorStateChange}
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
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

                        <div className={cx('actions')}>
                          <Button className={cx('cancle')} onClick={handleCancleNoteLesson}>
                            Cancel{' '}
                          </Button>
                          <Button className={cx('addNote_btn')} onClick={() => handleUpdateNote(note._id)}>
                            {isLoading ? <Spinner color="#fff" /> : ' Update'}
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className={cx('contentItem')}>{note?.content}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(NoteLesson)
