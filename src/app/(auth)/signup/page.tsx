"use client"
import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import InputField from '../../components/inputfield';
import image from '../../images/LeftBar.jpg';
import Button from '../../components/button';
import Link from 'next/link';
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation';
import { ToastMessage, showErrorToast,showSuccessToast } from '@/app/components/toastmessage';

const SignUpPage: React.FC = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (error) {
            timer = setTimeout(() => {
                setError(null);
            }, 3000); 
        }

        return () => {
            clearTimeout(timer);
        };
    }, [error]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
     
        const formData = new FormData(event.currentTarget)
        const name = formData.get('company')
        const email = formData.get('email')
        const phone = formData.get('phone')
        const address = formData.get('address')
        const website = formData.get('website')
        
     
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name, phone, address,website }),
        })
     
        if (response.ok) {
            const responseData = await response.json();
            const token = responseData.data.token;
            // showSuccessToast(responseData.message);
            localStorage.setItem('token', token);
          router.push('/login')
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
                <Image src={image} alt="Signup Image" className='main_img' />
            </div>
            <div className="w-1/2 px-8 py-6">
                <h2 className="text-2xl font-semibold mb-6 text-black">Welcome to Care Guide</h2>
                <p className='text-black mb-6'>Already a member? <Link href= "/login" className="text-green-500">Log in</Link></p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <InputField id="company" name="company" label="Company Name" type="text" placeholder="Company Name" />
                    <InputField id="email" name="email" label="Email" type="email" placeholder="you@example.com" />
                    <InputField id="phone" name="phone" label="Phone" type="tel" placeholder="Phone Number" />
                    <InputField id="address" name="address" label="Address" type="text" placeholder="Address" className="h-16" />
                    <InputField id="website" name="website" label="Website" type="text" placeholder="Website" />
                    <div>
                        <Button type="submit" label="Sign up" /> 
                    </div>
                </form>
            </div>

        </div>
    </div>
    );
};

export default SignUpPage;
