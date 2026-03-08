import { createContext, useContext, useState } from "react";

// create theme context
const ThemeContext = createContext()


// create custom hook
export const useTheme=()=>{
    return useContext(ThemeContext)
}

// create provider
export const ThemeProvider = ({children})=>{
    const [theme,setTheme] = useState("light")

    const toggleTheme = () =>{
        setTheme((prev)=> (prev == 'light'?'dark':'light'))

    }

    return (
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
