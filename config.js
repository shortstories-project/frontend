export default (process.env.NODE_ENV === 'production'
  ? 'https://shortstories.io/graphql'
  : 'http://localhost:4444/graphql')
