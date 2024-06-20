import React,{useEffect} from 'react';
import Image from 'next/image';
import Trash from '../images/Trash.svg';
import {showErrorToast, showSuccessToast } from '@/app/components/toastmessage';

interface DeleteProps {
  videoId: number; 
  onCancel: () => void;
}

const Delete: React.FC<DeleteProps> = ({ videoId, onCancel }) => {

  let token:string| null = "";

  useEffect(() => {
    token = localStorage.getItem('token');
    // if (!token) {
    //   router.push('/login');
    // } else {
    //   router.push('/')
    // }
  }, []);

  // const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const handleDelete = async () => {
    if (token) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/video/${videoId}`, {
          method: 'DELETE',
          headers: { 'x-access-token': token }
        });
        const errorMessage = await response.json();
        if (response.ok) {
          showSuccessToast(errorMessage.message);
          onCancel();
          window.location.reload();
        } else {
          showErrorToast(errorMessage.message);
        }
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center justify-center">
        <h3>Are sure want to delete this video ?</h3>
        <Image src={Trash} alt="Trash Image" className="big-icon" />
        <div className="mt-4">
          <button 
            onClick={handleDelete} 
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

export default Delete;
