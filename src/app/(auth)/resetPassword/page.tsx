"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import InputField from '../../components/inputfield';
import Button from '../../components/button';
import image from '../../images/LeftBar.jpg';
import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);
        const password = formData.get('password') as string;
        const new_password = formData.get('new_password') as string;
        const confirm_password = formData.get('confirm_password') as string;
        const email = formData.get('email') as string;

    
        if (new_password !== confirm_password) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resetpassword`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ new_password, password, email }),
            });

            if (response.ok) {
                const responseData = await response.json();
                const token = responseData.data.token;
                localStorage.setItem('token', token);
                router.push('/login');
            } else {
                console.error('Error occurred:', response.statusText);
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    }

    return (
        <div>
            <div className="f-box">
                <div className="pr-4">
                    <Image src={image} alt="Login Image" className='main_img' />
                </div>
                <div className="w-1/2 px-8 py-6 mt-20">
                    <h2 className="text-2xl font-semibold mb-6 text-black">Welcome to Care Guide</h2>
                    <p className='text-black mb-6'>Reset Password</p>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <InputField id="email" name="email" label="Email" type="email" placeholder="you@example.com" />
                        <InputField id="password" name="password" label="Current Password" type="password" placeholder="Current Password" />
                        <InputField id="new_password" name="new_password" label="New Password" type="password" placeholder="New Password" />
                        <InputField id="confirm_password" name="confirm_password" label="Confirm Password" type="text" placeholder="Confirm Password" />
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div>
                            <Button type="submit" label="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
