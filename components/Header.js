import Link from 'next/link'
import Router from 'next/router'
import { styled } from 'linaria/react'
import NProgress from 'nprogress'
import Nav from './Nav'

NProgress.configure({ showSpinner: false })

Router.onRouteChangeStart = () => {
  NProgress.start()
}

Router.onRouteChangeComplete = () => {
  NProgress.done()
}

Router.onRouteChangeError = () => {
  NProgress.done()
}

const Logo = styled.h1`
  font-family: var(--logo-font);
  font-size: 3rem;
  letter-spacing: -1.5px;
  margin-top: 14px;
  margin-bottom: 14px;
  margin-left: 20px;
  position: relative;
  z-index: 2;

  a {
    padding: 0 10px;
    color: var(--black);
  }

  @media (max-width: 1300px) {
    padding: 12px 0;
    margin: 0;
    text-align: center;
  }
`

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 1;
  .bar {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
`

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link href="/">
          <a>Shortstories</a>
        </Link>
      </Logo>
      <Nav />
    </div>
  </StyledHeader>
)

export default Header
