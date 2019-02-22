import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const StyledLogo = styled.h2`
  font-family: 'Pacifico', cursive;
  font-size: 3rem;
  line-height: 3rem;
  letter-spacing: -1.5px;
  color: ${props => props.theme.black};
  text-shadow: 3px 3px 0 rgba(200, 200, 200, 0.5);
  margin-top: 0;
  margin-bottom: 0;
  text-align: center;
`

function Logo() {
  return (
    <Link href="/">
      <a>
        <StyledLogo>Shortstories</StyledLogo>
      </a>
    </Link>
  )
}

export default Logo
