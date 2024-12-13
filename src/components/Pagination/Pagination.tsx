import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

import classNames from 'classnames/bind'
import styles from './Pagination.module.scss'
const cx = classNames.bind(styles)

interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  onPageChange: (pageNumber: number) => void
}

const Paginations: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [params] = useSearchParams()
  const pageURL = Number(params.get('page'))
  const navigate = useNavigate()
  const totalPages: number = Math.ceil(totalItems / itemsPerPage)

  const siblingsToShow = 2
  let start: number, end: number
  if (totalPages <= 5) {
    start = 1
    end = totalPages
  } else if (currentPage <= siblingsToShow) {
    start = 1
    end = siblingsToShow * 2 + 1
  } else if (currentPage >= totalPages - siblingsToShow) {
    start = totalPages - siblingsToShow * 2
    end = totalPages
  } else {
    start = currentPage - siblingsToShow
    end = currentPage + siblingsToShow
  }

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
      onPageChange(pageNumber)
      navigate(`?page=${pageNumber}`)
    }
  }

  useEffect(() => {
    setCurrentPage(() => pageURL)
  }, [totalItems, pageURL])

  const pages: JSX.Element[] = []
  if (currentPage >= 1 && !isNaN(totalPages) && totalItems > 0) {
    pages.push(
      <div
        key="first"
        className={cx('pageBox', { disabledContent: currentPage === 1 })}
        onClick={() => handlePageClick(1)}
      >
        <MdOutlineKeyboardDoubleArrowLeft size={19} />
      </div>
    )
    pages.push(
      <div
        key="prev"
        className={cx('pageBox', { disabledContent: currentPage === 1 })}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        <IoIosArrowBack />
      </div>
    )
  }

  for (let i = start; i <= end; i++) {
    if (i > 0 && i <= totalPages) {
      pages.push(
        <div
          key={i}
          className={cx('pageBox', { activePagination: i === currentPage })}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </div>
      )
    }
  }

  if (currentPage <= totalPages) {
    pages.push(
      <div
        key="next"
        className={cx('pageBox', { disabledContent: currentPage === totalPages })}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        <IoIosArrowForward />
      </div>
    )
    pages.push(
      <div
        key="last"
        className={cx('pageBox', { disabledContent: currentPage === totalPages })}
        onClick={() => handlePageClick(totalPages)}
      >
        <MdOutlineKeyboardDoubleArrowRight size={19} />
      </div>
    )
  }

  return <div className={cx('pagination')}>{pages}</div>
}

export default Paginations
