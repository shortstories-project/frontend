export default (process.env.NODE_ENV === 'development'
  ? 'http://localhost:4444/graphql'
  : process.env.API_URL)
