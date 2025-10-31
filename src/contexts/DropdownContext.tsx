import React, { createContext, useContext, useState } from 'react';

type DropdownType = 'language' | 'theme' | 'language-navigation' | 'language-toolbar-tablet' | 'language-toolbar-mobile' | 'language-fixed-mobile' | 'theme-navigation' | 'theme-toolbar-tablet' | 'theme-toolbar-mobile' | 'theme-fixed-mobile' | string | null;

interface DropdownContextType {
  openDropdown: DropdownType;
  setOpenDropdown: (dropdown: DropdownType) => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export const DropdownProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);

  return (
    <DropdownContext.Provider value={{ openDropdown, setOpenDropdown }}>
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (context === undefined) {
    throw new Error('useDropdown must be used within a DropdownProvider');
  }
  return context;
};
