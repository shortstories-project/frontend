import React from 'react'
import { styled } from 'linaria/react'
import Link from 'next/link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import BigLoader from './BigLoader'
import StoriesGrid from './StoriesGrid'
import ErrorMessage from './ErrorMessage'

export const STORIES_QUERY = gql`
  query STORIES_QUERY(
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
        stats {
          likes
          dislikes
          comments
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

const NoStories = styled.div`
  h2 {
    color: var(--white);
  }

  a {
    position: relative;
    color: var(--yellow);
    &::after {
      content: '';
      border-bottom: 3px solid var(--yellow);
      position: absolute;
      width: 0%;
      bottom: -1px;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
    }

    &:hover::after {
      width: 100%;
    }
  }
`

function Stories() {
  return (
    <Query query={STORIES_QUERY}>
      {({ data: { stories }, loading, error, fetchMore }) => {
        if (loading) return <BigLoader />
        if (error) return <ErrorMessage error={error} />
        if (!stories.edges.length)
          return (
            <NoStories>
              <h2>Пока что нет историй :(</h2>
              <Link href="/create-story">
                <a>
                  Стань первым{' '}
                  <span role="img" aria-label="fire">
                    🔥
                  </span>
                </a>
              </Link>
            </NoStories>
          )
        return <StoriesGrid {...stories} fetchMore={fetchMore} />
      }}
    </Query>
  )
}

export default Stories
