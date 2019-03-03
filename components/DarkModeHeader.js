import React, { useRef, useEffect, useState } from 'react'
import Router from 'next/router'
import { styled } from 'linaria/react'
import cn from 'classnames'
import { string, func } from 'prop-types'
import Logo from './Logo'

const Header = styled.header`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  transition: top 0.3s, background-color 0.45s ease-in-out;
  width: 100%;
  background-color: #fff;
  z-index: 999;

  h2 {
    color: var(--black);
  }

  .back,
  .toggle-mode {
    position: absolute;
    background-size: contain;
  }

  .back {
    left: 24px;
    background-image: url('/static/images/icons/left-arrow.svg');
    width: 40px;
    height: 40px;
  }

  .toggle-mode {
    right: 24px;
    background-image: url('/static/images/icons/moon.svg');
    width: 34px;
    height: 34px;
  }

  &.dark {
    background-color: #111;
    h2 {
      color: var(--night-grey);
    }
    .back {
      background-image: url('/static/images/icons/left-arrow-grey.svg');
    }
    .toggle-mode {
      background-image: url('/static/images/icons/moon-grey.svg');
    }
  }
`

const isBrowser = process.browser

function setModeInLS(mode) {
  if (!isBrowser) return
  localStorage.setItem('theme', mode)
}

function DarkModeHeader({ mode, setMode }) {
  const headerEl = useRef(null)
  const [prev, setPrev] = useState(isBrowser ? window.pageYOffset : 0)
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
    <Header ref={headerEl} className={cn({ dark: mode === 'dark' })}>
      <button
        type="button"
        className="back"
        onClick={() => {
          Router.back()
        }}
      />
      <Logo />
      <button
        type="button"
        className="toggle-mode"
        onClick={() => {
          if (mode === 'light') {
            setMode('dark')
            setModeInLS('dark')
          } else {
            setMode('light')
            setModeInLS('light')
          }
        }}
      />
    </Header>
  )
}

DarkModeHeader.propTypes = {
  mode: string.isRequired,
  setMode: func.isRequired,
}

export default DarkModeHeader
