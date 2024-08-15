import Button from '~/components/Button'

import styles from './Note.module.scss'
import classNames from 'classnames/bind'

import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useState } from 'react'
import { EditorState } from 'draft-js'

const cx = classNames.bind(styles)

interface NoteProps {
  setShowPopup: (show: boolean) => void
  formattedCurrentTime: string
}
const Note = ({ setShowPopup, formattedCurrentTime }: NoteProps) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

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

  const handleCreatNote = () => {
    console.log(getEditorContentAsPlainText(), formattedCurrentTime)
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
            TẠO GHI CHÚ
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Note
