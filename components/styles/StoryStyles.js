import { styled } from 'linaria/react'

const StoryStyles = styled.div`
  cursor: pointer;
  opacity: 0.95;
  height: 450px;
  overflow: hidden;
  background: var(--white);
  padding: 25px;
  border-radius: 8px;
  transform: translateZ(0);
  transition: transform 0.3s ease, opacity 0.2s ease;
  transition-delay: 0.1s;

  &:hover {
    opacity: 1;
    transform: translate(0, -4px);
  }

  .title {
    margin: 10px 0;
    font-size: 2.4rem;
    font-weight: bold;
    font-family: var(--text-font);
    line-height: 1.2;
  }

  .body {
    font-size: 1.6rem;
    font-family: var(--text-font);
  }

  .edit-and-delete {
    display: flex;
    justify-content: flex-end;
    position: relative;
    margin-top: -20px;
    margin-right: -20px;
    margin-left: -20px;
    button {
      background-color: var(--white);
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.25s ease-in-out;
      img {
        width: 20px;
        height: 20px;
      }
      &:hover {
        background-color: var(--light-grey);
      }
    }
  }
`

export default StoryStyles
