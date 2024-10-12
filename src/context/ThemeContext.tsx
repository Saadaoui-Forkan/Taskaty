"use client"

import { createContext, useState } from "react"

export const ThemeContext = createContext({
    darkMode: false,
    toggleMode: () => {},
})

export const ThemeProvider = ({ children }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const [darkMode, setDarkMode] = useState(false)

    const toggleMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <ThemeContext.Provider value = {{toggleMode, darkMode}}>
            <div className={`${darkMode && "dark"}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}