import gql from 'graphql-tag'

export const GENRES_QUERY = gql`
  query GENRES_QUERY {
    genres {
      id
      name
    }
  }
`

export const CHECK_LOGGED_IN_QUERY = gql`
  query CHECK_LOGGED_IN_QUERY {
    me {
      id
    }
  }
`
