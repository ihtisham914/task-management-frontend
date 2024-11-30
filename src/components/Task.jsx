import { useState } from 'react';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import moment from 'moment';
import Modal from './Modal';
import EditTaskForm from './EditTaskFrom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API } from '../apiConfig';
import { useUserContext } from '../context/UserContext';


const Task = ({ task, searchQuery }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const queryClient = useQueryClient();
    const { user, token } = useUserContext();

    // Mutation to delete a task
    const deleteTaskMutation = useMutation({
        mutationFn: async (taskId) => {
            return await axios.delete(`${API}/tasks/${taskId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
            toast.success("Task deleted successfully!");
        },
        onError: (error) => {
            console.error(error);
            toast.error("Error deleting task");
        },
    });

    const handleDelete = () => {
        deleteTaskMutation.mutate(task._id);
    };

    const statusColors = {
        'Pending': 'bg-yellow-500',
        'In Progress': 'bg-blue-500',
        'Completed': 'bg-green-500',
    };

    // Function to highlight matching text in title and description
    const highlightText = (text, query) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, (match) => `<span class="bg-yellow-300">${match}</span>`);
    };

    return (
        <>
            <div className={`border border-gray-100 w-full rounded-lg shadow-sm p-2 flex`}>
                <div className='flex flex-col w-[70%]'>
                    <span className='text-sm font-medium text-gray-500'>{task.dueDate ? moment(task.dueDate).format('DD MMMM, YYYY') : 'No due date'}</span>
                    <h2 className='font-medium' dangerouslySetInnerHTML={{ __html: highlightText(task.title, searchQuery) }} />
                    {task.description && <p className='text-sm text-gray-500' dangerouslySetInnerHTML={{ __html: highlightText(task.description, searchQuery) }} />}
                </div>
                <div className='flex flex-col gap-4 items-end justify-between text-sm mb-1 w-[30%]'>
                    <span className={`px-2 pb-1 ${statusColors[task.status]} text-white rounded-full w-fit`}>
                        {task.status}
                    </span>
                    <div className='flex items-center justify-between gap-1 w-[70%]'>
                        <div onClick={() => setShowEditModal(true)} className='cursor-pointer p-1 bg-gray-200 rounded-lg hover:text-blue-500 transition-all'>
                            <FiEdit className='text-lg' />
                        </div>
                        <div
                            onClick={() => setShowDeleteModal(true)}
                            className='cursor-pointer p-1 bg-red-200 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all'
                        >
                            <MdOutlineDeleteOutline className=' text-xl' />
                        </div>
                    </div>
                </div>
            </div>

            {showEditModal && (
                <Modal setShowModal={setShowEditModal} name='Edit Task'>
                    <EditTaskForm task={task} setShowModal={setShowEditModal} />
                </Modal>
            )}

            {
                showDeleteModal && (
                    <Modal setShowModal={setShowDeleteModal} name='Delete Task'>
                        <h2 className='mt-8'>Are you sure you want to delete this task?</h2>
                        <p className='text-sm text-yellow-500'>This action cannot be undone</p>
                        <div className='flex gap-2 mt-4'>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className='px-3 py-1 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-all'
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className='px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all'
                            >
                                Delete
                            </button>
                        </div>
                    </Modal>
                )
            }
        </>
    );
};

export default Task;
