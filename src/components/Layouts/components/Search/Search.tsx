import { useEffect, useRef, useState } from 'react'

import classNames from 'classnames/bind'
import styles from './Search.module.scss'

import { FiSearch } from 'react-icons/fi'
import { IoIosCloseCircle } from 'react-icons/io'
import { FaSpinner } from 'react-icons/fa'

import Tippy from '@tippyjs/react/headless'
import PopperWrapper from '../Popper'
import SearchItem from '../SearchItem'
import useDebounce from '~/hooks/useDebounce'
import { searchAPI } from '~/apis/course'
import { searchResultInterface } from '~/interfaces/searchResult'

const cx = classNames.bind(styles)

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchResult, setSearchResult] = useState<searchResultInterface | null>(null)

  const debouceSearch = useDebounce({
    value: searchValue,
    ms: 800
  })

  useEffect(() => {
    if (debouceSearch.trim() === '') {
      setSearchResult(null)
      return
    }
    const fetchSearchAPI = async () => {
      setIsLoading(true)
      try {
        const res = await searchAPI({ q: debouceSearch })
        if (res.statusCode === 200) {
          setSearchResult(res.data)
        }
      } catch (error) {
        console.error('Error fetching search results:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSearchAPI()
  }, [debouceSearch])

  return (
    <Tippy
      visible={searchValue?.length > 0}
      interactive={true}
      render={(attrs) => (
        <div className={cx('search-result')} tabIndex={-1} {...attrs}>
          <PopperWrapper>
            <div className={cx('search-header')}>
              {isLoading ? (
                <>
                  <FaSpinner className={cx('loading')} />
                  <span>Đang tìm kiếm '{searchValue}'</span>
                </>
              ) : (
                <span>Kết quả tìm kiếm cho '{searchValue}'</span>
              )}
            </div>

            {isLoading ? (
              <></>
            ) : (
              <>
                {searchResult && searchResult?.courses?.length > 0 && (
                  <div>
                    <div className={cx('search-heading')}>
                      <h5 className={cx('search-title')}>Khóa học</h5>
                      <span>Xem thêm</span>
                    </div>
                    {searchResult?.courses?.map((course) => (
                      <SearchItem
                        title={course.title}
                        thumnails={course.thumbnail}
                        key={course._id}
                        courseId={course._id}
                        setSearchValue={setSearchValue}
                      />
                    ))}
                  </div>
                )}

                {searchResult && searchResult?.blogs?.length > 0 && (
                  <div>
                    <div className={cx('search-heading')}>
                      <h5 className={cx('search-title')}>Bài viết</h5>
                      <span>Xem thêm</span>
                    </div>
                    {searchResult?.blogs?.map(
                      (blog) =>
                        blog && (
                          <SearchItem
                            title={blog.title}
                            thumnails={blog.banner}
                            key={blog._id}
                            blogId={blog._id}
                            setSearchValue={setSearchValue}
                          />
                        )
                    )}
                  </div>
                )}
              </>
            )}
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

        {searchValue && (
          <button
            className={cx('clear')}
            onClick={() => {
              setSearchValue(''), inputRef.current?.focus()
            }}
          >
            <IoIosCloseCircle />
          </button>
        )}
      </div>
    </Tippy>
  )
}

export default Search
