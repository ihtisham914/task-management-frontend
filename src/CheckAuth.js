import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './context/UserContext';


const CheckAuth = ({ element }) => {
    const { token } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    return token ? element : null;
};

export default CheckAuth;
