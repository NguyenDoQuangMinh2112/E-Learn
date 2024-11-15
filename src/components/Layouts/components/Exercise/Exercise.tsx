import { useState } from 'react'
import styles from './Exercise.module.scss'
import classNames from 'classnames/bind'
import Button from '~/components/Button'
import Answer from './Answer/Answer'
import confetti from 'canvas-confetti'

const cx = classNames.bind(styles)

const Exercise = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [errorAnswer, setErrorAnswer] = useState<boolean>(false)

  const questionData = {
    quizId: '60b8d6f9f1f25a3d485d42b1',
    question: 'Câu hỏi số 1: 1 + 1 = ?',
    options: ['1', '2', '3', '4'],
    correct_answer: '2',
    explain: '1 cộng 1 bằng 2.',
    createdAt: 1609459200000,
    updatedAt: 1609462800000,
    _destroy: false
  }

  const handleConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { x: 0.5, y: 0.5 }
    })
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
    if (selectedAnswer === questionData.correct_answer) {
      setResult('Congratulations, you answered correctly! 🎉')
      setErrorAnswer(false)
      handleConfetti()
    } else {
      setResult('Incorrect 😞')
      setErrorAnswer(true)
    }
  }

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    setResult(null)
    setIsSubmitted(false)
    setErrorAnswer(false)
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <h2 className={cx('content__title')}>Topic: Ôn lại kiến thức về Promise #2</h2>
        <p className={cx('des')}>
          Description: <span>Test your knowledge of basic JavaScript concepts</span>.
        </p>
      </div>
      <div className={cx('question')}>
        <h3>Question:</h3>
        <p>{questionData.question}</p>
      </div>
      <div className={cx('container')}>
        {questionData.options.map((option, index) => (
          <Answer
            key={index}
            title={option}
            isSelected={selectedAnswer === option}
            isError={errorAnswer && selectedAnswer === option}
            isCorrect={isSubmitted && selectedAnswer === option && selectedAnswer === questionData.correct_answer}
            onClick={() => handleSelectAnswer(option)}
          />
        ))}

        <div className={cx('btnSubmit')}>
          <Button className={cx('createPostBtn', { disable: selectedAnswer === null })} onClick={handleSubmit}>
            Submit
          </Button>
        </div>

        {/* Hiển thị kết quả sau khi nộp */}
        {isSubmitted && (
          <div className={cx('result')}>
            <p>{result}</p>
            {result === 'Incorrect 😞' && (
              <div className={cx('explanation')}>
                <p>
                  <strong>Explanation:</strong> {questionData.explain}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Exercise
