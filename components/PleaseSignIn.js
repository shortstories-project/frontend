import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Signin from './Signin'

const PleaseSignInStyles = styled.div`
  padding: 10px;
  max-width: 380px;
  margin: 0 auto;
  position: absolute;
  top: calc(50vh / 2);
  left: 0;
  right: 0;
`

function PleaseSignIn({ isAuth, children }) {
  if (!isAuth) {
    return (
      <PleaseSignInStyles>
        <Signin />
      </PleaseSignInStyles>
    )
  }
  return children
}

PleaseSignIn.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}

export default PleaseSignIn
