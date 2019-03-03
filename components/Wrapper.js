import React from 'react'
import { css } from 'linaria'
import { node } from 'prop-types'
import Header from './Header'

const styles = css`
  position: relative;
  min-height: 100%;
  color: var(--black);
  &::before {
    content: '';
    background-image: url('/static/images/topography.svg'),
      linear-gradient(20deg, rgb(20, 20, 20), rgb(20, 20, 20));
    background-size: 300px, auto;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    will-change: transform;
    z-index: -1;
  }

  .inner {
    max-width: 1024px;
    margin: 0 auto;
    margin-top: 64px;
    padding: 20px;
  }
`

function Wrapper({ children }) {
  return (
    <main className={styles}>
      <Header />
      <div className="inner">{children}</div>
    </main>
  )
}

Wrapper.propTypes = {
  children: node.isRequired,
}

export default Wrapper
