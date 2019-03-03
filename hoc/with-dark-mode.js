import React, { useState, useEffect } from 'react'
import DarkModeHeader from '../components/DarkModeHeader'

function withDarkMode(Component) {
  return function WithDarkModeComponent(props) {
    const [mode, setMode] = useState('light')
    useEffect(() => {
      let initialMode
      const modeFromLS = localStorage.getItem('theme')
      const currentHour = new Date().getHours()

      if (currentHour >= 22) {
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
