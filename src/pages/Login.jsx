import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { API } from '../apiConfig';

import toast from 'react-hot-toast';

// Validation schema using Yup
const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const Login = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch(`${API}/user/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                const data = await response.json();
                if (data.success) {
                    // Store the token in localStorage or sessionStorage
                    localStorage.setItem('token', data.token);
                    toast.success('Login successful 🎉');
                    navigate('/');
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error(data.message);
            }
        },
    });

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-red-500 text-xs">{formik.errors.email}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-500 text-xs">{formik.errors.password}</div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md mt-4"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
