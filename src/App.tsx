import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Navigate } from "react-router-dom";
import { Home } from './pages/home';
import { SignUp } from './pages/signUp';
import { SignIn } from './pages/signIn';
import { SignOutWrapper, ProtectedRoute } from './router';
import { ScreenContextProvider } from './contexts';
import { UserContext } from './contexts/UserContext';
import { SettingsContext } from './contexts/SettingsContext';
import { ToastContextProvider } from './contexts/ToastContext';

const App = () => {
    const { token, setToken } = useContext(UserContext);
    const { theme } = useContext(SettingsContext);

    return (
        <div className={`h-screen w-screen flex justify-center items-center bg-sky-100 dark:bg-gray-900 [transition:background-color_350ms] ${theme}`}>
            <ToastContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/"
                            element={
                                <ProtectedRoute allowed={token !== ""} redirectPath="/signIn">
                                    <ScreenContextProvider>
                                        <Home />
                                    </ScreenContextProvider>
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/signUp"
                            element={
                                <ProtectedRoute allowed={token === ""} redirectPath="/">
                                    <SignUp />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/signIn"
                            element={
                                <ProtectedRoute allowed={token === ""} redirectPath="/">
                                    <SignIn />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/signOut"
                            element={
                                <ProtectedRoute allowed={token !== ""} redirectPath="/signIn">
                                    <SignOutWrapper signOut={() => setToken("")}>
                                        <Navigate to="/" replace />
                                    </SignOutWrapper>
                                </ProtectedRoute>
                            }
                        />
                        </Routes>
                </BrowserRouter>
            </ToastContextProvider>
        </div>
    );
}

export default App;