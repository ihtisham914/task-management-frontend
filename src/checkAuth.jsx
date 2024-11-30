import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const CheckAuth = ({ element }) => {
    const Token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!Token) {
            navigate('/login');
        }
    }, [Token, navigate]);

    return Token ? element : null;
};

export default CheckAuth;
