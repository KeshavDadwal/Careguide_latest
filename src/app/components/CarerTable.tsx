import React from 'react';
import Image from 'next/image';
import Edit from '../images/Edit.svg';
import Delete from '../images/Delete.svg';
// import Link from 'next/link'
// import Icon6 from '../images/Icon6.png'
// import Icon5 from '../images/Icon5.png'

interface ClientProps {
  data: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    joining_date: string;
    picture: string;
  }[];
  editPopup: (id: number) => void;
  handleDelete: (client: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    joining_date: string;
    picture: string;
  }) => void;
}

const Client: React.FC<ClientProps> = ({ data, editPopup, handleDelete }) => {
  return (
    <div className='data-box-inside mt-5'>
      {data && data.length > 0 ? (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="p-2 text-left">No.</th>
              <th className="p-2 text-left">Image</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">E-mail</th>
              <th className="p-2 text-left">Created At</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((client, index) => (
              <tr key={index}>
                <td className="p-2">{index + 1}</td>
                <td className="p-2">
                  <Image src={client.picture} alt="POC" width={50} height={90}  className="rounded-fully" />
                </td>
                <td className="p-2">
                  {client.firstname} {client.lastname}
                </td>
                <td className="p-2">{client.email}</td>
                <td className="p-2">{client.joining_date}</td>
                <td className="p-2">
                  <button onClick={() => editPopup(client.id)} className="text-blue-500 mr-2">
                    <Image src={Edit} alt="Edit Icon" className='small-icon' />
                  </button>
                  <button onClick={() => handleDelete(client)} className="text-red-500">
                    <Image src={Delete} alt="Delete Icon" className='small-icon' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ height: 280, display: "flex", justifyContent: "center", alignItems: "center" }}>No data available</p>
      )}
    </div>
  );
};

export default Client;
