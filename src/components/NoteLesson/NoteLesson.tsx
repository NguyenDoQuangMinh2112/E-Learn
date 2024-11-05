import classNames from 'classnames/bind'
import styles from './NoteLesson.module.scss'

import Button from '../Button'

import { useDispatch } from 'react-redux'
import { hideNoteLesson, updateNoteLesson } from '~/redux/noteLesson/noteLessonSlice'

import { IoMdClose } from 'react-icons/io'
import { MdEdit } from 'react-icons/md'
import { MdDeleteOutline } from 'react-icons/md'

import noNoteYet from '~/assets/images/noNoteYet.svg'
import { memo, useEffect, useState } from 'react'
import 'draft-js/dist/Draft.css'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/redux/store'

import { Editor, EditorState } from 'react-draft-wysiwyg'
import { EditorState as DraftEditorState, ContentState } from 'draft-js'
import { toast } from 'react-toastify'
import { fetchNoteLessonByLessonID } from '~/redux/noteLesson/noteLessonAction'
import { courseSelector } from '~/redux/course/courseSelector'
import { authSelector } from '~/redux/auth/authSelectors'

const cx = classNames.bind(styles)

const NoteLesson = ({ noteLessonRef }: any) => {
  const dispatch = useDispatch<AppDispatch>()
  const noNote = false
  let editorStateS = EditorState?.createEmpty()
  const [editorState, setEditorState] = useState(editorStateS)

  const { myNoteLessons } = useSelector((state: RootState) => state.noteLesson)

  const {activeLesson} = useSelector(courseSelector)  
  const {userInfo} = useSelector(authSelector)

  const [edit, setEdit] = useState<boolean>(false)
  const [idNote, setIdNote] = useState<string>()
  const onEditorStateChange = (editorStateS: EditorState) => {
    setEditorState(editorStateS)
  }

  const handleCancleNoteLesson = () => {
    setEdit(false)
    setEditorState(EditorState?.createEmpty())
  }
  const handleUpdateNote = (idNote: string) => {
    const contentState = editorState?.getCurrentContent()?.getPlainText()
    setEdit(false)
    setEditorState(EditorState?.createEmpty())
    dispatch(updateNoteLesson({ id: idNote, content: contentState }))
    toast.success('Update note lesson successfully!')
  }

  useEffect(()=>{
   if(userInfo){
    const lessonId = activeLesson?._id
    dispatch(fetchNoteLessonByLessonID(String(lessonId)))
   }
  },[])
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
            <h2>Ghi chú của tôi</h2>
          </header>
          {!!noNote ? (
            <div className={cx('noResult')}>
              <img src={noNoteYet} alt="note-result" />
              <div className={cx('heading')}>Bạn chưa có ghi chú nào</div>
              <div className={cx('des')}>Hãy ghi chép để nhớ những gì bạn đã học!</div>
            </div>
          ) : (
            <ul className={cx('listNote')}>
              {myNoteLessons?.map((note) => (
                <li key={note._id}>
                  <div className={cx('itemHead')}>
                    <div className={cx('noteTime')}>{note?.time}</div>
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
                      <Button>
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
                            HỦY BỎ{' '}
                          </Button>
                          <Button className={cx('addNote_btn')} onClick={() => handleUpdateNote(note._id)}>
                            CẬP NHẬT{' '}
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
