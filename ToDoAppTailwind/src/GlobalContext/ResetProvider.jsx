import React, { useState } from "react";
import ResetContext from "./ResetContext";
const ResetProvider = ({ children }) => {
  const [restart, setRestart] = useState(true);
  return (
    <ResetContext.Provider value={{ restart, setRestart }}>
      {children}
    </ResetContext.Provider>
  );
};

export default ResetProvider;
