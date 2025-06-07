import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { UserContextProvider } from './contexts';
import { SettingsContextProvider } from './contexts/SettingsContext';
import App from './App';
import './i18n';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Suspense>
            <UserContextProvider>
                <SettingsContextProvider>
                    <App />
                </SettingsContextProvider>
            </UserContextProvider>
        </Suspense>
    </StrictMode>
)
