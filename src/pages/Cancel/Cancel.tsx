import classNames from 'classnames/bind'
import styles from './Cancel.module.scss'

import { MdOutlineCancel } from 'react-icons/md'

import Button from '~/components/Button'

const cx = classNames.bind(styles)

const Cancel = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('modal-box')}>
        <MdOutlineCancel className={cx('cancel-icon')} />
        <h2>Cancel</h2>
        <h3>You have canceled your enrollment in the course.</h3>
        <div className={cx('buttons')}>
          <Button classNameTitle={cx('title')} to={'/'}>
            Return to home page!
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Cancel
