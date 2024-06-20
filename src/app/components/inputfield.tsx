import React from 'react';

interface InputFieldProps {
  id: string;
  name: string;
  label: string;
  type: string;
  placeholder: string;
  className?: string; 
}

const InputField: React.FC<InputFieldProps> = ({ id, name, label, type, placeholder, className }) => {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md border-gray-300 ${className}`}
        style={{ padding: '0.75rem' }}
      />
    </div>
  );
};

export default InputField;
