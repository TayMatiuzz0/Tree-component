import { useContext, useState } from "react";
import { createContext } from "react";

const ParentContext = createContext();

const ParentProvider = ({ children }) => {
  const [indeterminate, setIndeterminate] = useState(false) 

  return (
    <ParentContext.Provider value={{ indeterminate, setIndeterminate }}>
      {children}
    </ParentContext.Provider>
  );
};

export const useParent = () => {
  const context = useContext(ParentContext);
  if (!context) throw new Error("useParent must be used within a ParentProvider");
  return context
};

export default ParentProvider;
