import React, { Fragment } from 'react'
import { styled } from 'linaria/react'
import Link from 'next/link'
import User from './User'
import Signout from './Signout'
import NavStyles from './styles/NavStyles'

const MobileMenu = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .content {
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1500;
      opacity: 0;
      width: 0;
      transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .content > ul {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      width: 100%;
      a,
      button {
        display: inline-flex;
        line-height: 22px;
        font-size: 15px;
        color: var(--black);
        text-decoration: none;
        position: relative;
        left: 0;
        margin-bottom: 32px;
        font-weight: bold;
      }

      .write,
      .signup {
        color: var(--soft-violet);
      }
    }

    .checkbox {
      display: none;
    }

    .button {
      background-color: var(--white);
      height: 3rem;
      width: 3rem;
      position: fixed;
      border-radius: 50%;
      z-index: 2000;
      text-align: center;
      cursor: pointer;
    }

    .background {
      height: 2.8rem;
      width: 2.8rem;
      border-radius: 50%;
      position: fixed;
      background-color: var(--white);
      z-index: 1000;
      transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);
    }

    .checkbox:checked ~ .background {
      transform: scale(80);
    }

    .checkbox:checked ~ .content {
      opacity: 1;
      width: 100%;
    }

    .icon {
      position: relative;
      margin-top: 14px;
    }

    .icon,
    .icon::before,
    .icon::after {
      width: 25px;
      height: 2px;
      background-color: #333;
      display: inline-block;
    }

    .icon::before,
    .icon::after {
      content: '';
      position: absolute;
      left: 0;
      transition: all 0.2s;
    }

    .icon::before {
      top: -8px;
    }

    .icon::after {
      top: 8px;
    }

    .button:hover .icon::before {
      top: -10px;
    }

    .button:hover .icon::after {
      top: 10px;
    }

    .checkbox:checked + .button .icon {
      background-color: transparent;
    }

    .checkbox:checked + .button .icon::before {
      top: 0;
      transform: rotate(135deg);
    }

    .checkbox:checked + .button .icon::after {
      top: 0;
      transform: rotate(-135deg);
    }
  }
`

function Nav() {
  return (
    <User>
      {({ data: { me } }) => (
        <Fragment>
          <MobileMenu>
            <input className="checkbox" type="checkbox" id="toggle" />
            {/* eslint-disable-next-line */}
            <label className="button" htmlFor="toggle">
              <span className="icon">&nbsp;</span>
            </label>
            <div className="background">&nbsp;</div>
            <nav className="content">
              <ul>
                {me && (
                  <Fragment>
                    <li>
                      <Link href="/create-story">
                        <a className="write">Написать рассказ</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/me">
                        <a>Профиль</a>
                      </Link>
                    </li>
                    <li>
                      <Signout />
                    </li>
                  </Fragment>
                )}
                {!me && (
                  <Fragment>
                    <li>
                      <Link href="/signup">
                        <a className="signup">Регистрация</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/signin">
                        <a>Вход</a>
                      </Link>
                    </li>
                  </Fragment>
                )}
              </ul>
            </nav>
          </MobileMenu>
          <NavStyles>
            {me && (
              <Fragment>
                <Link href="/create-story">
                  <a className="write">Написать рассказ</a>
                </Link>
                <Link href="/me">
                  <a>Профиль</a>
                </Link>
                <Signout />
              </Fragment>
            )}
            {!me && (
              <Fragment>
                <Link href="/signup">
                  <a className="signup">Регистрация</a>
                </Link>
                <Link href="/signin">
                  <a>Вход</a>
                </Link>
              </Fragment>
            )}
          </NavStyles>
        </Fragment>
      )}
    </User>
  )
}

export default Nav
