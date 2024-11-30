import React, { useState } from 'react';
import { API } from '../apiConfig';
import { useQuery } from '@tanstack/react-query';
import Task from '../components/Task';
import Header from '../components/Header';

const Home = () => {
    const [filter, setFilter] = useState('all');

    // Fetch tasks using React Query
    const { data, isLoading, error, isError } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => fetch(`${API}/tasks`).then(res => res.json()),
    });

    // Function to handle filter change
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    // Filter tasks based on the selected filter
    const filteredTasks = filter === 'all'
        ? data?.data || [] // Show all tasks if filter is 'all'
        : data?.data.filter((task) => task.status === filter) || [];

    // Sort tasks by dueDate in ascending order (earliest first)
    const sortedTasks = filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div className='text-red-500'>{error.message}</div>;

    return (
        <div className='max-w-md mx-auto mt-4'>
            {/* Header */}
            <Header />
            {/* Tasks */}
            <div className='p-4 border border-gray-100 rounded-b-xl'>
                {/* Filter */}
                <div className='flex items-center justify-between'>
                    <h3 className='font-semibold'>All Tasks</h3>
                    <div className='flex items-center gap-2'>
                        <label htmlFor="task-filter">Filter</label>
                        <select
                            id="task-filter"
                            className='border border-gray-100 px-2'
                            value={filter}
                            onChange={handleFilterChange}
                        >
                            <option value="all">All</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                </div>

                {/* Task listing */}
                <div className='flex flex-col gap-2 w-full mt-4'>
                    {sortedTasks.length > 0 ? (
                        sortedTasks.map((task, index) => (
                            <Task key={index} task={task} />
                        ))
                    ) : (
                        <p className='text-center text-gray-500'>No {filter !== 'all' ? filter : ''} tasks available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
