import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Retrieve user and token from localStorage on initial load
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        // Check if storedUser is valid before attempting to parse
        if (storedUser && storedToken) {
            try {
                // Only parse the user data if it's a valid string (not undefined or null)
                if (storedUser !== "undefined" && storedUser !== "null") {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);  // Set user data
                    setToken(storedToken);  // Set token data
                }
            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
            }
        }
    }, []);

    const loginUser = (userData, token) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem('user', JSON.stringify(userData));  // Store user in localStorage
        localStorage.setItem('token', token);  // Store token in localStorage
    };

    const logoutUser = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');  // Remove user from localStorage
        localStorage.removeItem('token');  // Remove token from localStorage
    };

    return (
        <UserContext.Provider value={{ user, token, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};
