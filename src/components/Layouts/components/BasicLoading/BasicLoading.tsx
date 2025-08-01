'use client'

import type React from 'react'
import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import { FaRobot, FaDatabase } from 'react-icons/fa'
import styles from './BasicLoading.module.scss'

const cx = classNames.bind(styles)

type ChatMode = 'rag' | 'agent'

interface BasicLoadingProps {
  mode: ChatMode
  className?: string
  text?: string
}

const BasicLoading: React.FC<BasicLoadingProps> = ({ mode, className, text = 'Processing your request' }) => {
  const [progress1, setProgress1] = useState(0)
  const [progress2, setProgress2] = useState(0)
  const [progress3, setProgress3] = useState(0)

  useEffect(() => {
    // Animate progress bars with different speeds and delays
    const animateProgress = () => {
      // First bar - fastest
      const interval1 = setInterval(() => {
        setProgress1((prev) => {
          const newProgress = prev + Math.random() * 8 + 4
          return newProgress > 100 ? 20 : newProgress
        })
      }, 100)

      // Second bar - medium speed, delayed start
      setTimeout(() => {
        const interval2 = setInterval(() => {
          setProgress2((prev) => {
            const newProgress = prev + Math.random() * 6 + 3
            return newProgress > 100 ? 15 : newProgress
          })
        }, 150)

        // Third bar - slowest, most delayed
        setTimeout(() => {
          const interval3 = setInterval(() => {
            setProgress3((prev) => {
              const newProgress = prev + Math.random() * 4 + 2
              return newProgress > 100 ? 10 : newProgress
            })
          }, 200)

          return () => {
            clearInterval(interval3)
          }
        }, 300)

        return () => {
          clearInterval(interval2)
        }
      }, 200)

      return () => {
        clearInterval(interval1)
      }
    }

    const cleanup = animateProgress()
    return cleanup
  }, [])

  return (
    <div className={cx('basicLoading', className)}>
      <div className={cx('loadingHeader')}>
        <div className={cx('avatar', mode)}>{mode === 'rag' ? <FaDatabase /> : <FaRobot />}</div>
        <span className={cx('loadingText')}>{text}</span>
      </div>

      <div className={cx('progressContainer')}>
        <div className={cx('progressBar')}>
          <div className={cx('progressFill', 'bar1')} style={{ width: `${Math.min(progress1, 85)}%` }} />
        </div>
        <div className={cx('progressBar')}>
          <div className={cx('progressFill', 'bar2')} style={{ width: `${Math.min(progress2, 75)}%` }} />
        </div>
        <div className={cx('progressBar')}>
          <div className={cx('progressFill', 'bar3')} style={{ width: `${Math.min(progress3, 45)}%` }} />
        </div>
      </div>
    </div>
  )
}

export default BasicLoading
