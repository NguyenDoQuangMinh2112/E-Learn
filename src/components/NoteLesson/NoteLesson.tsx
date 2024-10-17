import classNames from 'classnames/bind'
import styles from './NoteLesson.module.scss'

import Button from '../Button'

import { useDispatch } from 'react-redux'
import { hideNoteLesson } from '~/redux/noteLesson/noteLessonSlice'

import { IoMdClose } from 'react-icons/io'
import { MdEdit } from 'react-icons/md'
import { MdDeleteOutline } from 'react-icons/md'

import noNoteYet from '~/assets/images/noNoteYet.svg'
import { Editor, EditorState } from 'react-draft-wysiwyg'
import { useEffect, useState } from 'react'
import 'draft-js/dist/Draft.css'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store'
import { ContentState } from 'draft-js'
const cx = classNames.bind(styles)

const NoteLesson = ({ noteLessonRef }: any) => {
  const dispatch = useDispatch()
  const noNote = false

  const [editorState, setEditorState] = useState(EditorState?.createEmpty())

  const { myNotes } = useSelector((state: RootState) => state.noteLesson)
  const [edit, setEdit] = useState<boolean>(false)
  const [idNote, setIdNote] = useState<number>(0)
  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState)
  }

  const handleCancleNoteLesson = () => {
    setEdit(false)
    setEditorState(EditorState?.createEmpty())
  }
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
              {myNotes?.map((note) => (
                <li key={note.id}>
                  <div className={cx('itemHead')}>
                    <div className={cx('noteTime')}>{note?.time}</div>
                    <div className={cx('titleWrap')}>
                      <div className={cx('title')}>{note?.title}</div>
                      <div className={cx('trackTitle')}>Giới thiệu</div>
                    </div>
                    <div className={cx('noteActions')}>
                      <Button
                        className={cx('a')}
                        onClick={() => {
                          setEdit(true)
                          setIdNote(note.id)
                          if (note.content) {
                            const contentState = ContentState.createFromText(note.content)
                            const newEditorState = EditorState.createWithContent(contentState)
                            setEditorState(newEditorState)
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
                    {edit && note.id === idNote ? (
                      <>
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

                        <div className={cx('actions')}>
                          <Button className={cx('cancle')} onClick={handleCancleNoteLesson}>
                            HỦY BỎ{' '}
                          </Button>
                          <Button className={cx('addNote_btn')}>CẬP NHẬT </Button>
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

export default NoteLesson
