import React from "react";
import type { SignOutWrapperProps } from "./types";

const SignOutWrapper = ({ children, signOut }: SignOutWrapperProps) => {
    React.useEffect(() => {
        signOut();
    }, [signOut]);
    return children;
};

export default SignOutWrapper;