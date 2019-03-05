import React from 'react'
import { Mutation } from 'react-apollo'
import { shape, string } from 'prop-types'
import SingleStory from '../components/SingleStory'
import { VIEW_MUTATION } from '../lib/mutations'

function Story({ query }) {
  return (
    <Mutation mutation={VIEW_MUTATION} variables={{ id: query.id }}>
      {viewStory => <SingleStory id={query.id} viewStory={viewStory} />}
    </Mutation>
  )
}

Story.propTypes = {
  query: shape({
    id: string.isRequired,
  }).isRequired,
}

export default Story
