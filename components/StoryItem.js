import React, { Fragment } from 'react'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { bool, string, number, shape } from 'prop-types'
import UserAndDate from './UserAndDate'
import StoryStyles from './styles/StoryStyles'
import ToolsBar from './styles/ToolsBar'
import { STORIES_QUERY } from './Stories'
import user from '../types/user'

const DELETE_STORY_MUTATION = gql`
  mutation DELETE_STORY_MUTATION($id: ID!) {
    deleteStory(id: $id) {
      id
    }
  }
`

function update(cache, payload) {
  const data = cache.readQuery({ query: STORIES_QUERY })
  data.stories.edges = data.stories.edges.filter(
    story => story.id !== payload.data.deleteStory.id
  )
  cache.writeQuery({
    query: STORIES_QUERY,
    data,
  })
}

function StoryItem({
  isStoryOwner = false,
  id,
  user,
  stats,
  createdAt,
  title,
  body,
  genre,
}) {
  return (
    <StoryStyles
      onClick={() => {
        Router.push(`/story?id=${id}`)
      }}
    >
      {isStoryOwner ? (
        <div className="edit-and-delete">
          <button
            type="button"
            onClick={event => {
              event.stopPropagation()
              Router.push(`/edit-story?id=${id}`)
            }}
          >
            <img src="/static/images/icons/edit.svg" alt="Edit" />
          </button>
          <Mutation
            mutation={DELETE_STORY_MUTATION}
            variables={{ id }}
            update={update}
            optimisticResponse={{
              __typename: 'Mutation',
              deleteStory: {
                __typename: 'Story',
                id,
              },
            }}
          >
            {deleteStory => (
              <button
                type="button"
                onClick={event => {
                  event.stopPropagation()
                  deleteStory()
                }}
              >
                <img src="/static/images/icons/cross.svg" alt="Delete" />
              </button>
            )}
          </Mutation>
        </div>
      ) : (
        <UserAndDate user={user} date={createdAt} />
      )}
      <h2 className="title">{title}</h2>
      {genre && <span className="genre">{genre.name}</span>}
      <p className="body">{body}</p>
      <ToolsBar>
        <div className="buttons-container">
          <div>
            <img src="/static/images/icons/eye.svg" alt="Просмотры" />
            <span>{stats.views}</span>
          </div>
          <div>
            <img src="/static/images/icons/like-fill-grey.svg" alt="Лайки" />
            <span>{stats.likes}</span>
          </div>
          <div>
            <img
              src="/static/images/icons/dislike-fill-grey.svg"
              alt="Дизлайки"
            />
            <span>{stats.dislikes}</span>
          </div>
          <div>
            <img
              src="/static/images/icons/comment-fill-grey.svg"
              alt="Комменты"
            />
            <span>{stats.comments}</span>
          </div>
        </div>
      </ToolsBar>
    </StoryStyles>
  )
}

StoryItem.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
  body: string.isRequired,
  createdAt: string.isRequired,
  user: user.isRequired,
  stats: shape({
    comments: number,
    likes: number,
    dislikes: number,
  }),
  isStoryOwner: bool.isRequired,
}

export default StoryItem
