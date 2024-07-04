import React from 'react';
import Image from 'next/image';
import Trash from '../images/Trash.svg';

interface DeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center justify-center">
        <h3>Are you sure you want to delete this client?</h3>
        <Image src={Trash} alt="Trash Image" className="big-icon" />
        <div className="mt-4">
          <button 
            onClick={onConfirm} 
            className="text-red-500 px-4 py-2 rounded-lg border border-red-500 hover:bg-red-500 hover:text-white focus:outline-none focus:bg-red-500 focus:text-white">
            Delete
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <button 
            onClick={onCancel} 
            className="text-gray-500 px-4 py-2 rounded-lg border border-gray-500 hover:bg-gray-500 hover:text-white focus:outline-none focus:bg-gray-500 focus:text-white">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
