import React, { Fragment } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import Error from './ErrorMessage'
import UserAndDate from './UserAndDate'
import BigLoader from './BigLoader'
import LikeButton from './LikeButton'
import DislikeButton from './DislikeButton'
import Comments from './Comments'
import User from './User'

const STORY_DATA_QUERY = gql`
  query STORY_DATA_QUERY($id: ID!, $cursor: String, $limit: Int) {
    story(id: $id) {
      id
      title
      body
      stats {
        likes
        dislikes
        comments
      }
      user {
        ...author
      }
      createdAt
    }

    reactions(storyId: $id) {
      id
      state
      userId
      storyId
    }

    comments(cursor: $cursor, limit: $limit, storyId: $id)
      @connection(key: "CommentsConnection") {
      edges {
        id
        body
        user {
          ...author
        }
        createdAt
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }

  fragment author on User {
    id
    username
    photo
  }
`

const SingleStoryStyles = styled.div`
  max-width: 700px;
  margin: 0 auto;

  .title,
  .body-paragraph {
    font-family: 'Alegreya', serif;
    color: ${props => props.theme.black};
  }

  .title {
    font-size: 5rem;
    line-height: 5rem;
    font-weight: 600;
    margin: 20px 0;
  }

  .body-paragraph {
    margin-bottom: 2rem;
    font-size: 2.1rem;
    line-height: 1.4;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .author {
    display: flex;
    .avatar {
      width: 60px;
      height: 60px;
      display: block;
      margin-right: 15px;
      > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      p,
      a {
        font-size: 1.6rem;
        margin: 0;
      }
    }

    .created-at {
      color: #aaa;
      font-size: 1.2rem;
    }
  }
`

const Toolbar = styled.aside`
  > .reaction-buttons {
    display: flex;
    margin: 20px auto;
    max-width: 700px;
  }
`

const SingleStory = ({ id }) => (
  <User>
    {({ data: { me } }) => (
      <Query query={STORY_DATA_QUERY} variables={{ id, limit: 10 }}>
        {({ error, loading, data, fetchMore }) => {
          if (error) return <Error error={error} />
          if (loading) return <BigLoader />
          if (!data.story) return <p>Story not found</p>
          const { story, reactions, comments } = data
          return (
            <Fragment>
              <SingleStoryStyles>
                <Head>
                  <title>Shortstories | {story.title}</title>
                </Head>
                <UserAndDate user={story.user} date={story.createdAt} />
                <h1 className="title">{story.title}</h1>
                {story.body
                  .split('\n')
                  .filter(paragraph => paragraph !== '')
                  .map((paragraph, index) => (
                    <p key={index} className="body-paragraph">
                      {paragraph}
                    </p>
                  ))}
              </SingleStoryStyles>
              {me && (
                <Fragment>
                  <Toolbar>
                    <div className="reaction-buttons">
                      <LikeButton
                        id={id}
                        qty={story.stats.likes}
                        isLiked={reactions.some(
                          reaction =>
                            reaction.userId === me.id &&
                            reaction.state === 'like'
                        )}
                        reactions={reactions}
                      />
                      <DislikeButton
                        id={id}
                        qty={story.stats.dislikes}
                        isDisliked={reactions.some(
                          reaction =>
                            reaction.userId === me.id &&
                            reaction.state === 'dislike'
                        )}
                      />
                    </div>
                  </Toolbar>
                  <Comments
                    {...comments}
                    id={id}
                    me={me}
                    fetchMore={fetchMore}
                  />
                </Fragment>
              )}
            </Fragment>
          )
        }}
      </Query>
    )}
  </User>
)

SingleStory.propTypes = {
  id: PropTypes.string.isRequired,
}

export default SingleStory
export { STORY_DATA_QUERY }
