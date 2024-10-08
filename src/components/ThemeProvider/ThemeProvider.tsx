'use client';

import { useEffect, useState } from "react";

import ThemeContext from "../../context/themeContext";

const ThemeProvider = ({children}: { children: React.ReactNode}) => {
    const themeFromStorage : boolean =
      typeof localStorage !== "undefined" && localStorage.getItem('hotel-theme')
    ?JSON.parse (localStorage.getItem('hotel-theme')!)
    :false;

    const [darkTheme, setDarkTheme] = useState<boolean>(themeFromStorage );
   const [renderComponent, setRenderComponent] =useState(false);

   //original code
  //  useEffect(() => {
  //   setRenderComponent(true);
  //  }, []);

// improvised code 
useEffect(() => {
  setRenderComponent(true);
  document.documentElement.classList.toggle('dark', darkTheme); // Apply dark class to root
}, [darkTheme]);

useEffect(() => {
  document.documentElement.classList.toggle('dark', darkTheme); // Toggle dark mode
}, [darkTheme]);
//end


   if(!renderComponent) return <></>;

    return (<ThemeContext.Provider value={{darkTheme, setDarkTheme}}>
    <div className={`${darkTheme ? 'dark' : ' '}min-h-screen`}>
     <div className='dark:text-white dark:bg-black text-[#1E1E1E]'>
       {children}
     </div>
    </div>
 </ThemeContext.Provider>
 )
} ;

export default ThemeProvider;