import React from 'react'
import Router from 'next/router'
import { styled } from 'linaria/react'
import cn from 'classnames'
import { Query, Mutation } from 'react-apollo'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { Formik } from 'formik'
import gql from 'graphql-tag'
import { string } from 'prop-types'
import withDarkMode from '../hoc/with-dark-mode'
import Button from './Button'
import Error from './ErrorMessage'
import User from './User'
import PleaseSignIn from './PleaseSignIn'
import { STORY_DATA_QUERY } from './SingleStory'

const EDIT_STORY_MUTATION = gql`
  mutation EDIT_STORY_MUTATION(
    $id: ID!
    $body: String!
    $title: String!
    $genreId: ID!
  ) {
    updateStory(id: $id, body: $body, title: $title, genreId: $genreId) {
      id
      title
      body
    }
  }
`

const Wrapper = styled.div`
  background-color: #fff;
  transition: background-color 0.45s ease-in-out;
  min-height: 100vh;
  &.dark {
    background-color: #111;
  }
`

const FormStyles = styled.form`
  max-width: 700px;
  padding: 24px;
  padding-top: 104px;
  margin: 0 auto;
  display: grid;

  .title-block,
  .body-block {
    margin-bottom: 20px;
  }

  input,
  textarea {
    width: 100%;
    font-family: var(--text-font);
    border: none;
    outline: none;
    color: var(--black);
    background: transparent;
  }

  .title-block {
    input {
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 4px;
    }
  }

  .body-block {
    textarea {
      font-size: 2.1rem;
      line-height: 1.4;
      resize: none;
      min-height: 50vh;
    }
  }

  .error-message {
    color: var(--red);
    font-size: 1.2rem;
    font-weight: bold;
  }

  button {
    position: static;
    width: auto;
    margin: 30px 0;
    padding: 1px 0;
  }

  &.dark {
    input,
    textarea {
      color: var(--night-grey);
    }

    button {
      color: var(--black);
      background-color: var(--night-grey);
    }
  }
`

export const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Введите заголовок'
  }
  if (values.body.length < 1800) {
    errors.body = 'Слишком короткая история'
  }
  if (values.body.length > 40000) {
    errors.body = 'Слишком длинная история'
  }
  return errors
}

function StoryEditor({ mode, id }) {
  return (
    <User>
      {({ data: { me } }) => (
        <Query
          query={STORY_DATA_QUERY}
          variables={{ id }}
          fetchPolicy="cache-first"
        >
          {({ data }) => (
            <Mutation mutation={EDIT_STORY_MUTATION}>
              {(editStory, { loading, error }) => (
                <Formik
                  initialValues={{
                    title: data.story.title,
                    body: data.story.body,
                  }}
                  validate={validate}
                  isInitialValid={false}
                  onSubmit={async values => {
                    await editStory({ variables: { ...values, id } })
                    Router.push('/me')
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
                    <PleaseSignIn isAuth={!!me}>
                      <Wrapper className={cn({ dark: mode === 'dark' })}>
                        <FormStyles
                          className={cn({ dark: mode === 'dark' })}
                          onSubmit={handleSubmit}
                        >
                          <Error error={error} />
                          <div className="title-block">
                            <input
                              autoCapitalize="true"
                              autoComplete="new-password"
                              placeholder="Заголовок"
                              type="text"
                              name="title"
                              id="title"
                              value={values.title}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.title && touched.title && (
                              <span className="error-message">
                                {errors.title}
                              </span>
                            )}
                          </div>
                          <div className="body-block">
                            <ReactTextareaAutosize
                              placeholder="Расскажи историю..."
                              name="body"
                              id="body"
                              value={values.body}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.body && touched.body && (
                              <span className="error-message">
                                {errors.body}
                              </span>
                            )}
                          </div>
                          <Button loading={loading} type="submit">
                            Редактировать
                          </Button>
                        </FormStyles>
                      </Wrapper>
                    </PleaseSignIn>
                  )}
                </Formik>
              )}
            </Mutation>
          )}
        </Query>
      )}
    </User>
  )
}

StoryEditor.propTypes = {
  mode: string.isRequired,
  id: string.isRequired,
}

export default withDarkMode(StoryEditor)
