import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import cn from 'classnames'
import PropTypes from 'prop-types'
import ReactionButtonStyles from './styles/ReactionButtonStyles'
import { STORY_DATA_QUERY } from './SingleStory'

const LIKE_MUTATION = gql`
  mutation LIKE_MUTATION($id: ID!) {
    likeStory(id: $id) {
      id
      state
      userId
      storyId
    }
  }
`

function LikeButton({ id, qty, isLiked, night }) {
  const icon = isLiked
    ? '/static/images/icons/like-fill.svg'
    : '/static/images/icons/like.svg'
  return (
    <Mutation
      mutation={LIKE_MUTATION}
      variables={{ id }}
      refetchQueries={[
        { query: STORY_DATA_QUERY, variables: { id, limit: 10 } },
      ]}
    >
      {likeStory => (
        <ReactionButtonStyles className={cn({ night })}>
          <button
            type="button"
            onClick={() => {
              likeStory()
            }}
          >
            <img src={icon} alt="like" />
          </button>
          <span>{qty}</span>
        </ReactionButtonStyles>
      )}
    </Mutation>
  )
}

LikeButton.propTypes = {
  id: PropTypes.string.isRequired,
  qty: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
}

export default LikeButton
