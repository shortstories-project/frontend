import styled from 'styled-components'

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;
  a,
  button {
    text-align: center;
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    text-transform: uppercase;
    font-size: 12px;
    background: none;
    border: 0;
    cursor: pointer;
    color: ${props => props.theme.black};
    font-weight: 800;
    line-height: 14px;
    &:before {
      content: '';
      background-color: ${props => props.theme.black};
      width: 2px;
      height: 100%;
      left: 0;
      position: absolute;
      transform: skew(-20deg);
      top: 0;
      bottom: 0;
    }
    &:after {
      height: 2px;
      background: ${props => props.theme.purpleDark};
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 2rem;
    }
    &:hover,
    &:focus {
      outline: none;
      &:after {
        width: calc(100% - 60px);
      }
    }
  }
  .write img {
    width: 30px;
    height: 14px;
    position: relative;
    top: -1px;
  }
  @media (max-width: 1300px) {
    width: 100%;
    justify-content: center;
    font-size: 10px;
    > * {
      width: calc(100% / 3);
      padding: 10px;
      &:first-child::before {
        content: '';
        background-color: transparent;
        width: 2px;
        height: 100%;
        left: 0;
        position: absolute;
        transform: skew(-20deg);
        top: 0;
        bottom: 0;
      }
    }
  }
`

export default NavStyles
