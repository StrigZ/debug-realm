'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeContext = {
  isDarkTheme: boolean;
  toggleThemeHandler: () => void;
};

const themeContext = createContext<ThemeContext>({
  isDarkTheme: true,
  toggleThemeHandler() {
    // do nothing
  },
});

export const useThemeContext = () => useContext(themeContext);

export default function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  useEffect(() => initialThemeHandler());

  function isLocalStorageEmpty(): boolean {
    return !localStorage.getItem('isDarkTheme');
  }

  function initialThemeHandler(): void {
    if (isLocalStorageEmpty()) {
      localStorage.setItem('isDarkTheme', `true`);
      document.querySelector('body')!.classList.add('dark');
      setIsDarkTheme(true);
    } else {
      const isDarkTheme = JSON.parse(
        localStorage.getItem('isDarkTheme')!,
      ) as boolean;
      if (isDarkTheme) {
        document.querySelector('body')!.classList.add('dark');
      }
      setIsDarkTheme(() => {
        return isDarkTheme;
      });
    }
  }

  function toggleThemeHandler(): void {
    const isDarkTheme = JSON.parse(
      localStorage.getItem('isDarkTheme')!,
    ) as boolean;
    setIsDarkTheme(!isDarkTheme);
    toggleDarkClassToBody();
    setValueToLocalStorage();
  }

  function toggleDarkClassToBody(): void {
    document.querySelector('body')!.classList.toggle('dark');
  }

  function setValueToLocalStorage(): void {
    localStorage.setItem('isDarkTheme', `${!isDarkTheme}`);
  }

  const value: ThemeContext = {
    isDarkTheme,
    toggleThemeHandler,
  };

  return (
    <themeContext.Provider value={value}>{children}</themeContext.Provider>
  );
}
