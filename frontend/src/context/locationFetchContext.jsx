import { createContext, useContext, useState } from "react";

const locationFetchContext = createContext()

export const useLocationFetchContext = () => {
    const context = useContext(locationFetchContext)
    return context
}

export const LocationFetchProvider = ({ children }) => {
    const [fetchLocationData, setFetchLocationData] = useState([])
    return (
        <locationFetchContext.Provider value={{ fetchLocationData, setFetchLocationData }}>
            {children}
        </locationFetchContext.Provider>
    );
}