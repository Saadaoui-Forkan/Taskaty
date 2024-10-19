"use client"
import { Alert } from "@/utils/types";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"

type Props = {
    children: ReactNode;
};

type AppContextType = {
    darkMode: boolean,
    toggleMode: () => void,
    alert: Alert,
    setAlert: (alert: Alert) => void,
    username: string,
    setUsername: Dispatch<SetStateAction<string>>
} | null

export const AppContext = createContext<AppContextType>({
    darkMode: false,
    toggleMode: () => {},
    alert: {
        type: "",
        alertText: ""
    },
    setAlert: () => {},
    username: "",
    setUsername: () => {},
})

export const AppProvider = ({ children }: Props) => {
    const [darkMode, setDarkMode] = useState(false)
    const [alert, setAlert] = useState<Alert>({ type: "", alertText: "" });
    const [username, setUsername] = useState("")

    const toggleMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <AppContext.Provider value = {{toggleMode, darkMode, alert, setAlert, username, setUsername}}>
            <div className={`${darkMode && "dark"}`}>
                {children}
            </div>
        </AppContext.Provider>
    )
}