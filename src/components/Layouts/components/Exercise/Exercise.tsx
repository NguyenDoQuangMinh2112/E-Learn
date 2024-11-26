import { useState, useCallback, useEffect } from 'react'

import classNames from 'classnames/bind'
import styles from './Exercise.module.scss'

import Button from '~/components/Button'
import Answer from './Answer/Answer'
import useDecodedId from '~/hooks/useDecodedId'
import confetti from 'canvas-confetti'

import { getDetailExerciseAPI } from '~/apis/chapter'
import { Quiz } from '~/interfaces/exercise'

const cx = classNames.bind(styles)

type State = {
  isSubmitted: boolean
  selectedAnswer: string | null
  result: string | null
  errorAnswer: boolean
}
const Exercise = () => {
  const [state, setState] = useState<State>({
    isSubmitted: false,
    selectedAnswer: null as string | null,
    result: null as string | null,
    errorAnswer: false
  })

  const decodedId = useDecodedId()

  const [questionData, setQuestionData] = useState<Quiz | null>(null)

  const handleConfetti = useCallback(() => {
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { x: 0.5, y: 0.5 }
    })
  }, [])

  const handleSubmit = useCallback(() => {
    setState((prevState) => {
      const isCorrect = prevState.selectedAnswer === questionData?.questions[0]?.correct_answer

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
  }, [handleConfetti, questionData])

  const handleSelectAnswer = (answer: string) => {
    setState({
      isSubmitted: false,
      selectedAnswer: answer,
      result: null,
      errorAnswer: false
    })
  }

  useEffect(() => {
    if (decodedId) {
      const fetchDetailExercices = async () => {
        try {
          const res = await getDetailExerciseAPI(decodedId)
          if (res.statusCode === 200) {
            setQuestionData(res.data)
          } else {
            console.error('Error fetching data:', res)
          }
        } catch (error) {
          console.error('API request failed:', error)
        }
      }
      fetchDetailExercices()
    }
  }, [decodedId])

  const { selectedAnswer, isSubmitted, result, errorAnswer } = state

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <h2 className={cx('content__title')}>Topic: {questionData?.title}</h2>
        <p className={cx('des')}>
          Description: <span>{questionData?.description}</span>.
        </p>
      </div>

      <div className={cx('question')}>
        <h3>Question: </h3>
        <p> {questionData?.questions[0]?.question}</p>
      </div>

      <div className={cx('container')}>
        {questionData?.questions[0]?.options?.map((option, index) => (
          <Answer
            key={index}
            title={option}
            isSelected={selectedAnswer === option}
            isError={errorAnswer && selectedAnswer === option}
            isCorrect={
              isSubmitted && selectedAnswer === option && selectedAnswer === questionData.questions[0].correct_answer
            }
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
                  <strong>Explanation:</strong> {questionData?.questions[0]?.explain}
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
