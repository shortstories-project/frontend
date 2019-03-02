import { styled } from 'linaria/react'

const ReactionButtonStyles = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  width: 60px;

  button {
    background-color: var(--white);
    border: 1px solid var(--black);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
    outline: none;
    box-shadow: 0 0 0 rgba(109, 71, 217, 0.4);
    animation: pulse 2s infinite;
    transform: scale(1);
    transition: transform 0.25s ease-in-out;
    &:hover {
      animation: none;
      transform: scale(1.06);
    }
    &:active {
      transform: scale(0.88);
    }

    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(109, 71, 217, 0.4);
      }
      70% {
        box-shadow: 0 0 0 7px rgba(204, 169, 44, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
      }
    }
  }

  span {
    color: var(--black);
    margin-left: 10px;
    font-weight: bold;
  }

  &.night {
    span {
      color: var(--night-grey);
    }
  }
`

export default ReactionButtonStyles
