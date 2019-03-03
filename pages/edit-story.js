import React from 'react'
import { shape, string } from 'prop-types'
import StoryEditor from '../components/StoryEditor'

function EditStory({ query }) {
  return <StoryEditor id={query.id} />
}

EditStory.propTypes = {
  query: shape({
    id: string.isRequired,
  }).isRequired,
}

export default EditStory
