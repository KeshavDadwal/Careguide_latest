"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SideNav from './components/sidenav';
import Button from '../app/components/button';
import Topnav from './components/topnav';
import Searchbox from './components/searchbox';
import Filter from './components/filter';
import SkeletonLoader from './(page)/loading';
import EditPopup from "./components/editpopup";
import Table from "./components/table";
import Pagination from './components/pagination';
import EditInfo from './components/editinfo';
import { ToastMessage, showErrorToast, showSuccessToast } from '@/app/components/toastmessage';
import { Client, ApiData } from "./components/interfaces";
import { isTokenExpired } from './utils/token'; 
import { FormEvent } from 'react'
import DeleteConfirmation from './components/DeleteConfirmation'; 

const Clients = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [id, setId] = useState(0);
  const [anotherpopup, setAnotherpopup] = useState(false);
  const [data, setData] = useState<Client[] | null>(null);
  const [apidata, setApiData] = useState<ApiData | null>(null);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const [isLoading, setLoading] = useState(true);
  const [toogleApi, setToggleApi] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    joiningDate: '',
    picture: '' as File | string
  });

  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem('token');
      if (!storedToken || isTokenExpired(storedToken)) {
        router.push('/login');
      } else {
        setToken(storedToken);
      }
    }
  }, [router]);

  useEffect(() => {
    if (token && !isTokenExpired(token)) {
      setLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/client?page=${pagination.page}&pageSize=${pagination.pageSize}`, {
        headers: {
          'x-access-token': token
        }
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((error) => {
              if (error.message === "Failed to authenticate token") {
                router.push('/login');
              }
              throw new Error('Network response was not ok');
            });
          }
          return res.json();
        })
        .then((data) => {
          setApiData(data);
          setData(data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [pagination, toogleApi, token, router]);

  if (isLoading) return <SkeletonLoader />;

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const editPopup = (id: number) => {
    setAnotherpopup(!anotherpopup);
    setId(id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, picture: file });
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData();
    const currentDate = new Date().toISOString().split('T')[0];
    form.append('firstname', formData.firstName);
    form.append('lastname', formData.lastName);
    form.append('email', formData.email);
    form.append('joining_date', currentDate);
    form.append('picture', formData.picture);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/client`, {
        method: 'POST',
        body: form,
        headers: {
          'x-access-token': token!
        }
      });
      const errorMessage = await response.json();
      if (response.ok) {
        showSuccessToast(errorMessage.message);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          joiningDate: '',
          picture: ''
        });

        togglePopup();
        window.location.reload();
        setToggleApi(prevState => !prevState);
      } else {
        if (errorMessage.message === "Failed to authenticate token") {
          router.push('/login');
        } else {
          showErrorToast(errorMessage.message);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const onEditSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData();
    form.append('firstname', formData.firstName);
    form.append('lastname', formData.lastName);
    form.append('picture', formData.picture);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/client/${id}`, {
        method: 'PUT',
        body: form,
        headers: {
          'x-access-token': token!
        }
      });
      const errorMessage = await response.json();
      if (response.ok) {
        showSuccessToast(errorMessage.message);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          joiningDate: '',
          picture: ''
        });
        editPopup(id);
        setToggleApi(prevState => !prevState);
        window.location.reload();
      } else {
        if (errorMessage.message === "Failed to authenticate token") {
          router.push('/login');
        } else {
          showErrorToast(errorMessage.message);
        }
      }
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  const confirmDelete = (client: Client) => {
    setClientToDelete(client);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (!clientToDelete) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/client/${clientToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'x-access-token': token!
        }
      });
      if (response.ok) {
        const updatedData = data?.filter((c: Client) => c.id !== clientToDelete.id);
        if (updatedData) {
          setData(updatedData);
        }
        showSuccessToast('Client deleted successfully.');
        setShowDeleteConfirm(false);
        setClientToDelete(null);
      } else {
        const errorMessage = await response.json();
        if (errorMessage.message === "Failed to authenticate token") {
          router.push('/login');
        } else {
          showErrorToast('Failed to delete client');
        }
      }
    } catch (error) {
      console.error('Error deleting client:', error);
      showErrorToast('An error occurred while deleting the client');
    }
  };

  const onCancelDelete = () => {
    setShowDeleteConfirm(false);
    setClientToDelete(null);
  };

  function previousHandler() {
    if (pagination.page > 1) {
      setPagination(prevPagination => ({
        ...prevPagination,
        page: prevPagination.page - 1
      }));
    }
  }

  function nextHandler() {
    if (apidata && pagination.page < apidata.totalpages) {
      setPagination(prevPagination => ({
        ...prevPagination,
        page: prevPagination.page + 1
      }));
    }
  }

  const pageSizeHandler = (selectedValue: any) => {
    setPagination(prevPagination => ({
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
              <h2 className="text-3xl font-bold mb-4"> Clients</h2>
              <p className="text-sm text-gray-600">
                You have {data ? data.length : 0} {data && data.length === 1 ? 'Client' : 'Clients'}
              </p>
            </div>
            <Searchbox />
            <Filter />
            <div className="input-group m-5">
              <Button type="submit" label="Add Client" onClick={togglePopup} />
            </div>
          </div>
          {/* MAIN SECTION */}
          {data && data.length > 0 ? (
            <>
              <Table
                data={data}
                editPopup={editPopup}
                handleDelete={confirmDelete}
              />
              <Pagination
                previousHandler={previousHandler}
                nextHandler={nextHandler}
                pageSizeHandler={pageSizeHandler}
                pagination={pagination}
              />
            </>
          ) : (
            <Table
              data={data || []}
              editPopup={editPopup}
              handleDelete={confirmDelete} />
          )}
          {showPopup && (
            <EditPopup
              formData={formData}
              handleInputChange={handleInputChange}
              handlePictureChange={handlePictureChange}
              onSubmit={onSubmit}
              onCancel={togglePopup}
              title="Add a Client"
              page="Upload Picture"
            />
          )}
          {anotherpopup && (
            <EditInfo
              formData={formData}
              handleInputChange={handleInputChange}
              handlePictureChange={handlePictureChange}
              onSubmit={onEditSubmit}
              onCancel={() => editPopup(id)}
              title="Edit a Client"
              page="Upload Picture"
            />
          )}
          {showDeleteConfirm && (
            <DeleteConfirmation 
              onConfirm={handleDelete}
              onCancel={onCancelDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Clients;