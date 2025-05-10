import React, { createContext, useEffect, useState } from "react";
import { useUser } from "./utils/hooks/useUser";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./store/reducers/userSlice";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { loadUser } = useUser();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const initLoad = async () => {
            setLoading(true);
            await loadUser();
        };
        initLoad();
    }, []);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const currentUser = useSelector(selectCurrentUser);
    useEffect(() => {
        if (currentUser) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        setLoading(false);
    }, [currentUser]);
    //   console.log(`auth status: ${isAuthenticated}`);
    return (
        <>
            {!loading && (
                <UserContext.Provider value={{ isAuthenticated }}>
                    {children}
                </UserContext.Provider>
            )}
        </>
    );
};
