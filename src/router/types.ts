interface ProtectedRouteProps {
    allowed: boolean;
    children: React.ReactNode;
    redirectPath?: string;
}

interface SignOutWrapperProps {
    children: React.ReactNode;
    signOut: () => void;
}

export type { ProtectedRouteProps, SignOutWrapperProps }