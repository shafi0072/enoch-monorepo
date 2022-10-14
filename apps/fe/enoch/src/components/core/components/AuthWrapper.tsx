import React from "react";

const AuthWrapper = ({ children }: any) => {
  React.useEffect(() => {
    
  }, [])  
  return (
    <div className="d-flex vh-100  align-items-center justify-content-center">
      <div className="spinner-border m-5" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default AuthWrapper;
