import Link from 'next/link'
import Router from 'next/router'
import styled from 'styled-components'
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
  font-family: Pacifico, cursive;
  font-size: 30px;
  letter-spacing: -1.5px;
  margin-top: 14px;
  margin-bottom: 14px;
  margin-left: 2rem;
  position: relative;
  z-index: 2;

  a {
    padding: 0 1rem;
    color: #110000;
  }

  @media (max-width: 1300px) {
    padding: 1.2rem 0;
    margin: 0;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }
`

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 1;
  .bar {
    box-shadow: ${props => props.theme.bs};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
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
