import React from 'react'
import Link from 'next/link'
import { styled } from 'linaria/react'

const StyledLogo = styled.h2`
  font-family: Pacifico, cursive;
  font-size: 30px;
  line-height: 30px;
  letter-spacing: -1.5px;
  color: var(--black);
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
