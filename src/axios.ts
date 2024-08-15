import axios from 'axios'
import { logoutAPI, refreshTokenAPI } from './apis/auth'
import { toast } from 'react-toastify'
import { logout } from './redux/auth'
import { showPopup } from './redux/popup/popupSlice'
import { store } from './redux/store'

let authorizedAxiosInstance = axios.create()
// Thời gian chờ tối đa của 1 request
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10
// withCredentials: Sẽ cho phép axios tự động gửi cookie trong mỗi request lên BE(phục vụ trường hợp lưu JWT Token(accessToken,refreshToken)) vào httpOnly cookie của trình duyệt
authorizedAxiosInstance.defaults.withCredentials = true

authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    // get accessToken from local storage
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      // Dùng Bearer => tuân thủ theo tiêu chuẩn OAuth2.0
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)
let refreshTokenPromise: Promise<void> | null = null
const dispatch = store.dispatch
// Add a response interceptor
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  (error) => {
    if (error?.response?.status === 401) {
      logoutAPI().then(() => {
        dispatch(logout())
        dispatch(showPopup('login'))
      })
    }
    const originalRequest = error.config
    if (error?.response?.status === 410 && originalRequest) {
      if (!refreshTokenPromise) {
        // Lay refresh token tu local storage
        const refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken) {
          refreshTokenPromise = refreshTokenAPI(refreshToken)
            .then((res) => {
              const { accessToken } = res
              localStorage.setItem('accessToken', accessToken)
              authorizedAxiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`
              // Lưu ý accessToken đã được update ở cookie rồi
            })
            .catch((_error) => {
              logoutAPI().then(() => {
                dispatch(logout())
                dispatch(showPopup('login'))
              })
              return Promise.reject(_error)
            })
            .finally(() => {
              refreshTokenPromise = null
            })
        }
      }

      if (refreshTokenPromise) {
        return refreshTokenPromise.then(() => {
          return authorizedAxiosInstance(originalRequest)
        })
      }
    }

    if (error?.response?.status !== 410) {
      toast.error(error.response?.data?.message || error?.message)
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default authorizedAxiosInstance
