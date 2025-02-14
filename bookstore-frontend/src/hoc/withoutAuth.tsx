import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useAuthStore from "@/store/AuthStore";

const withoutAuth = (WrappedComponent: React.FC) => {
    return (props: any) => {
        const router = useRouter();
        const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
        const [ authCheck, setAuthCheck ] = useState<boolean>(false);

        useEffect(() => {
            if (isAuthenticated) {
                router.replace("/admin/books");
            }
            setAuthCheck(true); 
        }, [isAuthenticated]);

        if(authCheck && !isAuthenticated) return <WrappedComponent {...props} />;

        return null; //to prevent rendering

    }
}

export default withoutAuth;