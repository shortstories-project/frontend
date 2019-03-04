import React, { useState } from 'react'
import Router from 'next/router'
import { styled } from 'linaria/react'
import cn from 'classnames'
import { Mutation, Query } from 'react-apollo'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { Formik } from 'formik'
import gql from 'graphql-tag'
import nanoid from 'nanoid'
import { string } from 'prop-types'
import withDarkMode from '../hoc/with-dark-mode'
import Autocomplete from './Autocomplete'
import Button from './Button'
import Error from './ErrorMessage'
import { STORIES_QUERY } from './Stories'
import { GENRES_QUERY } from '../lib/queries'

const CREATE_STORY_MUTATION = gql`
  mutation CREATE_STORY_MUTATION(
    $title: String!
    $body: String!
    $genreId: ID!
  ) {
    createStory(title: $title, body: $body, genreId: $genreId) {
      id
      body
      title
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
    > input {
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
  if (values.genreId === null) {
    errors.genreId = 'Выберите жанр'
  }
  return errors
}

function update(cache, payload) {
  try {
    const stories = cache.readQuery({ query: STORIES_QUERY })
    stories.stories.edges = [...stories.stories.edges, payload.data.createStory]
    cache.writeQuery({
      query: STORIES_QUERY,
      data: stories,
    })
  } catch (error) {
    // Nothing
  }
}

const INITIAL_VALUES = {
  title: '',
  body: '',
  genreId: null,
}

function StoryCreator({ mode }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [genreId, setGenreId] = useState(null)
  return (
    <Query query={GENRES_QUERY}>
      {({ data }) => {
        const { genres = [] } = data
        return (
          <Mutation
            mutation={CREATE_STORY_MUTATION}
            update={update}
            optimisticResponse={{
              __typename: 'Mutation',
              createStory: {
                __typename: 'Story',
                id: nanoid(10),
                title,
                body,
                genreId,
              },
            }}
          >
            {(createStory, { loading, error }) => (
              <Formik
                initialValues={INITIAL_VALUES}
                validate={validate}
                isInitialValid={false}
                onSubmit={async values => {
                  console.log(values.genreId)
                  await createStory({ variables: { ...values } })
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
                  setFieldValue,
                }) => (
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
                          onChange={event => {
                            handleChange(event)
                            setTitle(event.target.value)
                          }}
                          onBlur={handleBlur}
                        />
                        {errors.title && touched.title && (
                          <span className="error-message">{errors.title}</span>
                        )}
                      </div>
                      <div className="title-block">
                        <Autocomplete
                          items={genres}
                          stringField="name"
                          input={{ name: 'genre', placeholder: 'Выбери жанр' }}
                          onSelect={item => {
                            setFieldValue('genreId', item.id)
                            setGenreId(item.id)
                          }}
                        />
                        {errors.genreId && touched.genreId && (
                          <span className="error-message">
                            {errors.genreId}
                          </span>
                        )}
                      </div>
                      <div className="body-block">
                        <ReactTextareaAutosize
                          placeholder="Расскажи историю..."
                          name="body"
                          id="body"
                          value={values.body}
                          onChange={event => {
                            handleChange(event)
                            setBody(event.target.value)
                          }}
                          onBlur={handleBlur}
                        />
                        {errors.body && touched.body && (
                          <span className="error-message">{errors.body}</span>
                        )}
                      </div>
                      <Button loading={loading} type="submit">
                        Опубликовать
                      </Button>
                    </FormStyles>
                  </Wrapper>
                )}
              </Formik>
            )}
          </Mutation>
        )
      }}
    </Query>
  )
}

StoryCreator.propTypes = {
  mode: string.isRequired,
}

export default withDarkMode(StoryCreator)
