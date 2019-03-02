import React, { Fragment, PureComponent } from 'react'
import { styled } from 'linaria/react'
import Head from 'next/head'
import Router from 'next/router'
import { Query } from 'react-apollo'
import cn from 'classnames'
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
    font-family: var(--text-font);
    color: var(--black);
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

  &.night {
    .title,
    .body-paragraph {
      color: var(--night-grey);
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
  background-color: #fff;
  transition: background-color 0.45s ease-in-out;
  min-height: 100vh;

  &.night {
    background-color: #111;
  }
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
  background-color: #fff;

  h2 {
    color: var(--black);
  }

  .back,
  .day-night {
    position: absolute;
    background-size: contain;
  }

  .back {
    left: 24px;
    background-image: url('/static/images/icons/left-arrow.svg');
    width: 40px;
    height: 40px;
  }

  .day-night {
    right: 24px;
    background-image: url('/static/images/icons/moon.svg');
    width: 34px;
    height: 34px;
  }

  &.night {
    background-color: #111;
    h2 {
      color: var(--night-grey);
    }
    .back {
      background-image: url('/static/images/icons/left-arrow-grey.svg');
    }
    .day-night {
      background-image: url('/static/images/icons/moon-grey.svg');
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
    if (currentScrollPos <= 0 || prevScrollpos > currentScrollPos) {
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
                <Wrapper className={cn({ night })}>
                  <Header className={cn('header', { night })}>
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
                  <SingleStoryStyles className={cn({ night })}>
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
