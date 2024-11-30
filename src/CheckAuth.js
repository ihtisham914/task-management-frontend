import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckAuth = ({ element }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    return token ? element : null;
};

export default CheckAuth;
