import { useEffect, useRef, useState, useCallback } from 'react'

interface UseAutoScrollProps {
  messages: any[]
  isLoading: boolean
  enabled?: boolean
}

export const useAutoScroll = ({ messages, isLoading, enabled = true }: UseAutoScrollProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(false)
  const [isUserScrolling, setIsUserScrolling] = useState(false)
  const [lastMessageCount, setLastMessageCount] = useState(0)

  // Scroll to bottom function
  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior, block: 'end' })
    }
  }, [])

  // Check if user is near bottom
  const isNearBottom = useCallback(() => {
    if (!messagesContainerRef.current) return true

    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current
    const threshold = 100 // pixels from bottom
    return scrollHeight - scrollTop - clientHeight < threshold
  }, [])

  // Handle scroll event
  const handleScroll = useCallback(() => {
    if (!messagesContainerRef.current || !enabled) return

    const isAtBottom = isNearBottom()
    setShowScrollButton(!isAtBottom && messages.length > 0)

    // Reset new message indicator when user scrolls to bottom
    if (isAtBottom && hasNewMessage) {
      setHasNewMessage(false)
    }
  }, [messages.length, hasNewMessage, isNearBottom, enabled])

  // Auto scroll when new messages arrive
  useEffect(() => {
    if (!enabled) return

    const currentMessageCount = messages.length
    const hasNewMessages = currentMessageCount > lastMessageCount

    if (hasNewMessages) {
      const wasNearBottom = isNearBottom()

      if (wasNearBottom || isLoading) {
        // Auto scroll if user was near bottom or if loading
        setTimeout(() => scrollToBottom('smooth'), 100)
      } else {
        // Show new message indicator if user scrolled up
        setHasNewMessage(true)
      }
    }

    setLastMessageCount(currentMessageCount)
  }, [messages.length, isLoading, scrollToBottom, isNearBottom, lastMessageCount, enabled])

  // Auto scroll when loading starts/ends
  useEffect(() => {
    if (!enabled) return

    if (isLoading && isNearBottom()) {
      setTimeout(() => scrollToBottom('smooth'), 100)
    }
  }, [isLoading, scrollToBottom, isNearBottom, enabled])

  // Setup scroll listener
  useEffect(() => {
    if (!enabled) return

    const container = messagesContainerRef.current
    if (!container) return

    let scrollTimeout: ReturnType<typeof setTimeout>

    const throttledHandleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(handleScroll, 100)
    }

    container.addEventListener('scroll', throttledHandleScroll, { passive: true })

    return () => {
      container.removeEventListener('scroll', throttledHandleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [handleScroll, enabled])

  // Handle scroll to bottom button click
  const handleScrollToBottom = useCallback(() => {
    scrollToBottom('smooth')
    setHasNewMessage(false)
  }, [scrollToBottom])

  return {
    messagesEndRef,
    messagesContainerRef,
    showScrollButton,
    hasNewMessage,
    scrollToBottom: handleScrollToBottom
  }
}
