import React from 'react'
import PropTypes from 'prop-types'
import SingleStory from '../components/SingleStory'

function Story({ query }) {
  return <SingleStory id={query.id} />
}

Story.propTypes = {
  query: PropTypes.shape().isRequired,
}

export default Story
