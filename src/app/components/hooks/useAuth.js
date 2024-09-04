// hooks/useAuth.js
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { useTokenStore, useRefreshTokenStore } from '../components/store';

const useAuth = () => {
  const router = useRouter();
  const token = useTokenStore((state) => state.token);
  const refreshToken = useRefreshTokenStore((state) => state.refreshToken);

  useEffect(() => {
    if (!token || !refreshToken) {
      router.push('/login');
    }
  }, [token, refreshToken, router]);
};

export default useAuth;
