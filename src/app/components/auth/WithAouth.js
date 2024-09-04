// components/withAuth.js
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use this for App Router
import { useTokenStore, useRefreshTokenStore } from '../components/store';

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const token = useTokenStore((state) => state.token);
    const refreshToken = useRefreshTokenStore((state) => state.refreshToken);

    useEffect(() => {
      if (!token || !refreshToken) {
        router.push('/login'); // Redirect to login page if no token or refresh token
      }
    }, [token, refreshToken, router]);

    if (!token || !refreshToken) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
