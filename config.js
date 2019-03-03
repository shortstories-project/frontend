export default (process.env.NODE_ENV === 'development'
  ? 'http://localhost:4444/graphql'
  : 'https://shortstories.io/graphql')
