export const isTokenExpired = (token: string | null): boolean => {
    if (!token) return true;

    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    return tokenPayload.exp < currentTime;
};

// hooks/useAuthMiddleware.ts
// import { useEffect } from 'react';
// import { useRouter } from 'next/router';

// const useAuthMiddleware = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       try {
//         const token = localStorage.getItem('token');

//         if (!token) {
//           // Redirect to login page if token is not present
//           router.push('/login');
//           return;
//         }

//         // Example: Replace with your actual API call to verify token
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/check-auth`, {
//           headers: {
//             'x-access-token': token
//           }
//         });

//         if (response.status === 403) {
//           // Redirect to login page if status is 403 (Forbidden)
//           router.push('/login');
//         } else if (!response.ok) {
//           throw new Error('Failed to authenticate');
//         }

//         // Handle other status codes or success responses
//       } catch (error) {
//         console.error('Error during authentication', error);
//       }
//     };

//     checkAuthStatus();
//   }, [router]);
// };

// export default useAuthMiddleware;

