import { createContext, useState } from "react";

export const TextContext = createContext({
    text:true,
    handleTextChange:()=>{}
})

function TextContextProvider({children}){
    const [textState,setTextState] = useState(true)

    function handleTextChange(bool){
        setTextState(bool)
    }
    const value = {
        textState,
        handleTextChange
    }
    return (
        <TextContext.Provider value={value}>
            {children}
        </TextContext.Provider>
    )

}

export default TextContextProvider