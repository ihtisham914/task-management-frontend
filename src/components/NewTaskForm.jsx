import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { API } from '../apiConfig';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useUserContext } from '../context/UserContext';


const NewTaskForm = ({ setShowModal }) => {
    const queryClient = useQueryClient();
    const { token, user } = useUserContext();

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            dueDate: '',
            status: 'Pending',
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required('Title is required')
                .max(50, 'Title must be 50 characters or less'),
            description: Yup.string()
                .max(200, 'Description must be 200 characters or less'),
            dueDate: Yup.date()
                .min(new Date(), 'Due date cannot be in the past'),
            status: Yup.string()
                .oneOf(['Pending', 'In Progress', 'Completed'], 'Invalid status'),
        }),
        onSubmit: (values) => {
            const task = { ...values, userId: user._id };
            addTaskMutation.mutate(task);
        },
    });


    // Mutation to add task
    const addTaskMutation = useMutation({
        mutationFn: async (newTask) => {
            return await axios.post(`${API}/tasks`, newTask, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
            toast.success("Task added successfully!");
            setShowModal(false);
        },
        onError: (error) => {
            console.error(error);
            toast.error("Error adding task");
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="p-4">
            <div className="mb-4">
                <label htmlFor="title" className="block font-medium mb-2">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Enter task title"
                    className="border p-2 w-full rounded-lg"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.title && formik.errors.title ? (
                    <div className="text-red-500">{formik.errors.title}</div>
                ) : null}
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block font-medium mb-2">Description</label>
                <textarea
                    id="description"
                    name="description"
                    className="border p-2 w-full rounded-lg"
                    placeholder='Enter task description'
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.description && formik.errors.description ? (
                    <div className="text-red-500">{formik.errors.description}</div>
                ) : null}
            </div>

            <div className="mb-4">
                <label htmlFor="dueDate" className="block font-medium mb-2">Due Date</label>
                <input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    className="border p-2 w-full rounded-lg"
                    value={formik.values.dueDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.dueDate && formik.errors.dueDate ? (
                    <div className="text-red-500">{formik.errors.dueDate}</div>
                ) : null}
            </div>

            <div className="mb-4">
                <label htmlFor="status" className="block font-medium mb-2">Status</label>
                <select
                    id="status"
                    name="status"
                    className="border p-2 w-full rounded-lg"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                {formik.touched.status && formik.errors.status ? (
                    <div className="text-red-500">{formik.errors.status}</div>
                ) : null}
            </div>

            <button type="submit" className="px-4 py-2 bg-purple-500 text-white rounded">Add Task</button>
        </form>
    );
};

export default NewTaskForm;
