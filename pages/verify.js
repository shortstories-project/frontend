import React from 'react'
import { shape, string } from 'prop-types'
import CenterWrapper from '../components/CenterWrapper'
import Verify from '../components/Verify'

function VerifyPage({ query }) {
  return (
    <CenterWrapper>
      <Verify token={query.verifyToken} />
    </CenterWrapper>
  )
}

VerifyPage.propTypes = {
  query: shape({
    verifyToken: string.isRequired,
  }).isRequired,
}

export default VerifyPage
