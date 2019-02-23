import React, { PureComponent, Fragment } from 'react'
import { ThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'
import Meta from './Meta'
import GlobalStyles from '../constants/global-styles'
import theme from '../constants/theme'

class Page extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  componentDidMount() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => {
          console.log('service worker registration successful')
        })
        .catch(err => {
          console.warn('service worker registration failed', err.message)
        })
    }
  }

  render() {
    const { children } = this.props
    return (
      <Fragment>
        <ThemeProvider theme={theme}>
          <Fragment>
            <Meta />
            {children}
          </Fragment>
        </ThemeProvider>
        <GlobalStyles />
      </Fragment>
    )
  }
}

export default Page
