import { useState } from 'react'
import styles from './ChatBoxAI.module.scss'
import classNames from 'classnames/bind'

import { IoClose } from 'react-icons/io5'
import { FaComments, FaPaperPlane } from 'react-icons/fa'
import Button from '~/components/Button'

const cx = classNames.bind(styles)

const ChatBoxAI = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [input, setInput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleToggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSendMessage = () => {
    if (input.trim() === '') return
    setMessages([...messages, { text: input, isUser: true }])
    setInput('')
    setIsLoading(true)

    // Giả lập AI phản hồi
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: 'This is a simulated AI response.', isUser: false }])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className={cx('chatBox', { open: isOpen })}>
      {!isOpen && (
        <Button
          className={cx('toggleBtn')}
          classNameTitle={cx('title')}
          leftIcon={<FaComments />}
          onClick={handleToggleChat}
        >
          Chat with AI
        </Button>
      )}

      {/* Chatbox container */}
      {isOpen && (
        <div className={cx('chatContainer')}>
          {/* Header */}
          <header className={cx('header')}>
            <h2>AI Assistant</h2>
            <IoClose className={cx('closeIcon')} onClick={handleToggleChat} />
          </header>

          {/* Chat content */}
          <div className={cx('messages')}>
            {messages.map((msg, index) => (
              <div key={index} className={cx('message', { user: msg.isUser })}>
                {msg.text}
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className={cx('loading')}>
                <span>AI is typing...</span>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className={cx('inputArea')}>
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatBoxAI
