import React from 'react'

const AmpContext = React.createContext(false)

export const AmpContextProvider = ({ children }) => (
  <AmpContext.Provider value={true}>{children}</AmpContext.Provider>
)

export const useAmp = () => {
  const ampContext = React.useContext(AmpContext)
  return ampContext ? true : false
}
