import { styled } from 'linaria/react'
import PropTypes from 'prop-types'
import Verify from '../components/Verify'

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
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 380px));
  justify-content: center;
`

function VerifyPage({ query }) {
  return (
    <Wrapper>
      <Inner>
        <Columns>
          <Verify token={query.verifyToken} />
        </Columns>
      </Inner>
    </Wrapper>
  )
}

VerifyPage.propTypes = {
  query: PropTypes.shape({
    verifyToken: PropTypes.string.isRequired,
  }).isRequired,
}

export default VerifyPage
