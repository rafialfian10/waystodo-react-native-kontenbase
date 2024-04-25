import { useState, createContext } from 'react';

export const UserPhotoContext = createContext();

export const UserPhotoContextProvider = ({ children }) => {
  const [photo, setPhoto] = useState("");

  return (
    <UserPhotoContext.Provider value={{ photo, setPhoto }}>
      {children}
    </UserPhotoContext.Provider>
  );
};
