import React, { Fragment, PureComponent } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Router from 'next/router'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import Error from './ErrorMessage'
import UserAndDate from './UserAndDate'
import Logo from './Logo'
import BigLoader from './BigLoader'
import LikeButton from './LikeButton'
import DislikeButton from './DislikeButton'
import Comments from './Comments'
import User from './User'

const STORY_DATA_QUERY = gql`
  query STORY_DATA_QUERY($id: ID!, $cursor: String, $limit: Int) {
    story(id: $id) {
      id
      title
      body
      stats {
        likes
        dislikes
        comments
      }
      user {
        ...author
      }
      createdAt
    }

    reactions(storyId: $id) {
      id
      state
      userId
      storyId
    }

    comments(cursor: $cursor, limit: $limit, storyId: $id)
      @connection(key: "CommentsConnection") {
      edges {
        id
        body
        user {
          ...author
        }
        createdAt
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }

  fragment author on User {
    id
    username
    photo
  }
`

const SingleStoryStyles = styled.div`
  max-width: 732px;
  margin: 0 auto;
  padding: 0 24px;
  padding-top: 104px;

  .title,
  .body-paragraph {
    font-family: Alegreya, serif;
    color: ${props => (props.night ? '#b8b8b8' : props.theme.black)};
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .title {
    font-size: 5rem;
    line-height: 5rem;
    font-weight: 600;
    margin: 20px 0;
  }

  .body-paragraph {
    margin-bottom: 2rem;
    font-size: 2.1rem;
    line-height: 1.4;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .author {
    display: flex;
    .avatar {
      width: 60px;
      height: 60px;
      display: block;
      margin-right: 15px;
      > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      p,
      a {
        font-size: 1.6rem;
        margin: 0;
      }
    }

    .created-at {
      color: #aaa;
      font-size: 1.2rem;
    }
  }
`

const Toolbar = styled.aside`
  > .reaction-buttons {
    display: flex;
    margin: 20px auto;
    max-width: 700px;
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

let prevScrollpos

try {
  prevScrollpos = window.pageYOffset
} catch (e) {
  // Nothing
}

class SingleStory extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
  }

  state = {
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

  render() {
    const { id } = this.props
    const { night } = this.state
    return (
      <User>
        {({ data: { me } }) => (
          <Query query={STORY_DATA_QUERY} variables={{ id, limit: 10 }}>
            {({ error, loading, data, fetchMore }) => {
              if (error) return <Error error={error} />
              if (loading) return <BigLoader />
              if (!data.story) return <p>Story not found</p>
              const { story, reactions, comments } = data
              return (
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
                  <SingleStoryStyles night={night}>
                    <Head>
                      <title>Shortstories | {story.title}</title>
                      <meta
                        name="title"
                        content={`Shortstories | ${story.title}`}
                      />
                      <meta
                        name="description"
                        content={`${story.body.slice(0, 100)}...`}
                      />
                      <meta
                        property="og:site_name"
                        content={`Shortstories | ${story.title}`}
                      />
                      <meta
                        property="og:title"
                        content={`Shortstories | ${story.title}`}
                      />
                      <meta
                        property="og:description"
                        content={`${story.body.slice(0, 100)}...`}
                      />
                      <meta
                        name="twitter:title"
                        content={`Shortstories | ${story.title}`}
                      />
                      <meta
                        name="twitter:text:title"
                        content={`Shortstories | ${story.title}`}
                      />
                      <meta
                        name="twitter:description"
                        content={`${story.body.slice(0, 100)}...`}
                      />
                    </Head>
                    <UserAndDate user={story.user} date={story.createdAt} />
                    <h1 className="title">{story.title}</h1>
                    {story.body
                      .split('\n')
                      .filter(paragraph => paragraph !== '')
                      .map((paragraph, index) => (
                        <p key={index} className="body-paragraph">
                          {paragraph}
                        </p>
                      ))}
                  </SingleStoryStyles>
                  {me && (
                    <Fragment>
                      <Toolbar>
                        <div className="reaction-buttons">
                          <LikeButton
                            night={night}
                            id={id}
                            qty={story.stats.likes}
                            isLiked={reactions.some(
                              reaction =>
                                reaction.userId === me.id &&
                                reaction.state === 'like'
                            )}
                            reactions={reactions}
                          />
                          <DislikeButton
                            night={night}
                            id={id}
                            qty={story.stats.dislikes}
                            isDisliked={reactions.some(
                              reaction =>
                                reaction.userId === me.id &&
                                reaction.state === 'dislike'
                            )}
                          />
                        </div>
                      </Toolbar>
                      <Comments
                        {...comments}
                        id={id}
                        me={me}
                        fetchMore={fetchMore}
                      />
                    </Fragment>
                  )}
                </Wrapper>
              )
            }}
          </Query>
        )}
      </User>
    )
  }
}

export default SingleStory
export { STORY_DATA_QUERY }
