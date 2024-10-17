"use client"
import { Alert } from "@/utils/types";
import { createContext, ReactNode, useState } from "react"

type Props = {
    children: ReactNode;
};

type AppContextType = {
    darkMode: boolean,
    toggleMode: () => void,
    alert: Alert,
    setAlert: (alert: Alert) => void,
} | null

export const AppContext = createContext<AppContextType>({
    darkMode: false,
    toggleMode: () => {},
    alert: {
        type: "",
        alertText: ""
    },
    setAlert: () => {},
})

export const AppProvider = ({ children }: Props) => {
    const [darkMode, setDarkMode] = useState(false)
    const [alert, setAlert] = useState<Alert>({ type: "", alertText: "" });

    const toggleMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <AppContext.Provider value = {{toggleMode, darkMode, alert, setAlert}}>
            <div className={`${darkMode && "dark"}`}>
                {children}
            </div>
        </AppContext.Provider>
    )
}