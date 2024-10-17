import Button from '~/components/Button'
import classNames from 'classnames/bind'
import styles from './Menu.module.scss'
import { logoutAPI } from '~/apis/auth'
import { useDispatch } from 'react-redux'
import { logout } from '~/redux/auth'
const cx = classNames.bind(styles)
type MenuItemProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

const MenuItem = ({ data }: MenuItemProps) => {
  const dispatch = useDispatch()
  const classes = cx('menu-item', {
    separate: data.separate
  })
  const handleClick = async (data: any) => {
    if (data.separate) {
      await logoutAPI()
      dispatch(logout())
    }
  }
  return (
    <Button className={classes} leftIcon={data.icon} to={data.to} onClick={() => handleClick(data)}>
      {data?.title}
    </Button>
  )
}

export default MenuItem
