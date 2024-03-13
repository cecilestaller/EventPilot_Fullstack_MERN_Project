import { createContext, useContext, useState } from "react";

const EventFetchContext = createContext()

export const useEventFetchContext = () => {
    const context = useContext(EventFetchContext)
    return context
}

export const EventFetchProvider = ({ children }) => {
    const [fetchEventData, setFetchEventData] = useState()
    return (
        <EventFetchContext.Provider value={{ fetchEventData, setFetchEventData }}>
            {children}
        </EventFetchContext.Provider>
    );
}