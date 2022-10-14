import React, { useState } from "react";

export const PostContext = React.createContext<any | null>(null);

const PostContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [footerVisible, setfooterVisible] = React.useState<boolean>(true);

  return (
    <PostContext.Provider value={{ footerVisible, setfooterVisible }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
