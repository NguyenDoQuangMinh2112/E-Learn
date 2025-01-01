import classNames from 'classnames/bind'
import styles from './Login.module.scss'

import userIcon from '~/assets/images/user.svg'
import googleIcon from '~/assets/images/google.svg'
import facebookIcon from '~/assets/images/facebook.svg'
import githubIcon from '~/assets/images/github.svg'

import Button from '~/components/Button'
const cx = classNames.bind(styles)

interface SocialLoginButtons {
  type: 'login' | 'register'
}

const SocialLoginButtons: React.FC<{ type: 'login' | 'register'; onEmailLogin: () => void }> = ({
  type,
  onEmailLogin
}) => (
  <div className={cx('content')}>
    <Button className={cx('btnPopupLogin')} classNameTitle={cx('text')} svgIcon={userIcon} onClick={onEmailLogin}>
      Use Email account
    </Button>
    <Button to="/" className={cx('btnPopupLogin')} classNameTitle={cx('text')} svgIcon={googleIcon}>
      {type === 'register' ? 'Register' : 'Login'} với Google
    </Button>
    <Button to="/" className={cx('btnPopupLogin')} classNameTitle={cx('text')} svgIcon={facebookIcon}>
      {type === 'register' ? 'Register' : 'Login'} với Facebook
    </Button>
    <Button to="/" className={cx('btnPopupLogin')} classNameTitle={cx('text')} svgIcon={githubIcon}>
      {type === 'register' ? 'Register' : 'Login'} với Github
    </Button>
  </div>
)

export default SocialLoginButtons
