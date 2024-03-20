import { createContext, useContext, useState } from "react";

const SearchTermContext = createContext()

export const useSearchTermContext = () => {
    const context = useContext(SearchTermContext)
    return context
}

export const SearchTermProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState(null)
    return (
        <SearchTermContext.Provider value={{ searchTerm, setSearchTerm }}>
            {children}
        </SearchTermContext.Provider>
    );
}