import React from 'react'
import { styled } from 'linaria/react'
import cn from 'classnames'
import { string, bool, object, func, node } from 'prop-types'
import Loader from './Loader'

const StyledButton = styled.button`
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  height: 40px;
  color: var(--white);
  background-color: var(--black);
  transition: all 0.25s ease-out;
  &:hover {
    background-color: var(--soft-violet);
  }
  &:active {
    transform: scale(0.95);
  }

  &.loading {
    cursor: not-allowed;
    opacity: 0.7;
    pointer-events: none;
  }
`

const Button = ({
  className = '',
  children,
  disabled = false,
  type = 'button',
  loading = false,
  onClick,
  style = {},
}) => (
  <StyledButton
    className={cn(className, { loading })}
    onClick={onClick}
    disabled={disabled || loading}
    loading={loading}
    type={type}
    style={style}
  >
    {loading ? <Loader /> : children}
  </StyledButton>
)

Button.propTypes = {
  className: string,
  disabled: bool,
  type: string,
  loading: bool,
  onClick: func,
  children: node.isRequired,
  style: object,
}

export default Button
