import Button from '~/components/Button'
import classNames from 'classnames/bind'
import styles from './Menu.module.scss'
const cx = classNames.bind(styles)
type MenuItemProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

const MenuItem = ({ data }: MenuItemProps) => {
  const classes = cx('menu-item', {
    separate: data.separate
  })
  return (
    <Button className={classes} to={data.to} leftIcon={data.icon}>
      {data?.title}
    </Button>
  )
}

export default MenuItem
