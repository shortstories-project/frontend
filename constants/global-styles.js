import normalize from 'modern-normalize'
import { createGlobalStyle } from 'styled-components'
import theme from './theme'

export default createGlobalStyle`
  ${normalize};

  html {
    font-size: 10px;
    height: 100%;
  }

  body {
    font-size: 1.5rem;
    font-family: Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'
  }

  a {
    text-decoration: none;
    color: ${theme.purpleDark};
    font-weight: bold;
  }

  p {
    margin: 0;
  }

  .ReactModal__Body--open {
    overflow: hidden;
    position: fixed;
    width: 100%;
    height: 100%;
  }
`
