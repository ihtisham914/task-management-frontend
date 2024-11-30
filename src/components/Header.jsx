import { useState } from 'react'
import Modal from './Modal';
import NewTaskForm from './NewTaskForm';


const Header = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div className='flex items-center justify-between p-4 border border-gray-100 rounded-t-xl'>
                <h1 className='font-medium'>Welcome: User</h1>
                <button onClick={() => setShowModal(true)} className='px-3 py-1 bg-purple-500 text-white rounded-lg'>New Task</button>
            </div>
            {showModal && <Modal setShowModal={setShowModal} name='New Task'>
                <NewTaskForm setShowModal={setShowModal} />
            </Modal>}
        </>
    )
}

export default Header