import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

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
                    setUser(parsedUser);
                    setToken(storedToken);
                }
            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
            }
        }
    }, []);

    const loginUser = (userData, token) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
    };

    const logoutUser = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <UserContext.Provider value={{ user, token, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};
