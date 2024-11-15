import styles from './Answer.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface AnswerProps {
  title: string
  onClick: () => void
  isSelected: boolean
  isError: boolean
  isCorrect?: boolean
}

const Answer = ({ title, onClick, isSelected, isError, isCorrect }: AnswerProps) => {
  return (
    <div
      className={cx('wrapper', {
        selected: isSelected,
        error: isError,
        correct: isCorrect
      })}
      onClick={onClick}
    >
      {title}
    </div>
  )
}

export default Answer
