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

## Next-international
1. `npm i next-international`
2. in `src` create new folder `locales`
src/locales/client.ts
```"use client"
import { createI18nClient } from 'next-international/client'
 
export const { useI18n, useScopedI18n, I18nProviderClient } = createI18nClient({
  en: () => import('./en'),
  fr: () => import('./fr'),
  ar: () => import ('./ar'),
})```

src/locales/server.ts
```
import { createI18nServer } from 'next-international/server'
 
export const { getI18n, getScopedI18n, getStaticParams } = createI18nServer({
  en: () => import('./en'),
  fr: () => import('./fr'),
  ar: () => import ('./ar'),
})
```
src/locales/en.ts
````
export default {
    'hello': 'Hello',
} as const
```