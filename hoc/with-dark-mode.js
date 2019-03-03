import React, { useState, useEffect } from 'react'
import DarkModeHeader from '../components/DarkModeHeader'

const nightHours = [22, 23, 0, 1, 2, 3, 4, 5, 6, 7]

function withDarkMode(Component) {
  return function WithDarkModeComponent(props) {
    const [mode, setMode] = useState('light')
    useEffect(() => {
      let initialMode = 'light'
      const modeFromLS = localStorage.getItem('theme')
      const currentHour = new Date().getHours()

      if (nightHours.includes(currentHour)) {
        initialMode = 'dark'
      }

      if (modeFromLS) {
        initialMode = modeFromLS
      }

      if (mode !== modeFromLS) setMode(initialMode)
    }, [mode])
    return (
      <>
        <DarkModeHeader mode={mode} setMode={setMode} />
        <Component mode={mode} {...props} />
      </>
    )
  }
}

export default withDarkMode
