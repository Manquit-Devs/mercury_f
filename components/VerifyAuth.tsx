import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/auth';

export default function VerifyAuth() {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return <></>;
}
