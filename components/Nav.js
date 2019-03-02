import Link from 'next/link'
import User from './User'
import Signout from './Signout'
import NavStyles from './styles/NavStyles'

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles data-test="nav">
        {me && (
          <>
            <Link href="/create-story">
              <a>Написать рассказ</a>
            </Link>
            <Link href="/me">
              <a>Профиль</a>
            </Link>
            <Signout />
          </>
        )}
        {!me && (
          <>
            <Link href="/signin">
              <a>Вход</a>
            </Link>
            <Link href="/signup">
              <a>Регистрация</a>
            </Link>
          </>
        )}
      </NavStyles>
    )}
  </User>
)

export default Nav
