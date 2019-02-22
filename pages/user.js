import styled from 'styled-components'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import UserProfile from '../components/UserProfile'

const Wrapper = styled.div`
  position: relative;
  min-height: 100%;
  color: ${props => props.theme.black};
  &::before {
    content: '';
    background-image: url('/static/images/topography.svg'),
      linear-gradient(20deg, rgb(69, 104, 220), rgb(176, 106, 179));
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
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`

function User({ query }) {
  return (
    <Wrapper>
      <Header />
      <Inner>
        <UserProfile id={query.id} />
      </Inner>
    </Wrapper>
  )
}

User.propTypes = {
  query: PropTypes.shape().isRequired,
}

export default User
