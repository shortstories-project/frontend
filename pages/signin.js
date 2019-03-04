import React from 'react'
import { shape, string } from 'prop-types'
import CenterWrapper from '../components/CenterWrapper'
import Signin from '../components/Signin'

function SigninPage({ query }) {
  return (
    <CenterWrapper>
      <Signin returnUrl={query.return} />
    </CenterWrapper>
  )
}

SigninPage.propTypes = {
  query: shape({
    return: string,
  }).isRequired,
}

export default SigninPage
