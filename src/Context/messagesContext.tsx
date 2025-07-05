import React, { createContext, useContext, useState } from 'react';

interface MessageContextType {
    message: string;
    setMessage: (message: string) => void;
    messageError: boolean;
    setMessageError: (error: boolean) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<string>('');
  const [messageError, setMessageError] = useState<boolean>(false);

  return (
    <MessageContext.Provider value={{message, setMessage, messageError, setMessageError}}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) throw new Error('useProduct must be used within ProductProvider');
  return context;
};


