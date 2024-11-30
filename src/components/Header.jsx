import { useState } from 'react'
import Modal from './Modal';
import NewTaskForm from './NewTaskForm';
import { useUserContext } from '../context/UserContext';



const Header = () => {
    const { user, logoutUser } = useUserContext();
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div className='flex items-center justify-between p-4 border border-gray-100 rounded-t-xl'>
                <h1 className='font-medium'>{user?.name}</h1>
                <div className='flex gap-2'>
                    <button onClick={() => setShowModal(true)} className='px-3 py-1 bg-purple-500 text-white rounded-lg'>New Task</button>
                    <button onClick={logoutUser} className='px-3 py-1 bg-red-100 text-red-500 hover:bg-red-200 rounded-lg'>Logout</button>
                </div>
            </div>
            {showModal && <Modal setShowModal={setShowModal} name='New Task'>
                <NewTaskForm setShowModal={setShowModal} />
            </Modal>}
        </>
    )
}

export default Header