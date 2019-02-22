import styled from 'styled-components'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import SingleStory from '../components/SingleStory'

const Wrapper = styled.div`
  background-color: #ffffff;
  > div {
    height: auto;
  }
`

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`

function Story({ query }) {
  return (
    <Wrapper>
      <Header />
      <Inner>
        <SingleStory id={query.id} />
      </Inner>
    </Wrapper>
  )
}

Story.propTypes = {
  query: PropTypes.shape().isRequired,
}

export default Story
