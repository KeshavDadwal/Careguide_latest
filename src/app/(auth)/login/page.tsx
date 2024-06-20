"use client"
import React from 'react';
import Image from 'next/image';
import InputField from '../../components/inputfield';
import Button from '../../components/button';
import image from '../../images/LeftBar.jpg';
import Link from 'next/link';
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation';
import { ToastMessage, showErrorToast,showSuccessToast } from '@/app/components/toastmessage';


interface LoginResponse {
    code: number;
    message: string;
    success: boolean;
    data: {
      token: string;
    };
  }

const LoginPage: React.FC = () => {
    const router = useRouter();
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
     
        const formData = new FormData(event.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')
     
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        })
     
        if (response.ok) {
            const responseData = await response.json();
            const token = responseData.data.token;
            localStorage.setItem('token', token);
          router.push('/')
        } else {
          const errorMessage = await response.json();
          showErrorToast(errorMessage.message);
        }
      }

    return (
        <div>
           <ToastMessage/>
            <div className="f-box">
                <div className="pr-4">
                    <Image src={image} alt="Login Image" className='main_img' />
                </div>
                <div className="w-1/2 px-8 py-6 mt-20">
                    <h2 className="text-2xl font-semibold mb-6 text-black">Welcome to Care Guide</h2>
                    <p className='text-black mb-6'>Doesn’t have an account yet? <Link href="/signup" className="text-green-500">Sign Up</Link></p>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* <InputField id="company" name="company" label="Company Name" type="text" placeholder="Company Name" /> */}
                        <InputField id="email" name="email" label="Email" type="email" placeholder="you@example.com" />
                        <InputField id="password" name="password" label="Password" type="password" placeholder="Password" />
                        <div>
                            <Button type="submit" label="Log in" />
                        </div>
                    </form>
                </div>



            </div>
        </div>
    );
};

export default LoginPage;
