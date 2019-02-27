import React, { PureComponent } from 'react'
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
import Logo from './Logo'
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

const Wrapper = styled.div`
  background-color: ${props => (props.night ? '#111' : '#fff')};
  transition: background-color 0.45s ease-in-out;
  min-height: 100vh;
`

const Header = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  transition: top 0.3s, background-color 0.45s ease-in-out;
  width: 100%;
  background-color: ${props => (props.night ? '#111' : '#fff')};

  h2 {
    color: ${props => (props.night ? '#b8b8b8' : props.theme.black)};
  }

  .back {
    position: absolute;
    left: 24px;
    padding: 0;
    border: none;
    background-color: transparent;
    background-image: url(${props =>
      props.night
        ? '/static/images/icons/left-arrow-grey.svg'
        : '/static/images/icons/left-arrow.svg'});
    background-size: contain;
    width: 40px;
    height: 40px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .day-night {
    position: absolute;
    right: 24px;
    padding: 0;
    border: none;
    background-color: transparent;
    background-image: url(${props =>
      props.night
        ? '/static/images/icons/moon-grey.svg'
        : '/static/images/icons/moon.svg'});
    background-size: contain;
    width: 34px;
    height: 34px;
    img {
      width: 100%;
      height: 100%;
    }
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
    font-family: Alegreya, serif;
    border: none;
    outline: none;
    color: ${props => (props.night ? '#b8b8b8' : props.theme.black)};
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
    color: ${props => props.theme.red};
    font-size: 1.2rem;
    font-weight: bold;
  }

  button {
    position: static;
    width: auto;
    margin: 30px 0;
    padding: 1px 0;
    color: ${props => (props.night ? props.theme.black : props.theme.white)};
    background-color: ${props => (props.night ? '#b8b8b8' : props.theme.black)};
  }
`

export const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Введите заголовок'
  }
  if (values.body.length < 4000) {
    errors.body = 'Слишком короткая история'
  }
  if (values.body.length > 40000) {
    errors.body = 'Слишком длинная история'
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

let prevScrollpos

try {
  prevScrollpos = window.pageYOffset
} catch (e) {
  // Nothing
}

class StoryCreator extends PureComponent {
  state = {
    ...INITIAL_VALUES,
    night: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const currentScrollPos = window.pageYOffset
    if (prevScrollpos > currentScrollPos) {
      document.querySelector('.header').style.top = '0'
    } else {
      document.querySelector('.header').style.top = '-80px'
    }
    prevScrollpos = currentScrollPos
  }

  changeLocalState = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { title, body, night } = this.state
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
                    <Wrapper night={night}>
                      <Header className="header" night={night}>
                        <button
                          className="back"
                          type="button"
                          onClick={() => {
                            Router.back()
                          }}
                        />
                        <Logo />
                        <button
                          type="button"
                          className="day-night"
                          onClick={() => {
                            this.setState(state => ({
                              night: !state.night,
                            }))
                          }}
                        />
                      </Header>
                      <FormStyles night={night} onSubmit={handleSubmit}>
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
                              this.changeLocalState(event)
                            }}
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
                          Опубликовать
                        </Button>
                      </FormStyles>
                    </Wrapper>
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
