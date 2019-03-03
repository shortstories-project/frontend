import React from 'react'
import { shape, string } from 'prop-types'
import Wrapper from '../components/Wrapper'
import UserProfile from '../components/UserProfile'

function User({ query }) {
  return (
    <Wrapper>
      <UserProfile id={query.id} />
    </Wrapper>
  )
}

User.propTypes = {
  query: shape({
    id: string.isRequired,
  }).isRequired,
}

export default User
