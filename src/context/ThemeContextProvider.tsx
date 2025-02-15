'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

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

  const isLocalStorageEmpty = useCallback(() => {
    return !localStorage.getItem('isDarkTheme');
  }, []);

  const initialThemeHandler = useCallback(() => {
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
  }, [isLocalStorageEmpty]);

  const setValueToLocalStorage = useCallback(() => {
    localStorage.setItem('isDarkTheme', `${!isDarkTheme}`);
  }, [isDarkTheme]);

  const toggleThemeHandler = useCallback(() => {
    const isDarkTheme = JSON.parse(
      localStorage.getItem('isDarkTheme')!,
    ) as boolean;
    setIsDarkTheme(!isDarkTheme);
    toggleDarkClassToBody();
    setValueToLocalStorage();
  }, [setValueToLocalStorage]);

  function toggleDarkClassToBody(): void {
    document.querySelector('body')!.classList.toggle('dark');
  }

  const value: ThemeContext = useMemo(
    () => ({
      isDarkTheme,
      toggleThemeHandler,
    }),
    [isDarkTheme, toggleThemeHandler],
  );

  return (
    <themeContext.Provider value={value}>{children}</themeContext.Provider>
  );
}
