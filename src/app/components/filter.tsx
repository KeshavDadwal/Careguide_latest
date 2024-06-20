import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const filter = () => {
  return (
    <div>
      <div className="input-group m-5">
              <button
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-full shadow-dark text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                <FontAwesomeIcon icon={faFilter} className="w-5 h-5" />
                Filter
              </button>
            </div>
    </div>
  )
}

export default filter
