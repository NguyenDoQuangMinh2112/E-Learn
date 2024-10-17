import classNames from 'classnames/bind'
import styles from './Tag.module.scss'

const cx = classNames.bind(styles)

interface tagProps {
  tag: string
  onRemove: (tag: string) => void
}

const Tag = ({ tag, onRemove }: tagProps) => {
  return (
    <div className={cx('wrapper')}>
      <p>{tag}</p>
      <button onClick={() => onRemove(tag)}>×</button>
    </div>
  )
}

export default Tag
