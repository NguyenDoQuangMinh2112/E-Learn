import { useRef, useState } from 'react'

import classNames from 'classnames/bind'
import styles from './Search.module.scss'

import { FiSearch } from 'react-icons/fi'
import { IoIosCloseCircle } from 'react-icons/io'
import { FaSpinner } from 'react-icons/fa'

import Tippy from '@tippyjs/react/headless'
import PopperWrapper from '../Popper'
import CourseItem from '../CourseItem'

const cx = classNames.bind(styles)

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <Tippy
      visible={searchValue?.length > 0}
      interactive={true}
      render={(attrs) => (
        <div className={cx('search-result')} tabIndex={-1} {...attrs}>
          <PopperWrapper>
            <div className={cx('search-header')}>
              <FiSearch />
              <span>Kết quả cho '{searchValue}'</span>
            </div>
            <div className={cx('search-heading')}>
              <h5 className={cx('search-title')}>Khóa học</h5>
              <span>Xem thêm</span>
            </div>
            <CourseItem />
            <CourseItem />
            <CourseItem />
            <CourseItem />
            <CourseItem />
          </PopperWrapper>
        </div>
      )}
    >
      <div className={cx('wrapper')}>
        <button className={cx('search-btn')}>
          <FiSearch />
        </button>
        <input
          type="text"
          placeholder="Tìm kiếm khóa học, bài viết,..."
          ref={inputRef}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <button
          className={cx('clear')}
          onClick={() => {
            setSearchValue(''), inputRef.current?.focus()
          }}
        >
          <IoIosCloseCircle />
        </button>
        <FaSpinner className={cx('loading')} />
      </div>
    </Tippy>
  )
}

export default Search
