import { useEffect, useState } from 'react'
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
  const [conversationId, setConversationId] = useState<string>('')

  const generateRandomConversationId = () => {
    return Math.floor(Math.random() * 1000000000).toString()
  }

  const handleToggleChat = () => {
    setIsOpen(!isOpen)
    if (!conversationId) {
      setConversationId(generateRandomConversationId())
    }
  }

  const handleSendMessage = async () => {
    if (input.trim() === '') return
    setMessages([...messages, { text: input, isUser: true }])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetchChatBotAPI(conversationId, input)
      if (response) {
        setMessages((prev) => [...prev, { text: response, isUser: false }])
      }
    } catch (error) {
      console.error('Error fetching AI response:', error)
      setMessages((prev) => [...prev, { text: 'An error occurred. Please try again.', isUser: false }])
    } finally {
      setIsLoading(false)
    }
  }

  const fetchChatBotAPI = async (conversationId: string, message: string) => {
    const response = await fetch('http://13.211.75.178:8090/api/bot/stream_chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        conversation_id: conversationId,
        message: message
      })
    })

    if (!response.ok) {
      throw new Error('Error: ' + response.statusText)
    }

    const data = await response.json()
    return data
  }

  useEffect(() => {
    setConversationId(generateRandomConversationId())
  }, [])

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
            <IoClose size={20} className={cx('closeIcon')} onClick={handleToggleChat} />
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
