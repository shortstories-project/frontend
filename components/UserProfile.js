import React from 'react'
import { styled } from 'linaria/react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import BigLoader from './BigLoader'
import Error from './ErrorMessage'
import StoriesGrid from './StoriesGrid'
import getPhoto from '../lib/get-photo'

const USER_STORIES_QUERY = gql`
  query USER_STORIES_QUERY(
    $cursor: String
    $limit: Int
    $userId: ID
    $isLiked: Boolean
  ) {
    stories(cursor: $cursor, limit: $limit, userId: $userId, isLiked: $isLiked)
      @connection(key: "StoriesConnection") {
      edges {
        id
        title
        body
        user {
          ...author
        }
        genre {
          id
          name
        }
        stats {
          likes
          dislikes
          comments
          views
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

export const USER_QUERY = gql`
  query USER_QUERY($id: ID!) {
    user(id: $id) {
      id
      username
      photo
    }
  }
`

const UserProfileStyles = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  .photo-edit {
    position: relative;
    border: none;
    background: transparent;
    padding: 0;
    margin: 0;
    outline: none;
    width: 100px;
    height: 100px;
    .photo-icon {
      position: absolute;
      width: 40px;
      height: 40px;
      top: 30px;
      left: 30px;
      right: 0;
      bottom: 0;
    }
    .avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      box-shadow: var(--box-shadow);
    }
  }
  > p {
    color: var(--white);
  }
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    .username {
      color: var(--white);
      font-size: 3.6rem;
      font-weight: bold;
      margin-bottom: 10px;
    }
  }
`

function UserProfile({ id }) {
  return (
    <Query query={USER_QUERY} variables={{ id }}>
      {({ loading, error, data }) => {
        if (error) return <Error error={error} />
        if (loading) return <BigLoader />
        return (
          <UserProfileStyles>
            <div className="user-info">
              <div className="photo-edit">
                <img
                  className="avatar"
                  src={getPhoto(data.user.photo)}
                  alt={data.user.username}
                />
              </div>
              <span className="username">{data.user.username}</span>
            </div>
            <Query
              query={USER_STORIES_QUERY}
              variables={{ userId: id }}
              fetchPolicy="cache-and-network"
            >
              {({ data: { stories }, loading, error, fetchMore }) => {
                if (loading) return <BigLoader />
                if (error) return <Error error={error} />
                return !stories.edges.length ? (
                  <p>Нет рассказов</p>
                ) : (
                  <StoriesGrid {...stories} fetchMore={fetchMore} />
                )
              }}
            </Query>
          </UserProfileStyles>
        )
      }}
    </Query>
  )
}

UserProfile.propTypes = {
  id: PropTypes.string.isRequired,
}

export default UserProfile
