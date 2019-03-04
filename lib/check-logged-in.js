import { CHECK_LOGGED_IN_QUERY } from './queries'

export default apolloClient =>
  apolloClient
    .query({ query: CHECK_LOGGED_IN_QUERY })
    .then(({ data }) => ({ loggedInUser: data }))
    .catch(() => ({ loggedInUser: {} }))
