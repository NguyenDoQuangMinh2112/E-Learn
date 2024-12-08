import styles from './LessonItem.module.scss'
import classNames from 'classnames/bind'
import { FaCirclePlay } from 'react-icons/fa6'
import { FaCircleCheck } from 'react-icons/fa6'
import { MdQuiz } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import useDecodedId from '~/hooks/useDecodedId'

const cx = classNames.bind(styles)
interface LessonItemProps {
  toggle: boolean
  title: string
  order?: number
  id: string
  type: 'lesson' | 'exercises'
}

const LessonItem = ({ toggle, title, order, type, id }: LessonItemProps) => {
  const navigate = useNavigate()
  const decodedIdUrl = btoa(id)

  const decodeId = useDecodedId()

  const isActive = id === decodeId

  const handleClickLesson = () => {
    navigate(`/course/learning/66b2111e02402496c308a935?id=${decodedIdUrl}&type=${type}`)
  }

  return (
    <div className={cx('track', { active: toggle })}>
      <div className={cx('wrapper_track', { 'active-bg': isActive })} onClick={handleClickLesson}>
        <div className={cx('info')}>
          <h3 className={cx('info_title')}>
            {order}. {title}
          </h3>
          <p className={cx('info_desc')}>
            {type === 'exercises' ? (
              <MdQuiz size={16} />
            ) : (
              <>
                <FaCirclePlay />
                <span>04:20</span>
              </>
            )}
          </p>
        </div>
        <div className={cx('icon')}>
          <FaCircleCheck />
        </div>
      </div>
    </div>
  )
}

export default LessonItem
