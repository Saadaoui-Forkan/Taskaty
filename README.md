## Custom  dark/light mode
__tailwind.config.ts__
```
const config: Config = {
  --------
  plugins: [],
  darkMode: "class",
};
```

__globals.css__: animation when the mode change
```
* {
  @apply transition-colors duration-300
}
```

__src/context/ThemeContext.ts__
```
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
```

__layout.tsx__
```
<html lang="en">
    <body className={ubuntu.className}>
    <ThemeProvider>
        -----
    </ThemeProvider>
    </body>
</html>
```

__import darkMode & toggleMode__
```
const {darkMode, toggleMode} = useContext(ThemeContext)

{/* Settings Button */}
onClick={toggleDropdown}
```