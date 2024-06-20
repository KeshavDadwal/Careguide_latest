"use client"
import React from 'react';

interface EditPopupProps {
  title: string;
  page: string;
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    joiningDate: string;
    picture: File | string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePictureChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: (index: any) => void; 
}

const EditPopup: React.FC<EditPopupProps> = ({ title, page, formData, handleInputChange, handlePictureChange, onSubmit, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-white rounded-lg p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <div className="form-box">
              <label htmlFor="picture" className="block text-gray-700">{page}</label>
              <input type="file" id="picture" accept="image/*" onChange={handlePictureChange} className="form-input rounded-lg mt-1 block w-full px-2" />
            </div>
          </div>
          <div className="mb-4">
            <div className="form-box">
              <label htmlFor="firstname" className="block text-gray-700">First Name</label>
              <input type="text" id="firstname" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="form-input rounded-lg mt-1 block w-full px-2" />
            </div>
          </div>
          <div className="mb-4">
            <div className="form-box">
              <label htmlFor="lastname" className="block text-gray-700">Last Name</label>
              <input type="text" id="lastname" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="form-input rounded-lg mt-1 block w-full px-2" />
            </div>
          </div>
          <div className="mb-4">
            <div className="form-box">
              <label htmlFor="email" className="block text-gray-700">E-mail</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="form-input rounded-lg mt-1 block w-full px-2" />
            </div>
          </div>
          {/* <div className="mb-4">
            <div className="form-box">
              <label htmlFor="joining_date" className="block text-gray-700">Joining Date:</label>
              <input type="date" id="joining_date" name="joiningDate" value={formData.joiningDate} onChange={handleInputChange} required className="form-input rounded-lg mt-1 block w-full px-2" />
            </div>
          </div> */}
          <div className="flex justify-center">
            <button type="button" onClick={onCancel} className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500">Cancel</button>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPopup;
