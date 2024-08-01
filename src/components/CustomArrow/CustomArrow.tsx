// CustomArrow.tsx
import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import styles from './CustomArrow.module.scss'

interface CustomArrowProps {
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

export const PrevArrow: React.FC<CustomArrowProps> = ({ className, style, onClick }) => (
  <div className={`${className} ${styles.arrow}`} style={{ ...style }} onClick={onClick}>
    <FaChevronLeft size={10} color="#000" />
  </div>
)

export const NextArrow: React.FC<CustomArrowProps> = ({ className, style, onClick }) => (
  <div className={`${className} ${styles.arrow}`} style={{ ...style }} onClick={onClick}>
    <FaChevronRight size={10} color="#000" />
  </div>
)
