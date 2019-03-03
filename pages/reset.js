import React from 'react'
import { shape, string } from 'prop-types'
import CenterWrapper from '../components/CenterWrapper'
import Reset from '../components/Reset'

function ResetPage({ query }) {
  return (
    <CenterWrapper>
      <Reset token={query.resetToken} />
    </CenterWrapper>
  )
}

ResetPage.propTypes = {
  query: shape({
    resetToken: string.isRequired,
  }).isRequired,
}

export default ResetPage
