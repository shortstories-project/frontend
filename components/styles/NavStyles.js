import { styled } from 'linaria/react'
import darken from 'polished/lib/color/darken'

const NavStyles = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: 1024px) {
    display: none;
  }
  a,
  button {
    margin-left: 30px;
    padding: 10px 0;
    position: relative;
    text-transform: uppercase;
    font-size: 12px;
    color: var(--black);
    font-weight: 800;
    &:after {
      content: '';
      width: 0;
      height: 2px;
      position: absolute;
      background: var(--soft-violet);
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 20px;
    }
    &:hover:after {
      width: 100%;
    }
  }
  .write,
  .signup {
    background-color: var(--soft-violet);
    color: var(--white);
    border-radius: 4px;
    display: block;
    padding: 0 12px;
    height: 28px;
    line-height: 28px;
    transition: background-color 0.25s ease;
    &:hover {
      background-color: ${darken(0.05, '#6d47d9')};
    }
    &:after {
      display: none;
    }
    &:hover:after {
      display: none;
    }
  }
`

export default NavStyles
