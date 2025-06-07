import React, { createContext } from 'react';
import type { ContextProviderProps, ScreenContextProps } from './types';
import type { Screen } from '../screens/types';

const ScreenContext = createContext<ScreenContextProps>({ 
    screen: "Today",
    setScreen: () => { }
});

const ScreenContextProvider = (props: ContextProviderProps) => {
    const { children } = { ...props }
    const [screen, setScreen] = React.useState<Screen | number>(
        () => {
            try {
                const item = sessionStorage.getItem("screen");
                if (item === undefined || item === null)
                    throw new Error();
                const lastScreen = JSON.parse(item) as Screen;
                return lastScreen;
            } catch (e: unknown) {
                const defaultScreen: Screen = "Today";
                return defaultScreen;
            }
        }
    );

    React.useEffect(() => {
        sessionStorage.setItem("screen", JSON.stringify(screen));
    }, [screen]);

    return (
        <ScreenContext.Provider value={{ screen, setScreen }}>
            {children}
        </ScreenContext.Provider>
    )
}

export { ScreenContextProvider, ScreenContext }