import React, { createContext, useState } from "react";

const CandidateContext = createContext();

export const CandidateContextProvider = ({children}) => {
    const [filterRank, setFilterRank] = useState(null)
    const [shipTypeFilter, setShipTypeFilter] = useState(null)
    const [cocFilter,setCocFilter] = useState(null)
    const [copFilter, setCopFilter] = useState(null)
    const [watchKeepingFilter, setWatchKeepingFilter] = useState(null) 
    return(
        <CandidateContext.Provider value={{
            filterRank,
            setFilterRank,
            shipTypeFilter,
            setShipTypeFilter,
            cocFilter,
            setCocFilter,
            copFilter, 
            setCopFilter,
            watchKeepingFilter, 
            setWatchKeepingFilter
        }}>
            {children}
        </CandidateContext.Provider>
    )
}

export default CandidateContext