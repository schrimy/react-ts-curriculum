import React from 'react'

const ThemeContext = React.createContext<string>("light")

export default ThemeContext
export const ThemeConsumer = ThemeContext.Consumer
export const ThemeProvider = ThemeContext.Provider