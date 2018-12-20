import React from 'react'
import styled from 'styled-components'
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
  a {
    position: relative;
    color: ${props => props.theme.yellow};
    &::after {
      content: '';
      border-bottom: 3px solid ${props => props.theme.yellow};
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
    <Query query={STORIES_QUERY} fetchPolicy="cache-first">
      {({ data: { stories }, loading, error, fetchMore }) => {
        if (loading) return <BigLoader />
        if (error) return <ErrorMessage error={error} />
        if (!stories.edges.length)
          return (
            <NoStories>
              <h2>No stories yet</h2>
              <Link href="/create-story">
                <a>
                  Be the first{' '}
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
