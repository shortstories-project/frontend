import React, { Component } from 'react'
import { shape, string } from 'prop-types'
import StoryEditor from '../components/StoryEditor'
import checkLoggedIn from '../lib/check-logged-in'
import redirect from '../lib/redirect'

class EditStoryPage extends Component {
  static async getInitialProps(ctx) {
    const { loggedInUser } = await checkLoggedIn(ctx.apolloClient)
    if (!loggedInUser.me) {
      redirect(ctx, '/signin?return=create-story')
    }
    return { loggedInUser }
  }

  static propTypes = {
    query: shape({
      id: string.isRequired,
    }).isRequired,
  }

  render() {
    const { query } = this.props
    return <StoryEditor id={query.id} />
  }
}

export default EditStoryPage
