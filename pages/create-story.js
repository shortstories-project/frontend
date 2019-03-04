import React, { Component } from 'react'
import StoryCreator from '../components/StoryCreator'
import checkLoggedIn from '../lib/check-logged-in'
import redirect from '../lib/redirect'

class CreateStoryPage extends Component {
  static async getInitialProps(ctx) {
    const { loggedInUser } = await checkLoggedIn(ctx.apolloClient)
    if (!loggedInUser.me) {
      redirect(ctx, '/signin?return=create-story')
    }
    return { loggedInUser }
  }

  render() {
    return <StoryCreator />
  }
}

export default CreateStoryPage
