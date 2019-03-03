import React, { useEffect, useRef, useState } from 'react'
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
  margin: 0;
  font-family: var(--logo-font);
  font-size: 3rem;
  letter-spacing: -1.5px;
  position: relative;
  z-index: 2;

  a {
    color: var(--black);
  }
`

const StyledHeader = styled.header`
  height: 64px;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: var(--white);
  z-index: 1;
  display: flex;
  align-items: center;
  transition: top 0.3s;
  .bar {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
    max-width: 1024px;
    padding: 0 24px;
    margin: 0 auto;
  }
`

function Header() {
  const headerEl = useRef(null)
  const [prev, setPrev] = useState(process.browser ? window.pageYOffset : 0)
  function handlePageScroll() {
    if (headerEl.current === null) return
    const curr = window.pageYOffset
    if (curr <= 0 || prev > curr) {
      headerEl.current.style.top = '0'
    } else {
      headerEl.current.style.top = '-64px'
    }
    setPrev(curr)
  }
  useEffect(() => {
    window.addEventListener('scroll', handlePageScroll)

    return function cleanup() {
      window.removeEventListener('scroll', handlePageScroll)
    }
  })
  return (
    <StyledHeader ref={headerEl}>
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
}

export default Header
