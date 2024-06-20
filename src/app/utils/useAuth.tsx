import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isTokenExpired } from './token';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      console.log('Checking auth status...');
      
      if (typeof window !== 'undefined') {
        const storedToken = localStorage.getItem('token');
        console.log('Stored token:', storedToken);

        if (!storedToken || isTokenExpired(storedToken)) {
          console.log('Token expired or not found. Redirecting to /login');
          router.push('/login');
        } else {
          console.log('Token is valid.');
        }
      }
    };

    checkAuthStatus();
  }, [router]);

  console.log('useAuth hook initialized.');

  return {}; 
};

export default useAuth;
