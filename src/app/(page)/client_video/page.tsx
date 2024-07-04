"use client";
import React, { useState, useEffect, FormEvent } from 'react';
import SideNav from '../../components/sidenav';
import Button from '../../components/button';
import Topnav from '../../components/topnav';
import Searchbox from '../../components/searchbox';
import Filter from '../../components/filter';
import VideoTable from "../../components/VideoTable";
import Pagination from '../../components/pagination';
import { VideoProps } from "../../components/interfaces";
import { ToastMessage, showErrorToast, showSuccessToast } from '@/app/components/toastmessage';
import { useSearchParams, useRouter } from 'next/navigation';
import { isTokenExpired } from '../../utils/token'; 


const ClientVideo: React.FC = () => {
  const [isClient, setIsClient] = useState(false); 
  const router = useRouter();
  const searchParams = useSearchParams();
  const firstname = searchParams.get('firstname');
  const lastname = searchParams.get('lastname');
  const clientId = searchParams.get('id');

  const [clientDetails, setClientDetails] = useState<{firstname:string, lastname: string,  clientId: number }>({
    lastname: "",
    firstname:"",
    clientId: 0
  });

  useEffect(() => {
    setIsClient(true); // Set the client flag to true after mounting
  }, []);

  useEffect(() => {
    if (firstname && lastname && clientId) {
      setClientDetails({
        firstname:decodeURIComponent(firstname),
        lastname: decodeURIComponent(lastname),
        clientId: parseInt(clientId, 10)
      });
    }
  }, [firstname, clientId]);

  const [tokenn, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (isClient) {
      const token = localStorage.getItem('token');
      setToken(token || null);

      if (token && isTokenExpired(token)) {
        localStorage.removeItem('token'); 
        router.push('/login'); 
      }
    }
  }, [isClient, router]);

  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState<VideoProps | null>(null);
  const [toggleApi, setToggleApi] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const [title, setTitle] = useState("");
  const [newvideo, setNewvideo] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (tokenn && clientDetails.clientId) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/video?client=${clientDetails.clientId}&page=${pagination.page}&pageSize=${pagination.pageSize}`, {
        headers: { 'x-access-token': tokenn }
      })
        .then((res) => {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.json();
        })
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [clientDetails.clientId, pagination.page, pagination.pageSize, tokenn, toggleApi]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setUploadProgress(0);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData();
    form.append('title', title);
    form.append('client_id', clientDetails.clientId.toString());
    if (newvideo) {
      form.append('video', newvideo);
    }
    if (tokenn) {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${process.env.NEXT_PUBLIC_API_URL}/uploadvideo`, true);
      xhr.setRequestHeader('x-access-token', tokenn);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setUploadProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        const response = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          showSuccessToast(response.message);
          setTitle("");
          setNewvideo(null);
          setUploadProgress(0);
          togglePopup();
          setToggleApi((prevState) => !prevState);
        } else {
          showErrorToast(response.message);
        }
      };

      xhr.onerror = () => {
        console.error('Error submitting form');
      };

      xhr.send(form);
    }
  };

  const previousHandler = () => {
    if (pagination.page > 1) {
      setPagination((prevPagination) => ({
        ...prevPagination,
        page: prevPagination.page - 1
      }));
    }
  };

  const nextHandler = () => {
    if (data && pagination.page < data.totalPages) {
      setPagination((prevPagination) => ({
        ...prevPagination,
        page: prevPagination.page + 1
      }));
    }
  };

  const pageSizeHandler = (selectedValue: string) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      pageSize: parseInt(selectedValue)
    }));
  };

  return (
    <div className="flex bg-color">
      <ToastMessage />
      <SideNav />
      <div className="flex-grow bg-color">
        <div className="data-box">
          <Topnav />
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl font-bold mt-4">{clientDetails.firstname} {clientDetails.lastname}</h2>
            </div>
            <Searchbox />
            <Filter />
            <div className="input-group m-5">
              <Button type="submit" label="Add video" onClick={togglePopup} />
            </div>
          </div>
          {data && data.data.length ? (
            <>
              <VideoTable data={data.data} clientId={clientDetails.clientId} />
              <Pagination
                previousHandler={previousHandler}
                nextHandler={nextHandler}
                pageSizeHandler={pageSizeHandler}
                pagination={pagination}
              />
            </>
          ) : (
            <p style={{ height: 280, display: "flex", justifyContent: "center", alignItems: "center" }}>No data available</p>
          )}
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
              <div className="bg-white rounded-lg p-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Add Video</h2>
                  <button onClick={togglePopup} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <div className="form-box">
                      <label htmlFor="title" className="block text-gray-700">Title</label>
                      <input
                        type="text"
                        id="title"
                        required
                        className="form-input rounded-lg mt-1 p-2 block w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="form-box">
                      <label htmlFor="video" className="block text-gray-700">Upload a video</label>
                      <input
                        type="file"
                        id="video"
                        accept="video/*"
                        className="form-input rounded-lg mt-1 block w-full"
                        onChange={(e) => setNewvideo(e.target.files ? e.target.files[0] : null)}
                      />
                    </div>
                  </div>
                  {uploadProgress > 0 && (
                    <div className="mb-4">
                      <div className="form-box">
                        <label htmlFor="progress" className="block text-gray-700 2">Video Uploading</label>
                        <progress id="progress" value={uploadProgress} max="100" className="w-full"></progress>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end">
                    <Button type="submit" label="Upload" />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientVideo;
