import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import gql from 'graphql-tag'
import { Formik } from 'formik'
import AuthForm from './styles/AuthForm'
import Input from './Input'
import Error from './ErrorMessage'
import Button from './Button'
import Logo from './Logo'
import { CURRENT_USER_QUERY } from './User'
import {
  isEmail,
  username,
  password,
  confirmationPassword,
} from '../lib/validators'

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $username: String!
    $email: String!
    $password: String!
  ) {
    signUp(username: $username, email: $email, password: $password) {
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
  signUpMutation: ({ render }) => (
    <Mutation
      mutation={SIGN_UP_MUTATION}
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

const Signup = () => (
  <Composed>
    {({ signUpMutation, checkUserExistMutation }) => (
      <Formik
        isInitialValid={false}
        initialValues={{
          username: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        }}
        onSubmit={values => {
          signUpMutation.mutation({ variables: { ...values } }).then(() => {
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
            <Error error={signUpMutation.result.error} />
            <Input
              name="username"
              label="Псевдоним"
              validate={value =>
                username(value, checkUserExistMutation.mutation)
              }
            />
            <Input
              name="email"
              type="email"
              label="E-mail"
              validate={value =>
                isEmail(value, checkUserExistMutation.mutation)
              }
            />
            <Input
              name="password"
              type="password"
              label="Пароль"
              validate={password}
            />
            <Input
              name="passwordConfirmation"
              type="password"
              label="Подтвердите пароль"
              validate={value =>
                // eslint-disable-next-line
                confirmationPassword(value, props.values.password)
              }
            />
            <div className="button-with-error">
              <Button loading={signUpMutation.result.loading} type="submit">
                Зарегистрироваться
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
            <p className="signup-link">
              Уже есть аккаунт?{' '}
              <Link href="/signin">
                <a>Войдите</a>
              </Link>
              .
            </p>
          </AuthForm>
        )}
      />
    )}
  </Composed>
)

export default Signup
export { CHECK_USER_EXIST_MUTATION }
