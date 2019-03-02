import { styled } from 'linaria/react'

const AuthForm = styled.form`
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 2px 10px;
  padding: 40px;
  .back {
    display: none;
  }
  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .back {
      background: transparent;
      border: none;
      padding: 0;
      display: block;
      width: 40px;
      height: 40px;
      position: absolute;
      top: 5px;
      left: 10px;
      img {
        width: 70%;
        height: 70%;
      }
    }
  }

  .logo {
    cursor: default;
    font-family: var(--logo-font);
    font-size: 3rem;
    line-height: 3rem;
    letter-spacing: -1.5px;
    color: var(--black);
    text-shadow: 3px 3px 0 rgba(200, 200, 200, 0.5);
    margin-top: 0;
    margin-bottom: 0;
    text-align: center;
  }

  .button-with-error {
    margin: 12px 0;
    display: flex;
    flex-direction: column;
    > div {
      margin-top: 4px;
    }
  }

  .more-info,
  .forgotten-link,
  .signup-link {
    font-size: 12px;
    line-height: 2;
    text-align: center;
    display: block;
  }

  .signup-link {
    margin-bottom: 0;
  }

  p {
    cursor: default;
  }

  .button-wrapper {
    margin-top: 12px;

    > button {
      width: calc(50% - 10px);
      margin-right: 20px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .success-message {
    > p {
      margin: 0;
      span {
        color: var(--soft-violet);
      }
    }
    @media (max-width: 768px) {
      text-align: center;
    }
  }
`

export default AuthForm
