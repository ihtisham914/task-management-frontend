import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { API } from '../apiConfig';
import toast from 'react-hot-toast';

// Validation schema using Yup
const validationSchema = Yup.object({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

const Signup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);  // Loading state

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoading(true);  // Start loading
            try {
                const response = await fetch(`${API}/user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                const data = await response.json();
                if (data.success) {
                    toast.success('Signup successful 🎉');
                    navigate('/login');  // Redirect to login page after successful signup
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error(error.message);  // Display error message correctly
            } finally {
                setLoading(false);  // Stop loading
            }
        },
    });

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">Signup</h2>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            {...formik.getFieldProps('name')}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <div className="text-red-500 text-xs">{formik.errors.name}</div>
                        )}
                    </div>

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

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            {...formik.getFieldProps('confirmPassword')}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <div className="text-red-500 text-xs">{formik.errors.confirmPassword}</div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md mt-4"
                        disabled={loading}  // Disable button when loading
                    >
                        {loading ? 'Signing Up...' : 'Signup'}  {/* Show loading text */}
                    </button>
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => navigate('/login')}
                            className="text-blue-500 hover:text-blue-700 text-sm"
                        >
                            Already have an account? Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
