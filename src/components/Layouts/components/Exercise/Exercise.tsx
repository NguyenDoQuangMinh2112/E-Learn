import { useState, useCallback } from 'react'
import styles from './Exercise.module.scss'
import classNames from 'classnames/bind'
import Button from '~/components/Button'
import Answer from './Answer/Answer'
import confetti from 'canvas-confetti'

const cx = classNames.bind(styles)

const Exercise = () => {
  const [state, setState] = useState({
    isSubmitted: false,
    selectedAnswer: null as string | null,
    result: null as string | null,
    errorAnswer: false
  })

  const questionData = {
    quizId: '60b8d6f9f1f25a3d485d42b1',
    question: 'Câu hỏi số 1: 1 + 1 = ?',
    options: ['1', '2', '3', '4'],
    correct_answer: '2',
    explain: '1 cộng 1 bằng 2.'
  }

  const handleConfetti = useCallback(() => {
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { x: 0.5, y: 0.5 }
    })
  }, [])

  const handleSubmit = useCallback(() => {
    setState((prevState) => {
      const isCorrect = prevState.selectedAnswer === questionData.correct_answer
      if (isCorrect) {
        handleConfetti()
      }
      return {
        ...prevState,
        isSubmitted: true,
        result: isCorrect ? 'Congratulations, you answered correctly! 🎉' : 'Incorrect 😞',
        errorAnswer: !isCorrect
      }
    })
  }, [handleConfetti])

  const handleSelectAnswer = (answer: string) => {
    setState({
      isSubmitted: false,
      selectedAnswer: answer,
      result: null,
      errorAnswer: false
    })
  }

  const { selectedAnswer, isSubmitted, result, errorAnswer } = state

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
          <Button className={cx('submitAnswer', { disable: selectedAnswer === null })} onClick={handleSubmit}>
            Submit
          </Button>
        </div>

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
