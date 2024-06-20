import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'

interface PaginationProps {
  previousHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  nextHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  pageSizeHandler: (value: string) => void;
  pagination: {
    pageSize: number;
    page: number;
  };
}

const Pagination: React.FC<PaginationProps> = ({ previousHandler, nextHandler, pageSizeHandler, pagination }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
      <div>
        
        <button className=" font-bold py-2 px-3 rounded m-2" onClick={previousHandler}>  <FontAwesomeIcon icon={faCircleChevronLeft} /></button>
        <button className="font-bold py-2 px-3 rounded" onClick={nextHandler}> <FontAwesomeIcon icon={faCircleChevronRight} /></button>
      </div>
      <div className="input-group m-5">
        <select onChange={(e) => pageSizeHandler(e.target.value)} value={pagination.pageSize} className="bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
