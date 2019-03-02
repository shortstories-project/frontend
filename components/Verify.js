import React, { Component } from 'react'
import { styled } from 'linaria/react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import Error from './ErrorMessage'
import Loader from './Loader'
import Logo from './Logo'

const Block = styled.div`
  min-height: 204px;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 2px 10px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    margin-top: 20px;
  }

  h3 {
    font-size: 16px;
    margin-bottom: 0;
  }
`

const VERIFY_MUTATION = gql`
  mutation VERIFY_MUTATION($token: String!) {
    verifyUser(token: $token) {
      id
    }
  }
`

class DoMutation extends Component {
  static propTypes = {
    verify: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { verify } = this.props
    verify()
  }

  render() {
    return null
  }
}

function Verify({ token }) {
  return (
    <Block>
      <Logo />
      {!token ? (
        <h3>Verify token not found</h3>
      ) : (
        <Mutation mutation={VERIFY_MUTATION} variables={{ token }}>
          {(verify, { data, loading, error }) => (
            <>
              <DoMutation verify={verify} />
              <div>
                <Error error={error} />
                {loading && <Loader />}
                {data && (
                  <h3>
                    Your account has been verified{' '}
                    <span aria-label="fire" role="img">
                      🔥
                    </span>
                  </h3>
                )}
              </div>
            </>
          )}
        </Mutation>
      )}
    </Block>
  )
}

Verify.propTypes = {
  token: PropTypes.string.isRequired,
}

export default Verify
