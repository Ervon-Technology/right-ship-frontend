import React, { createContext, useState } from "react";

const CandidateContext = createContext();

export const CandidateContextProvider = ({children}) => {
    const [filterRank, setFilterRank] = useState(null)

    return(
        <CandidateContext.Provider value={{
            filterRank,
            setFilterRank
        }}>
            {children}
        </CandidateContext.Provider>
    )
}

export default CandidateContext