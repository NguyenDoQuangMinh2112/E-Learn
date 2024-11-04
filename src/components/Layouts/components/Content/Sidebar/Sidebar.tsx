import { useEffect, useState } from 'react'

import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'

import { sideBarMenu } from '~/utils/menu'

import Button from '~/components/Button'
import { useLocation, useParams } from 'react-router-dom'

const cx = classNames.bind(styles)

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null)
  const { id } = useParams()
  const location = useLocation()
  const checkLocation = location?.pathname === `/blog/${id}`

  useEffect(() => {
    const currentItem = sideBarMenu.find((sidebar) => sidebar.path === location.pathname)
    if (currentItem) {
      setActiveItem(currentItem.id)
    }
  }, [location])
  return (
    <div className={cx('withSidebar', { 'db-none': checkLocation })}>
      <div className={cx('wrapper')}>
        <ul className={cx('list_menu')}>
          {sideBarMenu?.map((sidebar) => (
            <li key={sidebar.id}>
              <Button
                to={sidebar.path}
                classNameTitle={cx('title')}
                classNameIcon={cx('icon')}
                leftIcon={sidebar.icons}
                className={cx('item', { active: activeItem === sidebar.id })}
                onClick={() => setActiveItem(sidebar.id)}
              >
                {sidebar.text}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
