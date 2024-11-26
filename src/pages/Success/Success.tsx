import { useEffect } from 'react'

import classNames from 'classnames/bind'
import styles from './Success.module.scss'

import confetti from 'canvas-confetti'

import { GoCheckCircle } from 'react-icons/go'
import Button from '~/components/Button'
import { useParams } from 'react-router-dom'

const cx = classNames.bind(styles)

var duration = 15 * 1000

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

const Success = () => {
  const { id } = useParams()

  useEffect(() => {
    var animationEnd = Date.now() + duration
    var skew = 1

    const frame = () => {
      var timeLeft = animationEnd - Date.now()
      var ticks = Math.max(200, 500 * (timeLeft / duration))
      skew = Math.max(0.8, skew - 0.001)

      confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: ticks,
        origin: {
          x: Math.random(),
          y: Math.random() * skew - 0.2
        },
        colors: [
          '#FF5733',
          '#33FF57',
          '#3357FF',
          '#FF33A1',
          '#F3F533',
          '#33F3D9',
          '#9D33F3',
          '#F333FF',
          '#FF8533',
          '#33FFF1',
          '#F1F333',
          '#F5F533'
        ],
        shapes: ['circle'],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.4, 1),
        drift: randomInRange(-0.4, 0.4)
      })

      if (timeLeft > 0) {
        requestAnimationFrame(frame)
      }
    }

    frame()

    return () => {
      animationEnd = 0
    }
  }, [])

  return (
    <div className={cx('wrapper')}>
      <div className={cx('modal-box')}>
        <GoCheckCircle className={cx('checked-icon')} />
        <h2>Completed</h2>
        <h3>You have sucessfully enroll the source.</h3>
        <div className={cx('buttons')}>
          <Button classNameTitle={cx('title')} to={`/course/learning/${id}`}>
            Ok, Go to lesson now!
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Success
