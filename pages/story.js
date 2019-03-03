import React from 'react'
import { shape, string } from 'prop-types'
import SingleStory from '../components/SingleStory'

function Story({ query }) {
  return <SingleStory id={query.id} />
}

Story.propTypes = {
  query: shape({
    id: string.isRequired,
  }).isRequired,
}

export default Story
