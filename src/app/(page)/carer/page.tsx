
"use client";
import React, { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import SideNav from '../../components/sidenav';
import Button from '../../components/button';
import Topnav from '../../components/topnav';
import Searchbox from '../../components/searchbox';
import Filter from '../../components/filter';
import SkeletonLoader from "../loading";
import EditPopup from "../../components/editpopup";
import Table from "../../components/CarerTable";
import Pagination from '../../components/pagination';
import EditInfo from '../../components/editinfo';
import { ToastMessage, showErrorToast, showSuccessToast } from '@/app/components/toastmessage';
import { isTokenExpired } from '../../utils/token'; 

interface Carer {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  joining_date: any;
  picture: string;
}

interface ApiData {
  code: number;
  message: string;
  success: boolean;
  totalpages: number;
  page: number;
  pageSize: number;
  data: Carer[];
}

const Carer = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [id, setId] = useState(0);
  const [anotherpopup, setAnotherpopup] = useState(false);
  const [data, setData] = useState<Carer[] | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    joiningDate: '',
    picture: '' as File | string
  });
  const [apidata, setApiData] = useState<ApiData | null>(null);
  const [toogleApi, setToggleApi] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10
  });

  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

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
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/carer?page=${pagination.page}&pageSize=${pagination.pageSize}`, {
        headers: {
          'x-access-token': token
        }
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
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
  }, [pagination, toogleApi, token]);

  if (isLoading) return <SkeletonLoader />;

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const editPopup = (id: number) => {
    setAnotherpopup(!anotherpopup);
    setId(id);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData();
    const currentDate = new Date().toISOString().split('T')[0];
    form.append('firstname', formData.firstName);
    form.append('lastname', formData.lastName);
    form.append('email', formData.email);
    form.append('joining_date', currentDate);
    form.append('picture', formData.picture);
    
    if (token && !isTokenExpired(token)) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carer`, {
          method: 'POST',
          body: form,
          headers: {
            'x-access-token': token
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
          setToggleApi(prevState => !prevState);
        } else {
          showErrorToast(errorMessage.message);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      router.push('/login');
    }
  };

  const onSubmit2 = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData();
    form.append('firstname', formData.firstName);
    form.append('lastname', formData.lastName);
    form.append('picture', formData.picture);

    if (token && !isTokenExpired(token)) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carer/${id}`, {
          method: 'PUT',
          body: form,
          headers: {
            'x-access-token': token
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
        } else {
          showErrorToast(errorMessage.message);
        }
      } catch (error) {
        console.error('Error updating carer:', error);
      }
    } else {
      router.push('/login');
    }
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

  const handleDelete = async (carer: Carer) => {
    if (token && !isTokenExpired(token)) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carer/${carer.id}`, {
          method: 'DELETE',
          headers: {
            'x-access-token': token
          }
        });
        if (response.ok) {
          const updatedData = data?.filter((c: Carer) => c.id !== carer.id);
          if (updatedData) {
            setData(updatedData);
          }
          setToggleApi(prevState => !prevState);
        } else {
          console.error('Failed to delete carer');
        }
      } catch (error) {
        console.error('Error deleting carer:', error);
      }
    } else {
      router.push('/login');
    }
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
              <h2 className="text-3xl font-bold mb-4"> Carer</h2>
              <p className="text-sm text-gray-600">
                You have {data ? data.length : 0} {data && data.length === 1 ? 'Carer' : 'Carers'}
              </p>
            </div>
            <Searchbox />
            <Filter />
            <div className="input-group m-5">
              <Button type="submit" label="Add Carer" onClick={togglePopup} />
            </div>
          </div>
          {/* MAIN SECTION */}
          {data && data.length > 0 ? (
            <>
              <Table
                data={data}
                editPopup={editPopup}
                handleDelete={handleDelete}
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
              handleDelete={handleDelete}
            />
          )}
          {showPopup && (
            <EditPopup
              formData={formData}
              handleInputChange={handleInputChange}
              handlePictureChange={handlePictureChange}
              onSubmit={handleSubmit}
              onCancel={togglePopup}
              title="Add a Carer"
              page="Upload Picture"
            />
          )}
          {anotherpopup && (
            <EditInfo
              formData={formData}
              handleInputChange={handleInputChange}
              handlePictureChange={handlePictureChange}
              onSubmit={onSubmit2}
              onCancel={() => editPopup(id)}
              title="Edit a Carer"
              page="Upload Picture"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Carer;
