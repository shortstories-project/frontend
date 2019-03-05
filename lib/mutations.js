import gql from 'graphql-tag'

export const VIEW_MUTATION = gql`
  mutation VIEW_MUTATION($id: ID!) {
    viewStory(id: $id) {
      id
    }
  }
`
