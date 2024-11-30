import React, { useState } from 'react';
import { API } from '../apiConfig';
import { useQuery } from '@tanstack/react-query';
import Task from '../components/Task';
import Header from '../components/Header';
import ReactPaginate from 'react-paginate';
import { useUserContext } from '../context/UserContext';



const Home = () => {
    const { user, token } = useUserContext();
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const tasksPerPage = 3;


    // Fetch tasks using React Query
    const { data, isLoading, error, isError } = useQuery({
        queryKey: ['tasks'],
        queryFn: () =>
            fetch(`${API}/tasks`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }).then(res => res.json()),
    });

    // Function to handle filter change
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setCurrentPage(0);
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
        setCurrentPage(0); // Reset pagination on search change
    };

    // Filter and search tasks
    const filteredTasks = (data?.data || [])
        .filter(task => filter === 'all' || task.status === filter) // Filter by status
        .filter(task => // Filter by search query (title + description)
            task.title.toLowerCase().includes(searchQuery) ||
            task.description.toLowerCase().includes(searchQuery)
        );

    // Sort tasks by dueDate in ascending order (earliest first)
    const sortedTasks = filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    // Calculate pagination
    const offset = currentPage * tasksPerPage;
    const paginatedTasks = sortedTasks.slice(offset, offset + tasksPerPage);
    const pageCount = Math.ceil(sortedTasks.length / tasksPerPage);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div className='text-red-500'>{error.message}</div>;

    return (
        <div className='max-w-md mx-auto mt-4'>
            {/* Header */}
            <Header />
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

                {/* Search */}
                <div className='mt-2'>
                    <input
                        type="text"
                        placeholder="Search by title or description..."
                        className='w-full px-2 py-1 border border-gray-100 rounded'
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>

                {/* Task listing */}
                <div className='flex flex-col gap-2 w-full mt-4'>
                    {paginatedTasks.length > 0 ? (
                        paginatedTasks.map((task, index) => (
                            <Task key={index} task={task} searchQuery={searchQuery} />
                        ))
                    ) : (
                        <p className='text-center text-gray-500'>No {filter !== 'all' ? filter : ''} tasks available.</p>
                    )}
                </div>
                {/* Pagination */}
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination flex justify-center mt-4 gap-2'}
                    pageClassName={'border px-3 py-1 rounded-lg'}
                    activeClassName={'bg-blue-500 text-white'}
                    previousClassName={'border px-3 py-1 rounded-lg'}
                    nextClassName={'border px-3 py-1 rounded-lg'}
                    disabledClassName={'opacity-50 cursor-not-allowed'}
                />
            </div>
        </div>
    );
};

export default Home;
