'use client'

import { useEffect, useState } from 'react'
import styles from './ChatBoxAI.module.scss'
import classNames from 'classnames/bind'
import { IoClose, IoSettingsSharp, IoExpand, IoContract } from 'react-icons/io5'
import { FaComments, FaPaperPlane, FaRobot, FaDatabase } from 'react-icons/fa'
import Button from '~/components/Button'
import { useAutoScroll } from '~/hooks/useAutoScroll'
import BasicLoading from '../BasicLoading/BasicLoading'
import ScrollToBottom from '../ScrollToBottom/ScrollToBottom'

// localStorage helpers (keep original code)
const STORAGE_KEY = 'elearn-chatbot'
const CURRENT_CONVERSATION_KEY = 'elearn-chatbot-current'

const saveToStorage = (conversationId: string, mode: ChatMode, messages: Message[]) => {
  try {
    const existingData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    const key = `${conversationId}_${mode}`
    existingData[key] = {
      messages,
      lastUpdated: new Date().toISOString(),
      mode
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData))
    localStorage.setItem(
      CURRENT_CONVERSATION_KEY,
      JSON.stringify({
        conversationId,
        mode
      })
    )
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

const loadFromStorage = (conversationId: string, mode: ChatMode): Message[] => {
  try {
    const existingData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    const key = `${conversationId}_${mode}`
    const data = existingData[key]
    if (data && data.messages) {
      return data.messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }))
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error)
  }
  return []
}

const getCurrentConversation = () => {
  try {
    const current = localStorage.getItem(CURRENT_CONVERSATION_KEY)
    if (current) {
      return JSON.parse(current)
    }
  } catch (error) {
    console.error('Error getting current conversation:', error)
  }
  return null
}

const clearStorage = (conversationId?: string, mode?: ChatMode) => {
  try {
    if (conversationId && mode) {
      const existingData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      const key = `${conversationId}_${mode}`
      delete existingData[key]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData))
    } else {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(CURRENT_CONVERSATION_KEY)
    }
  } catch (error) {
    console.error('Error clearing localStorage:', error)
  }
}

const cx = classNames.bind(styles)

type ChatMode = 'rag' | 'agent'

interface Message {
  text: string
  isUser: boolean
  timestamp: Date
}

const parseMarkdown = (text: string) => {
  let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>')
  formatted = formatted.replace(/`(.*?)`/g, '<code>$1</code>')

  const lines = formatted.split('\n')
  let inList = false
  const processedLines = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line.startsWith('* ') || line.startsWith('- ')) {
      if (!inList) {
        processedLines.push('<ul>')
        inList = true
      }
      processedLines.push(`<li>${line.substring(2)}</li>`)
    } else if (line === '' && inList) {
      processedLines.push('</ul>')
      inList = false
      processedLines.push('<br>')
    } else {
      if (inList) {
        processedLines.push('</ul>')
        inList = false
      }
      if (line !== '') {
        processedLines.push(`<p>${line}</p>`)
      } else {
        processedLines.push('<br>')
      }
    }
  }

  if (inList) {
    processedLines.push('</ul>')
  }

  return processedLines.join('')
}

const ChatBoxAI = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [conversationId, setConversationId] = useState<string>('')
  const [chatMode, setChatMode] = useState<ChatMode>('rag')
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(true)
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const [isInitializing, setIsInitializing] = useState<boolean>(false)

  // Auto scroll hook
  const { messagesEndRef, messagesContainerRef, showScrollButton, hasNewMessage, scrollToBottom } = useAutoScroll({
    messages,
    isLoading,
    enabled: isOpen
  })

  const generateRandomConversationId = () => {
    return Math.floor(Math.random() * 1000000000).toString()
  }

  const handleToggleChat = () => {
    setIsOpen(!isOpen)
    if (!conversationId) {
      setConversationId(generateRandomConversationId())
    }
  }

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const getLoadingText = (mode: ChatMode) => {
    const texts = {
      rag: [
        'Searching knowledge base...',
        'Analyzing documents...',
        'Processing your request...',
        'Finding relevant information...'
      ],
      agent: [
        'Processing your request...',
        'AI agent is thinking...',
        'Generating response...',
        'Analyzing your query...'
      ]
    }
    return texts[mode][Math.floor(Math.random() * texts[mode].length)]
  }

  const handleSendMessage = async () => {
    if (input.trim() === '') return

    const newMessage: Message = {
      text: input,
      isUser: true,
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, newMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetchChatBotAPI(input, chatMode)
      if (response) {
        const aiMessage: Message = {
          text: response,
          isUser: false,
          timestamp: new Date()
        }
        setMessages((prev) => [...prev, aiMessage])
      }
    } catch (error) {
      console.error('Error fetching AI response:', error)
      const errorMessage: Message = {
        text: 'An error occurred. Please try again.',
        isUser: false,
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const fetchChatBotAPI = async (message: string, mode: ChatMode) => {
    const baseUrl = 'http://127.0.0.1:8000'
    if (mode === 'agent') {
      const response = await fetch(`${baseUrl}/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: message
        })
      })

      if (!response.ok) {
        throw new Error('Error: ' + response.statusText)
      }

      const data = await response.json()
      return data.reply
    } else {
      const response = await fetch(`http://13.211.75.178:8090/api/bot/stream_chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          conversation_id: conversationId,
          message: message,
          mode: mode
        })
      })

      if (!response.ok) {
        throw new Error('Error: ' + response.statusText)
      }

      const data = await response.json()
      return data
    }
  }

  const initializeChat = async (mode: ChatMode) => {
    if (mode === 'agent' && !isInitialized && !isInitializing) {
      setIsInitializing(true)
      try {
        const response = await fetch('http://127.0.0.1:8000/chat/init')
        if (response.ok) {
          const data = await response.json()
          const greetingMessage: Message = {
            text: data.reply,
            isUser: false,
            timestamp: new Date()
          }
          setMessages((prev) => [...prev, greetingMessage])
          setIsInitialized(true)
        }
      } catch (error) {
        console.error('Error initializing chat:', error)
      } finally {
        setIsInitializing(false)
      }
    }
  }

  const handleModeChange = (mode: ChatMode) => {
    setChatMode(mode)
    setShowSettings(false)
    if (conversationId) {
      const savedMessages = loadFromStorage(conversationId, mode)
      setMessages(savedMessages)
      if (mode === 'agent' && savedMessages.length === 0 && !isInitialized && !isInitializing) {
        initializeChat(mode)
      }
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  useEffect(() => {
    const currentConversation = getCurrentConversation()
    if (currentConversation) {
      setConversationId(currentConversation.conversationId)
      setChatMode(currentConversation.mode)
    } else {
      setConversationId(generateRandomConversationId())
    }
  }, [])

  useEffect(() => {
    if (conversationId) {
      setIsLoadingHistory(true)
      const savedMessages = loadFromStorage(conversationId, chatMode)
      setMessages(savedMessages)
      setIsLoadingHistory(false)
    }
  }, [conversationId, chatMode])

  useEffect(() => {
    if (conversationId && messages.length > 0 && !isLoadingHistory) {
      saveToStorage(conversationId, chatMode, messages)
    }
  }, [messages, conversationId, chatMode, isLoadingHistory])

  const clearChatHistory = () => {
    setMessages([])
    if (conversationId) {
      clearStorage(conversationId, chatMode)
    }
  }

  const clearAllHistory = () => {
    setMessages([])
    clearStorage()
  }

  const startNewConversation = () => {
    const newConversationId = generateRandomConversationId()
    setConversationId(newConversationId)
    setMessages([])
    setShowSettings(false)
    setIsInitialized(false)
    setIsInitializing(false)
    if (chatMode === 'agent') {
      setTimeout(() => initializeChat(chatMode), 100)
    }
  }

  useEffect(() => {
    if (isOpen && chatMode === 'agent' && messages.length === 0 && !isInitialized && !isInitializing) {
      initializeChat(chatMode)
    }
  }, [isOpen, chatMode, messages.length, isInitialized, isInitializing])

  // Handle ESC key for expanded mode
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isExpanded) {
        setIsExpanded(false)
      }
    }

    if (isExpanded) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isExpanded])

  return (
    <>
      {isExpanded && <div className={cx('overlay')} onClick={handleToggleExpand} />}
      <div className={cx('chatBox', { open: isOpen, expanded: isExpanded })}>
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

        {isOpen && (
          <div className={cx('chatContainer')}>
            <header className={cx('header')}>
              <div className={cx('headerLeft')}>
                <h2>Elearn - Chatbot {isExpanded && '- Expanded View'}</h2>
                <div className={cx('modeIndicator')}>
                  {chatMode === 'rag' ? (
                    <>
                      <FaDatabase size={12} />
                      <span>RAG Mode</span>
                    </>
                  ) : (
                    <>
                      <FaRobot size={12} />
                      <span>AI Agent</span>
                    </>
                  )}
                </div>
              </div>
              <div className={cx('headerRight')}>
                <button
                  className={cx('expandIcon')}
                  onClick={handleToggleExpand}
                  title={isExpanded ? 'Exit fullscreen' : 'Enter fullscreen'}
                >
                  {isExpanded ? <IoContract size={20} /> : <IoExpand size={20} />}
                </button>
                <IoSettingsSharp
                  size={22}
                  className={cx('settingsIcon')}
                  onClick={() => setShowSettings(!showSettings)}
                />
                <IoClose size={22} className={cx('closeIcon')} onClick={handleToggleChat} />
              </div>
            </header>

            {showSettings && (
              <div className={cx('settingsPanel')}>
                <h3>Choose Chat Mode</h3>
                <div className={cx('modeOptions')}>
                  <button
                    className={cx('modeOption', { active: chatMode === 'rag' })}
                    onClick={() => handleModeChange('rag')}
                  >
                    <FaDatabase />
                    <div>
                      <strong>RAG Mode</strong>
                      <p>Chat with knowledge base</p>
                    </div>
                  </button>
                  <button
                    className={cx('modeOption', { active: chatMode === 'agent' })}
                    onClick={() => handleModeChange('agent')}
                  >
                    <FaRobot />
                    <div>
                      <strong>AI Agent</strong>
                      <p>Advanced AI assistant</p>
                    </div>
                  </button>
                </div>
                <div className={cx('historyActions')}>
                  <button className={cx('historyButton', 'primary')} onClick={startNewConversation}>
                    New Chat
                  </button>
                  <button className={cx('historyButton')} onClick={clearChatHistory}>
                    Clear Current Chat
                  </button>
                  <button className={cx('historyButton', 'danger')} onClick={clearAllHistory}>
                    Clear All History
                  </button>
                </div>
              </div>
            )}

            <div className={cx('messages')} ref={messagesContainerRef}>
              {isLoadingHistory ? (
                <div className={cx('loadingHistory')}>
                  <div className={cx('loadingSpinner')}></div>
                  <span>Loading chat history...</span>
                </div>
              ) : messages.length === 0 ? (
                <div className={cx('welcomeMessage')}>
                  <div className={cx('welcomeIcon')}>
                    {chatMode === 'rag' ? <FaDatabase size={24} /> : <FaRobot size={24} />}
                  </div>
                  <h3>{chatMode === 'rag' ? 'RAG Chat Mode' : 'AI Agent Mode'}</h3>
                  <p>
                    {chatMode === 'rag' ? 'Ask questions about your knowledge base' : 'Get help from your AI assistant'}
                  </p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div key={index} className={cx('messageWrapper', { user: msg.isUser })}>
                    <div className={cx('message', { user: msg.isUser })}>
                      <div
                        className={cx('messageContent')}
                        dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.text) }}
                      />
                      <div className={cx('messageTime')}>{formatTime(msg.timestamp)}</div>
                    </div>
                  </div>
                ))
              )}

              {/* Basic Loading Indicator */}
              {isLoading && (
                <div className={cx('messageWrapper')}>
                  <BasicLoading mode={chatMode} text={getLoadingText(chatMode)} />
                </div>
              )}

              {/* Invisible element for scrolling */}
              <div ref={messagesEndRef} />

              {/* Scroll to bottom button */}
              <ScrollToBottom show={showScrollButton} hasNewMessage={hasNewMessage} onClick={scrollToBottom} />
            </div>

            <div className={cx('inputArea')}>
              <input
                type="text"
                placeholder={`Ask ${chatMode === 'rag' ? 'about your documents' : 'your AI assistant'}...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || input.trim() === ''}
                className={cx('sendButton')}
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ChatBoxAI
