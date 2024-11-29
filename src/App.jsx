import './App.css'

function App() {
  return (
    <div className='max-w-md mx-auto mt-4'>
      {/* Header */}
      <div className='flex items-center justify-between p-4 border border-gray-100 rounded-t-xl'>
        <h1 className='font-medium'>Welcome: User</h1>
        <button className='px-3 py-1 bg-purple-500 text-white rounded-lg'>New Task</button>
      </div>
      {/* Tasks */}
      <div className='p-4 border border-gray-100 rounded-b-xl'>
        {/* Filter */}
        <div className='flex items-center justify-between'>
          <h3 className='font-semibold'>All Tasks</h3>
          <div className='flex items-center gap-2'>
            <label htmlFor="">Filter</label>
            <select name="" id="" className='border border-gray-100 px-2'>
              <option value="all">All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Task listing */}
        <div className='flex flex-col gap-2 w-full mt-4'>
          {/* <p className='text-center text-gray-500'>Add tasks to see it here 😀</p> */}
          <div className={`border border-gray-100 w-full rounded-lg shadow-sm p-2`}>
            <div className='flex items-center justify-between text-sm mb-1'>
              <span>14 November, 2024</span>
              <span className='px-2 pb-1 bg-yellow-500 text-white rounded-full'>Pending</span>
            </div>
            <h2 className='font-medium'>Create api</h2>
            <p>test description for the above task</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App
