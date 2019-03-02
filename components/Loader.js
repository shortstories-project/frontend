import React from 'react'
import { styled } from 'linaria/react'

const StyledLoader = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
`

const Outer = styled.div`
  position: absolute;
  border: 4px solid var(--pink);
  border-left-color: transparent;
  border-bottom: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  animation: outerspin 1s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite;

  @keyframes outerspin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const Inner = styled.div`
  position: absolute;
  border: 4px solid var(--pink);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  left: calc(50% - 10px);
  top: calc(50% - 10px);
  border-right: 0;
  border-top-color: transparent;
  animation: innerspin 1.5s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite;

  @keyframes innerspin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
`

const Loader = () => (
  <StyledLoader>
    <Outer />
    <Inner />
  </StyledLoader>
)

export default Loader
