import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import gql from 'graphql-tag'
import { Formik } from 'formik'
import { string } from 'prop-types'
import AuthForm from './styles/AuthForm'
import Input from './Input'
import Error from './ErrorMessage'
import Button from './Button'
import Logo from './Logo'
import { CURRENT_USER_QUERY } from './User'
import { password, login } from '../lib/validators'

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      id
      username
      email
    }
  }
`

const CHECK_USER_EXIST_MUTATION = gql`
  mutation CHECK_USER_EXIST_MUTATION($login: String!) {
    checkUserExist(login: $login)
  }
`

const Composed = adopt({
  // eslint-disable-next-line
  signInMutation: ({ render }) => (
    <Mutation
      mutation={SIGN_IN_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
  // eslint-disable-next-line
  checkUserExistMutation: ({ render }) => (
    <Mutation mutation={CHECK_USER_EXIST_MUTATION}>
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
})

function Signin({ returnUrl }) {
  return (
    <Composed>
      {({ signInMutation, checkUserExistMutation }) => (
        <Formik
          isInitialValid={false}
          initialValues={{ login: '', password: '' }}
          onSubmit={values => {
            signInMutation.mutation({ variables: { ...values } }).then(() => {
              if (returnUrl) {
                Router.replace(`/${returnUrl}`)
                return
              }
              Router.push('/')
            })
          }}
          render={props => (
            // eslint-disable-next-line
            <AuthForm onSubmit={props.handleSubmit}>
              <button
                type="button"
                className="back"
                onClick={() => {
                  Router.back()
                }}
              >
                <img src="/static/images/icons/left-arrow.svg" alt="Назад" />
              </button>
              <Logo />
              <Error error={signInMutation.result.error} />
              <Input
                name="login"
                label="Логин"
                validate={value =>
                  login(value, checkUserExistMutation.mutation)
                }
              />
              <Input
                name="password"
                label="Пароль"
                type="password"
                validate={password}
              />
              <div className="button-with-error">
                <Button loading={signInMutation.result.loading} type="submit">
                  Войти
                </Button>
              </div>
              {/* <p className="more-info">
              By continuing, you agree to Shortstories&apos;s{' '}
              <Link href="/terms-of-service">
                <a>Terms of Service</a>
              </Link>
              ,{' '}
              <Link href="/privacy-policy">
                <a>Privacy Policy</a>
              </Link>{' '}
              and{' '}
              <Link href="/use-cookie">
                <a>Cookie use</a>
              </Link>
              .
            </p> */}
              <Link href="/request-reset">
                <a className="forgotten-link">Забыли пароль?</a>
              </Link>
              <p className="signup-link">
                Нет аккаунта?{' '}
                <Link href="/signup">
                  <a>Зарегистрируйте</a>
                </Link>
                .
              </p>
            </AuthForm>
          )}
        />
      )}
    </Composed>
  )
}

Signin.propTypes = {
  returnUrl: string,
}

export default Signin
