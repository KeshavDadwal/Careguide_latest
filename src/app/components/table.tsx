import React, { useContext } from 'react';
import Image from 'next/image';
import Edit from '../images/Edit.svg';
import Delete from '../images/Delete.svg';
import Link from 'next/link';
import Icon6 from '../images/Icon6.png';
import Icon5 from '../images/Icon5.png';

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
              <th className="p-2 text-left">RESOURCES</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((client, index) => (
              <tr key={index}>
                <td className="p-2">{index + 1}</td>
                <td className="p-2">
                  <Image src={client.picture} alt="POC" width={70} height={50} className="rounded-fullz" />
                </td>
                <td className="p-2">{client.firstname} {client.lastname}</td>
                <td className="p-2">{client.email}</td>
                <td className="p-2">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Link
                      href={`/poc?name=${encodeURIComponent(client.firstname)}${encodeURIComponent(client.lastname)}&id=${encodeURIComponent(client.id)}`}
                      style={{ display: "flex", alignItems: "center", marginRight: "10px", fontSize: "14px" }}
                    >
                      <Image src={Icon5} alt="POC" style={{ width: "20px", height: "15px", marginRight: "5px" }} />
                      POC
                    </Link>
                    <button>
                      <Link
                        href={`/client_video?name=${encodeURIComponent(client.firstname)}${encodeURIComponent(client.lastname)}&id=${encodeURIComponent(client.id)}`}
                        style={{ display: "flex", alignItems: "center", marginLeft: "10px", fontSize: "14px" }}
                      >
                        <Image src={Icon6} alt="Video" style={{ width: "20px", height: "15px", marginRight: "5px" }} />
                        Video
                      </Link>
                    </button>
                  </div>
                </td>
                <td className="p-2">
                  <button onClick={() => editPopup(client.id)} className="text-blue-500 mr-2">
                    <Image src={Edit} alt="Edit" className='small-icon' />
                  </button>
                  <button onClick={() => handleDelete(client)} className="text-red-500">
                    <Image src={Delete} alt="Delete" className='small-icon' />
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
