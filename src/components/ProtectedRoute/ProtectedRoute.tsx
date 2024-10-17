import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { authSelector } from '~/redux/auth/authSelectors'
import { showPopup } from '~/redux/popup/popupSlice'

const ProtectedRoute = () => {
  const { userInfo } = useSelector(authSelector)
  const dispatch = useDispatch()
  if (!userInfo) {
    dispatch(showPopup('login'))
  }
  return <Outlet />
}

export default ProtectedRoute
