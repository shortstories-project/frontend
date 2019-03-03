import React from 'react'
import { css } from 'linaria'
import { node } from 'prop-types'

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
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .columns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 380px));
    justify-content: center;
  }
`

function CenterWrapper({ children }) {
  return (
    <main className={styles}>
      <div className="inner">
        <div className="columns">{children}</div>
      </div>
    </main>
  )
}

CenterWrapper.propTypes = {
  children: node.isRequired,
}

export default CenterWrapper
