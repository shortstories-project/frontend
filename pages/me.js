import { styled } from 'linaria/react'
import Header from '../components/Header'
import Account from '../components/Account'

const Wrapper = styled.div`
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
`

const Inner = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 2rem;
`

function Me() {
  return (
    <Wrapper>
      <Header />
      <Inner>
        <Account />
      </Inner>
    </Wrapper>
  )
}

export default Me
