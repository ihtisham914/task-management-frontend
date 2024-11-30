import { IoIosClose } from "react-icons/io";
import { useState, useEffect } from "react";

const Modal = ({ setShowModal, name, children }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            setShowModal(false);
        }, 300);
    };

    return (
        <>
            <div className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur-sm bg-gray-400/30 overflow-y-scroll">
                <div
                    className={`w-full max-w-sm mt-20 mb-4 md:h-auto bg-white px-10 py-8 rounded-2xl shadow-lg transition-transform duration-300 transform ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-32 opacity-0"
                        }`}
                >
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-medium text-purple-500">{name}</h1>
                        <IoIosClose
                            onClick={handleClose}
                            className="p-1 text-4xl text-red-500 rounded-lg bg-gray-100 hover:bg-red-500 hover:text-white cursor-pointer transition-all"
                        />
                    </div>
                    {children}
                </div>
            </div>
        </>
    );
};

export default Modal;
