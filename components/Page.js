import React from 'react'
import { ThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'
import Meta from './Meta'
import GlobalStyles from '../constants/global-styles'
import theme from '../constants/theme'

// const StyledPage = styled.div`
//   ${props =>
//     props.isSingleStory
//       ? css`
//           background-color: #ffffff;
//           > div {
//             height: auto;
//           }
//         `
//       : css`
//           position: relative;
//           min-height: 100%;
//           &::before {
//             content: '';
//             background-image: url('/static/images/topography.svg'),
//               linear-gradient(20deg, rgb(69, 104, 220), rgb(176, 106, 179));
//             background-size: 300px, auto;
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             will-change: transform;
//             z-index: -1;
//           }
//         `};
//   color: ${props => props.theme.black};
// `

// const Inner = styled.div`
//   ${props =>
//     props.withHeader
//       ? css`
//           max-width: ${props.theme.maxWidth};
//           margin: 0 auto;
//           padding: 2rem;
//         `
//       : css`
//           height: 100vh;
//           width: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         `};
// `

const Page = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <>
          <Meta />
          {children}
        </>
      </ThemeProvider>
      <GlobalStyles />
    </>
  )
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Page
