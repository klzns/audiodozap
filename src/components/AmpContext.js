import React from 'react'

const AmpContext = React.createContext(false)

export const AmpContextProvider = ({ children }) => (
  // eslint-disable-next-line react/jsx-boolean-value
  <AmpContext.Provider value={true}>{children}</AmpContext.Provider>
)

export const useAmp = () => {
  const ampContext = React.useContext(AmpContext)
  return Boolean(ampContext)
}
