import React from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { Formik } from 'formik'
import gql from 'graphql-tag'
import nanoid from 'nanoid'
import Button from './Button'
import Error from './ErrorMessage'
import User from './User'
import PleaseSignIn from './PleaseSignIn'
import { STORIES_QUERY } from './Stories'

const CREATE_STORY_MUTATION = gql`
  mutation CREATE_STORY_MUTATION($title: String!, $body: String!) {
    createStory(title: $title, body: $body) {
      id
      body
      title
    }
  }
`

const FormStyles = styled.form`
  max-width: 700px;
  margin: 0 auto;
  display: grid;

  .title-block,
  .body-block {
    margin-bottom: 20px;
  }

  input,
  textarea {
    width: 100%;
    font-family: 'Alegreya', serif;
    border: 3px solid ${props => props.theme.black};
    outline: none;
    color: ${props => props.theme.black};
  }

  .title-block {
    input {
      padding: 10px 20px;
      font-size: 3rem;
      margin-bottom: 4px;
    }
  }

  .body-block {
    textarea {
      font-size: 2.1rem;
      line-height: 1.4;
      padding: 10px 20px;
      resize: none;
      min-height: 60vh;
    }
  }

  .error-message {
    color: ${props => props.theme.red};
    font-size: 1.2rem;
    font-weight: bold;
  }
`

export const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Enter title'
  }
  if (values.body.length < 600) {
    errors.body = 'Too short story (min 600 symbols)'
  }
  if (values.body.length > 4000) {
    errors.body = 'Too long story (max 4000 symbols)'
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
}

class StoryCreator extends React.Component {
  state = INITIAL_VALUES

  changeLocalState = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { title, body } = this.state
    return (
      <User>
        {({ data: { me } }) => (
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
              },
            }}
          >
            {(createStory, { loading, error }) => (
              <Formik
                initialValues={INITIAL_VALUES}
                validate={validate}
                isInitialValid={false}
                onSubmit={async values => {
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
                }) => (
                  <PleaseSignIn isAuth={!!me}>
                    <FormStyles onSubmit={handleSubmit}>
                      <Error error={error} />
                      <div className="title-block">
                        <input
                          placeholder="Title"
                          type="text"
                          name="title"
                          id="title"
                          value={values.title}
                          onChange={event => {
                            handleChange(event)
                            this.changeLocalState(event)
                          }}
                          onBlur={handleBlur}
                        />
                        {errors.title && touched.title && (
                          <span className="error-message">{errors.title}</span>
                        )}
                      </div>
                      <div className="body-block">
                        <ReactTextareaAutosize
                          placeholder="Where is your mind?"
                          name="body"
                          id="body"
                          value={values.body}
                          onChange={event => {
                            handleChange(event)
                            this.changeLocalState(event)
                          }}
                          onBlur={handleBlur}
                        />
                        {errors.body && touched.body && (
                          <span className="error-message">{errors.body}</span>
                        )}
                      </div>
                      <Button loading={loading} type="submit">
                        Publish
                      </Button>
                    </FormStyles>
                  </PleaseSignIn>
                )}
              </Formik>
            )}
          </Mutation>
        )}
      </User>
    )
  }
}

export default StoryCreator
